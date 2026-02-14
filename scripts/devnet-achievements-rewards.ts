/**
 * Devnet script: 10 on-chain transactions for achievements and rewards.
 * Each tx includes a small SOL transfer (0.1–0.4 SOL) to the game account.
 * Uses the deployed signal program on devnet.
 */

import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import BN from "bn.js";
import fs from "fs";
import path from "path";
import { signalProgram, GameClient, GameType, Genre } from "../client/sdk/src/index";
import { PROGRAM_ID } from "../client/sdk/src/constants";

const DEVNET_RPC = "https://api.devnet.solana.com";

// SOL amounts per tx (0.1 - 0.4 SOL), 10 txs total
const SOL_AMOUNTS = [0.1, 0.2, 0.15, 0.22, 0.25, 0.3, 0.18, 0.35, 0.4, 0.12];

function loadKeypair(filePath: string): Keypair {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const secret = JSON.parse(fs.readFileSync(abs, "utf8"));
  return Keypair.fromSecretKey(Uint8Array.from(secret));
}

function lamports(sol: number): number {
  return Math.round(sol * 1e9);
}

async function main() {
  const deployerPath = process.env.DEPLOYER_KEYPAIR ?? "target/deploy/deployer-keypair.json";
  const deployer = loadKeypair(deployerPath);

  const connection = new anchor.web3.Connection(DEVNET_RPC);
  const wallet = new anchor.Wallet(deployer);
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });
  anchor.setProvider(provider);

  const client = signalProgram.get(provider, PROGRAM_ID);
  const gameKeypair = Keypair.generate();
  let gameAddress: PublicKey = gameKeypair.publicKey;
  let gameClient: GameClient;
  let leaderboard: PublicKey;
  let achievement1: PublicKey;
  const playerWallet = Keypair.generate();
  console.log("Player Wallet:", playerWallet.publicKey.toBase58());

  console.log("Deployer:", deployer.publicKey.toBase58());
  console.log("Program:", PROGRAM_ID.toBase58());
  console.log("Game (new):", gameAddress.toBase58());
  console.log("");

  // --- Tx 1: Initialize game + 0.1 SOL
  console.log("[1/10] Initialize game +", SOL_AMOUNTS[0], "SOL");
  const { transaction: tx1, newGame } = await client.initializeNewGame(
    gameKeypair.publicKey,
    "Devnet Game",
    "Achievements and rewards test",
    Genre.Action,
    GameType.Web,
    PublicKey.default,
    [deployer.publicKey]
  );
  tx1.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameKeypair.publicKey,
      lamports: lamports(SOL_AMOUNTS[0]),
    })
  );
  const sig1 = await client.sendAndConfirmTransaction(tx1, [gameKeypair]);
  console.log("  Tx:", sig1);
  gameAddress = newGame;
  gameClient = new GameClient(client, gameAddress);
  // Allow RPC to index; retry fetch (devnet can be slow)
  for (let i = 0; i < 5; i++) {
    await new Promise((r) => setTimeout(r, 4000));
    const info = await connection.getAccountInfo(gameAddress);
    if (info?.data) {
      console.log("  Game account found, size:", info.data.length);
      break;
    }
    console.log("  Retry fetch", i + 1 + "/5");
  }
  await gameClient.init();
  console.log("  Game:", gameAddress.toBase58());

  // --- Tx 2: Add leaderboard + 0.2 SOL
  console.log("[2/10] Add leaderboard +", SOL_AMOUNTS[1], "SOL");
  const { newLeaderBoard, transaction: tx2 } = await gameClient.addLeaderBoard(
    deployer.publicKey,
    "Devnet Leaderboard",
    PublicKey.default,
    10,
    false,
    0,
    new BN(0),
    new BN(1_000_000),
    true
  );
  tx2.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[1]),
    })
  );
  const sig2 = await client.sendAndConfirmTransaction(tx2, [deployer]);
  console.log("  Tx:", sig2);
  leaderboard = newLeaderBoard;
  await new Promise((r) => setTimeout(r, 2000));
  await gameClient.refresh();

  // --- Tx 3: Add achievement 1 + 0.15 SOL
  console.log("[3/10] Add achievement 1 +", SOL_AMOUNTS[2], "SOL");
  const { newAchievement: ach1, transaction: tx3 } = await gameClient.addAchievement(
    deployer.publicKey,
    "First Win",
    "Complete your first game",
    PublicKey.default
  );
  tx3.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[2]),
    })
  );
  const sig3 = await client.sendAndConfirmTransaction(tx3, [deployer]);
  console.log("  Tx:", sig3);
  achievement1 = ach1;
  await new Promise((r) => setTimeout(r, 2000));
  await gameClient.refresh();

  // --- Tx 4: Update game meta + 0.22 SOL
  console.log("[4/10] Update game meta +", SOL_AMOUNTS[3], "SOL");
  const { transaction: tx4 } = await client.updateGameAccount(
    gameAddress,
    deployer.publicKey,
    {
      title: "Devnet Game (updated)",
      description: "Achievements and rewards test",
      genre: Genre.Action,
      gameType: GameType.Web,
      nftMeta: PublicKey.default,
    },
    undefined
  );
  tx4.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[3]),
    })
  );
  const sig4 = await client.sendAndConfirmTransaction(tx4, [deployer]);
  console.log("  Tx:", sig4);
  await new Promise((r) => setTimeout(r, 3000));

  // --- Tx 5: Update leaderboard + 0.25 SOL
  console.log("[5/10] Update leaderboard +", SOL_AMOUNTS[4], "SOL");
  const { transaction: tx5 } = await client.updateGameLeaderboard(
    deployer.publicKey,
    leaderboard,
    "Devnet Leaderboard (updated)",
    PublicKey.default,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    gameAddress
  );
  tx5.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[4]),
    })
  );
  const sig5 = await client.sendAndConfirmTransaction(tx5, [deployer]);
  console.log("  Tx:", sig5);


  // --- Funding Player Wallet
  console.log("Funding Player Wallet...");
  const fundTx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: playerWallet.publicKey,
      lamports: lamports(0.5)
    })
  );
  await client.sendAndConfirmTransaction(fundTx, [deployer]);

  // --- Tx 6: Initialize player + 0.3 SOL (now 0.3 going to game, paid by player?)
  // Actually the instruction takes payer. Let's assume payer is deployer, user is playerWallet.
  // We need to check sdk signature.
  console.log("[6/10] Initialize player");

  const { transaction: tx6 } = await client.initializePlayerAccount(
    playerWallet.publicKey,
    `devnet_player_${Date.now()}`,
    PublicKey.default
  );
  tx6.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[5]),
    })
  );
  const sig6 = await client.sendAndConfirmTransaction(tx6, [deployer, playerWallet]);
  console.log("  Tx:", sig6);

  // --- Tx 7: Register player for leaderboard + 0.18 SOL
  console.log("[7/10] Register player for leaderboard +", SOL_AMOUNTS[6], "SOL");
  const { transaction: tx7 } = await client.registerPlayerEntryForLeaderBoard(
    playerWallet.publicKey,
    leaderboard
  );
  tx7.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[6]),
    })
  );
  const sig7 = await client.sendAndConfirmTransaction(tx7, [deployer, playerWallet]);
  console.log("  Tx:", sig7);

  // --- Tx 8: Submit score + 0.35 SOL
  console.log("[8/10] Submit score +", SOL_AMOUNTS[7], "SOL");
  const { transaction: tx8 } = await client.submitScoreToLeaderBoard(
    playerWallet.publicKey,
    deployer.publicKey, // authority
    leaderboard,
    new BN(100)
  );
  tx8.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[7]),
    })
  );
  const sig8 = await client.sendAndConfirmTransaction(tx8, [deployer, playerWallet]); // Player must sign? Not sure, user usually signs.
  console.log("  Tx:", sig8);

  // --- Tx 9: Update achievement + 0.4 SOL
  console.log("[9/10] Update achievement +", SOL_AMOUNTS[8], "SOL");
  const { transaction: tx9 } = await client.updateGameAchievement(
    deployer.publicKey,
    achievement1,
    "First Win (updated)",
    "Complete your first game on devnet",
    undefined
  );
  tx9.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[8]),
    })
  );
  const sig9 = await client.sendAndConfirmTransaction(tx9, [deployer]);
  console.log("  Tx:", sig9);

  // --- Tx 10: Update player username + 0.12 SOL
  console.log("[10/10] Update player username +", SOL_AMOUNTS[9], "SOL");
  const { transaction: tx10 } = await client.updatePlayerAccount(
    playerWallet.publicKey,
    "devnet_player_updated",
    undefined
  );
  tx10.add(
    SystemProgram.transfer({
      fromPubkey: deployer.publicKey,
      toPubkey: gameAddress,
      lamports: lamports(SOL_AMOUNTS[9]),
    })
  );
  const sig10 = await client.sendAndConfirmTransaction(tx10, [deployer, playerWallet]);
  console.log("  Tx:", sig10);

  const totalSol = SOL_AMOUNTS.reduce((a, b) => a + b, 0);
  console.log("");
  console.log("Done. 10 transactions sent.");
  console.log("Total SOL sent to game:", totalSol.toFixed(2), "SOL");
  console.log("Game account:", gameAddress.toBase58());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
