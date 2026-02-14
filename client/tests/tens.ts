import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { IDL } from "../../target/types/tens";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { signalProgram, GameType, Genre, AccountsBuilder } from "../sdk/lib";
import BN from "bn.js";
import * as utils from "./utils";

describe("tens", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const tensProgramId = new PublicKey(
    "Tensgwm3DY3UJ8nhF7xnD2Wo65VcnLTXjjoyEvs6Zyk"
  );
  const tensProgram = new Program(IDL, tensProgramId, provider);

  const signal = signalProgram.get(provider);

  const gameKp = Keypair.generate();
  // The signal state for our tens program.
  const signalGame = gameKp.publicKey;

  // The `offChainAuthority` is an authority of the signal state representing our `tens` game that
  // exists off-chain. The signal state can also have an on-chain PDA of the `tens` program, giving
  // it both a permissioned(signed by a real-user), and permissionless(signed by an on-chain PDA)
  // authority.
  //
  // Either OR both authority kinds can exist for a signal state. Here we use the `offChainAuthority`
  // so we can keep admin actions that don't rely on our `tens` program's on-chain logic off-chain.
  // (i.e like updating a game and leaderboard).
  //
  // For admin actions that we want to be permissionless(i.e in this case we want our `tens` game to
  // automatically submit a score for a user), we can set a `tens` PDA as an additional authority and
  // write CPI functionality to call and sign the submitScore instruction from our on-chain program.
  const offChainAuthority = Keypair.generate();
  let auths = [offChainAuthority.publicKey];

  const user = Keypair.generate();

  it("Can play the tens game and submit scores directly on-chain by CPI!", async () => {
    const title = "Tens";
    const description = "Increase and get a ten to win!";
    const genre = Genre.Casual;
    const gameType = GameType.Web;
    const nftMeta = Keypair.generate().publicKey;

    // Initialize the `signal` state representing the `tens` game.
    const { transaction: init } = await signal.initializeNewGame(
      gameKp.publicKey,
      title,
      description,
      genre,
      gameType,
      nftMeta,
      auths
    );
    await signal.sendAndConfirmTransaction(init, [gameKp], {
      skipPreflight: true,
    });

    const leaderboardDescription = "LeaderBoard1";
    const leaderboardMeta = Keypair.generate().publicKey;

    // Initialize a leaderboard for it.
    const { newLeaderBoard, topEntries, transaction } =
      await signal.addNewGameLeaderBoard(
        signalGame,
        offChainAuthority.publicKey,
        leaderboardDescription,
        leaderboardMeta,
        5,
        false
      );
    await signal.sendAndConfirmTransaction(transaction, [offChainAuthority]);

    // Derive the tensStatePDA of the `tens` program.
    const tensPDA = PublicKey.findProgramAddressSync(
      [Buffer.from("tens")],
      tensProgram.programId
    )[0];
    // Initialize the internal state and register its `signal` game and leaderboard in our tens program
    // so it can validate that the correct accounts are passed in for subsequent instructions.
    await tensProgram.methods
      .register(signalGame, newLeaderBoard, topEntries)
      .accounts({
        signer: provider.publicKey,
        tensState: tensPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc();

    // Make the tensState PDA of our `tens` program an authority of the game so it can permissionlessly
    // sign CPI requests to signal that require the authority's signature.
    const newAuths = auths.concat([tensPDA]);
    auths = newAuths;

    const { transaction: update } = await signal.updateGameAccount(
      signalGame,
      offChainAuthority.publicKey,
      undefined,
      newAuths
    );
    await signal.sendAndConfirmTransaction(update, [offChainAuthority]);

    // Initialize a signal player account, required for interacting with the `tens` game.
    const { transaction: initPlayer } = await signal.initializePlayerAccount(
      user.publicKey,
      "player1",
      PublicKey.default
    );
    await signal.sendAndConfirmTransaction(initPlayer, [user]);

    // Register the player to the leaderboard.
    const { newList: playerScoresList, transaction: regPlayer } =
      await signal.registerPlayerEntryForLeaderBoard(
        user.publicKey,
        newLeaderBoard
      );
    await signal.sendAndConfirmTransaction(regPlayer, [user]);
    console.log(`Registered to leaderboard ${newLeaderBoard.toBase58()}!\n`);

    // Repetitively make moves in the tens game. Scores will be submitted automatically by CPI.
    for (let i = 0; i < 20; ++i) {
      // Use the helper function from the signal sdk to get the accounts required for a submit score CPI.
      // This conveniently derive accounts required for CPI.
      //
      // The authority for this submitScore instruction is the tensState PDA of the `tens` program.
      //
      // Since this has been made an authority for the signal state, it is now authorized to sign
      // for the submitScore instruction and will do so by CPI.
      //
      const accounts = await new AccountsBuilder(
        provider,
        signal.program.programId
      ).submitScoreAccounts(user.publicKey, tensPDA, newLeaderBoard);

      await tensProgram.methods
        .makeMove()
        .accounts({
          user: user.publicKey,
          tensState: tensPDA,
          signalState: accounts.game, // `signalGame` can also be used here.
          signalLeaderboard: accounts.leaderboard,
          signalPlayerAccount: accounts.playerAccount,
          signalPlayerScores: accounts.playerScores,
          signalTopEntries: accounts.topEntries, // created when player registered to leaderboard
          signalProgram: signal.program.programId,
          systemProgram: accounts.systemProgram,
        })
        .signers([user])
        .rpc();

      const tens = await tensProgram.account.tens.fetch(tensPDA);
      const counter = tens.counter.toNumber();

      if (counter % 10 !== 0) {
        console.log(`..Moved ${counter}. Keep going!`);
      } else {
        console.log(`> Brilliant!. You moved ${counter} and won this round!`);
        const playerScores = await signal.fetchPlayerScoresListAccount(
          accounts.playerScores
        );
        console.log(
          `> Added ${counter} to your scores: ${JSON.stringify(
            playerScores.pretty().scores
          )}\n`
        );
      }
    }

    // ---------------------------------------------------------------------------------------------//
    //                       Setup mint and token accounts for testing.                            //
    // ---------------------------------------------------------------------------------------------//
    const { mint, authority } = await utils.initializeTestMint(signal);

    const tokenAccountOwner = offChainAuthority;
    const tokenAccount = await utils.createTokenAccount(
      signal,
      tokenAccountOwner.publicKey,
      mint
    );
    await utils.mintToAccount(signal, mint, authority, tokenAccount, 5);

    const userATA = await utils.createTokenAccount(signal, user.publicKey, mint);
    // ---------------------------------------------------------------------------------------------//
    // ---------------------------------------------------------------------------------------------//

    // Now we add an achievement for this game and a ft reward for that achievement.
    const { newAchievement, transaction: addAchievement } =
      await signal.addNewGameAchievement(
        signalGame,
        offChainAuthority.publicKey,
        "title",
        "desc",
        PublicKey.default
      );
    await signal.sendAndConfirmTransaction(addAchievement, [offChainAuthority]);

    const reward = Keypair.generate();
    const { newReward, transaction: addReward } = await signal.addFungibleReward(
      offChainAuthority.publicKey,
      reward.publicKey,
      newAchievement,
      new BN(4),
      new BN(5),
      new BN(100),
      mint,
      tokenAccount,
      tokenAccountOwner.publicKey
    );
    await signal.sendAndConfirmTransaction(addReward, [
      reward,
      tokenAccountOwner,
    ]);

    // Now the user can try to claim a reward by sending a transaction to the `tens` smart-contract.
    //
    // The `tens` smart-contract decides what invariant it wants to establish for a reward to be
    // claimed for a user. In this particular case, our on-chain program chooses to only claim rewards
    // for users that have a score in the `top-entries` list for our leaderboard. Since this is handled
    // on-chain, our on-chain authority(the tens PDA) is used.
    ///
    const accounts = await new AccountsBuilder(
      provider,
      signal.program.programId
    ).claimFtRewardAccounts(
      tensPDA,
      newAchievement,
      user.publicKey,
      newReward,
      signalGame
    );
    await utils.airdropTo(signal, user.publicKey, 1);

    let balance = await signal.provider.connection.getTokenAccountBalance(
      userATA
    );
    console.log(`> Balance before claim: ${balance.value.uiAmount}`);

    console.log("..claiming...");
    await tensProgram.methods
      .claimReward()
      .accounts({
        user: user.publicKey,
        tensState: tensPDA,
        playerAccount: accounts.playerAccount,
        signalPlayerScores: playerScoresList,
        signalTopEntries: topEntries,
        signalState: accounts.game,
        signalAchievement: accounts.achievement,
        signalReward: accounts.reward,
        signalPlayerAchievement: accounts.playerAchievement,
        sourceTokenAccount: accounts.sourceTokenAccount,
        userTokenAccount: accounts.userTokenAccount,
        tokenProgram: accounts.tokenProgram,
        systemProgram: SystemProgram.programId,
        signalProgram: signal.program.programId,
      })
      .signers([user])
      .rpc();

    balance = await signal.provider.connection.getTokenAccountBalance(userATA);
    console.log(`> Claim successful. New balance: ${balance.value.uiAmount}`);
  });
});
