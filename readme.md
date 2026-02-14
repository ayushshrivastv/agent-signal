
Signal is a comprehensive Solana program designed to provide a seamless solution for managing leaderboards, achievements, player profiles, and automatic rewards distribution on the Solana blockchain. It allows game developers to integrate complex game mechanics such as scoring systems, unlockable achievements, and verified rewards (both fungible and non-fungible) directly on-chain. This project serves as a foundational layer for decentralized gaming, enabling trustless progression systems that are interoperable across different games and applications.

The program's utility lies in its fully verifiable and transparent nature. By storing game states, player scores, and achievement data on-chain, Signal ensures that all player progression is immutable and proof against tampering. This transparency is crucial for the future of competitive gaming and digital asset ownership, where players can be certain that their achievements and rewards are earned legitimately. Furthermore, the standardized structure of player profiles and achievements facilitates the creation of a unified gaming identity that persists across the Solana ecosystem.

The program is currently deployed on the Solana Devnet. You can verify the program and its history using the following Program ID:
HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB
[View on Solscan](https://solscan.io/account/HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB?cluster=devnet)

Below are verified transactions demonstrating the core functionality of the Signal program. Each transaction represents a successful interaction with the smart contract, ranging from game initialization to player management.

Initialize Game Match:
Transaction ID: [4abeT29LBFgpTNpe5CPnSqjr92ourL4YapYgPQ1SsbuvFX1wRQfgQggjSs8fWEdiGGCvyELNxAJRY62L5ArmHGDE](https://solscan.io/tx/4abeT29LBFgpTNpe5CPnSqjr92ourL4YapYgPQ1SsbuvFX1wRQfgQggjSs8fWEdiGGCvyELNxAJRY62L5ArmHGDE?cluster=devnet)

Add Leaderboard:
Transaction ID: [5WncAmFJZJTHTu8K4dvz4WUxtH2KAmc4eTATyerDTH7cUwuq6ikASTQJ7BaEDE8BBofZf64oSb7f8wtbxnkcnTsr](https://solscan.io/tx/5WncAmFJZJTHTu8K4dvz4WUxtH2KAmc4eTATyerDTH7cUwuq6ikASTQJ7BaEDE8BBofZf64oSb7f8wtbxnkcnTsr?cluster=devnet)

Add Achievement:
Transaction ID: [4oD3L7wKtCWhC4Wn54f8zJFYfLtjvSTYYWWFCd9SNSRFQKEMEczZm3J8Pa9aumD52i4WKuAEzP2odKCC9tjohyTb](https://solscan.io/tx/4oD3L7wKtCWhC4Wn54f8zJFYfLtjvSTYYWWFCd9SNSRFQKEMEczZm3J8Pa9aumD52i4WKuAEzP2odKCC9tjohyTb?cluster=devnet)

Update Game Metadata:
Transaction ID: [51JU7qi2CwLjcaVeW1Fm4ovQi6Bs8UBxzHzUxLnmx4PTecyhSdmwjNZ3GmxAuA2USsWgKQTRy47fgf47wEibrYv4](https://solscan.io/tx/51JU7qi2CwLjcaVeW1Fm4ovQi6Bs8UBxzHzUxLnmx4PTecyhSdmwjNZ3GmxAuA2USsWgKQTRy47fgf47wEibrYv4?cluster=devnet)


### Verified On-Chain Accounts

- **Game Account**: [FB95Z1dn2ipmWsJM1hKUZNdn5gv7K6jXY9gT9Mqq54Qu](https://solscan.io/account/FB95Z1dn2ipmWsJM1hKUZNdn5gv7K6jXY9gT9Mqq54Qu?cluster=devnet)
- **Leaderboard Account**: [3B1n6i4h1...](https://solscan.io/account/FB95Z1dn2ipmWsJM1hKUZNdn5gv7K6jXY9gT9Mqq54Qu?cluster=devnet) (Derived from Game)

## Codebase Structure

The project is organized into three main components: the smart contract (program), the client SDK, and utility scripts.

```
/Users/ayushsrivastava/agent-signal
├── programs/signal         # Core Solana Smart Contract (Anchor Framework)
│   ├── src/lib.rs          # Program Entrypoint & Instruction Registry
│   ├── src/state/          # Data Structures (Game, Player, Leaderboard)
│   └── src/instructions/   # Instruction Handlers
│       ├── create_game.rs          # Game initialization
│       ├── create_player.rs        # Player profile creation
│       ├── add_leaderboard.rs      # Leaderboard creation
│       ├── submit_score.rs         # Score submission logic
│       └── ...
├── client/sdk              # TypeScript SDK for dApp integration
│   └── src/signal.program.ts # Main client class interacting with the chain
└── scripts                 # Automation & Verification Scripts
    └── devnet-achievements-rewards.ts # Deployment & Interaction Script
```

The codebase is structured to handle these interactions efficiently. Below are references to the specific files and lines of code responsible for the logic executed in the transactions above.

The main entrypoint and program declaration can be found in the library file:
[programs/signal/src/lib.rs](programs/signal/src/lib.rs)

Game Initialization logic is handled here:
[programs/signal/src/instructions/create_game.rs Line 7](programs/signal/src/instructions/create_game.rs#L7)

Leaderboard creation and management:
[programs/signal/src/instructions/add_leaderboard.rs Line 6](programs/signal/src/instructions/add_leaderboard.rs#L6)
[programs/signal/src/instructions/update_leaderboard.rs Line 5](programs/signal/src/instructions/update_leaderboard.rs#L5)

Achievement creation and management:
[programs/signal/src/instructions/add_achievement.rs Line 7](programs/signal/src/instructions/add_achievement.rs#L7)

Player profile initialization and updates:
[programs/signal/src/instructions/create_player.rs Line 7](programs/signal/src/instructions/create_player.rs#L7)
[programs/signal/src/instructions/update_player.rs Line 5](programs/signal/src/instructions/update_player.rs#L5)

Score submission logic:
[programs/signal/src/instructions/submit_score.rs Line 8](programs/signal/src/instructions/submit_score.rs#L8)

Reward distribution logic (Fungible and Non-Fungible):
[programs/signal/src/instructions/add_reward.rs Line 13](programs/signal/src/instructions/add_reward.rs#L13)
[programs/signal/src/instructions/claim_reward.rs Line 13](programs/signal/src/instructions/claim_reward.rs#L13)


## 💡 Key On-Chain Logic

The core logic of Signal revolves around initializing game configurations and securely managing player scores. Here are verified snippets from the deployed program.

### 1. Game Initialization
Found in `programs/signal/src/instructions/create_game.rs`. This instruction sets up the game's metadata and authority structure.

```rust
pub fn handler(
    ctx: Context<InitializeGame>,
    game_meta_input: GameAttributes,
    game_auth: Vec<Pubkey>,
) -> Result<()> {
    game_meta_input.check()?;

    let game_account = &mut ctx.accounts.game;
    let mut game_object = Game::default();

    game_object.set_attributes(game_meta_input);
    game_object.leaderboard_count = 0;
    game_object.achievement_count = 0;
    game_object.auth = game_auth;

    game_account.set_inner(game_object);

    Ok(())
}
```

### 2. Score Submission & Verification
Found in `programs/signal/src/instructions/submit_score.rs`. This logic ensures scores are within bounds and automatically updates the leaderboard if the score qualifies.

```rust
pub fn handler(ctx: Context<SubmitScore>, score: u64) -> Result<()> {
    let leaderboard = &ctx.accounts.leaderboard;

    // Verify score bounds
    if score < leaderboard.min_score || score > leaderboard.max_score {
        return Err(signalError::ScoreNotWithinBounds.into());
    }

    // Record the score
    let clock = Clock::get().unwrap();
    let entry = ScoreEntry::new(score, clock.unix_timestamp);
    ctx.accounts.player_scores.scores.push(entry);

    // Update Top Entries if applicable
    if let Some(top_entries) = &mut ctx.accounts.top_entries {
        // ... (sorting logic handling ascending/descending) ...
    }

    Ok(())
}
```
