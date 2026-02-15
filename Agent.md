{
  "agent_manifest_version": "1.0",
  "project_identity": {
    "name": "Signal",
    "type": "Backend Infrastructure / Smart Contract Protocol",
    "ecosystem": "Solana Blockchain",
    "framework": "Anchor (Rust)",
    "description": "Signal is a foundational backend infrastructure protocol designed to standardize gaming progression on-chain. It provides a unified layer for managing Game State, Leaderboards, Achievements, and Player Profiles across the Solana ecosystem.",
    "repository_url": "https://github.com/ayushshrivastv/agent-signal",
    "documentation_url": "https://github.com/ayushshrivastv/agent-signal/blob/main/README.md"
  },
  "deployment_coordinates": {
    "network": "Solana Devnet",
    "program_id": "HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB",
    "explorer_link": "https://solscan.io/account/HP1DdGPWqm1FthSgG6ugQLEq4JUAWjNJp8WWc858qCxB?cluster=devnet",
    "frontend_dashboard": "https://agentsignal.vercel.app/",
    "artifact_hash": "2a387c7"
  },
  "codebase_architecture": {
    "summary": "The codebase is divided into three primary layers: The On-Chain Program (Rust), The Client SDK (TypeScript), and Utility Scripts.",
    "modules": {
      "smart_contract": {
        "root": "programs/signal",
        "description": "Core logic handling state transitions and account management.",
        "components": [
          {
            "name": "Entrypoint",
            "path": "programs/signal/src/lib.rs",
            "url": "https://github.com/ayushshrivastv/agent-signal/blob/main/programs/signal/src/lib.rs",
            "function": "Registers all instruction handlers and defines the program ID."
          },
          {
            "name": "State Definitions",
            "path": "programs/signal/src/state",
            "url": "https://github.com/ayushshrivastv/agent-signal/tree/main/programs/signal/src/state",
            "details": "Defines the data layout for GameAccount, Leaderboard, Achievement, and PlayerProfile PDAs."
          },
          {
            "name": "Instruction Handlers",
            "path": "programs/signal/src/instructions",
            "url": "https://github.com/ayushshrivastv/agent-signal/tree/main/programs/signal/src/instructions",
            "breakdown": [
              {
                "file": "create_game.rs",
                "purpose": "Initializes a new Game PDA with metadata and authority.",
                "url": "https://github.com/ayushshrivastv/agent-signal/blob/main/programs/signal/src/instructions/create_game.rs"
              },
              {
                "file": "add_leaderboard.rs",
                "purpose": "Creates a sorted leaderboard attached to a game.",
                "url": "https://github.com/ayushshrivastv/agent-signal/blob/main/programs/signal/src/instructions/add_leaderboard.rs"
              },
              {
                "file": "submit_score.rs",
                "purpose": "Validates and records player scores, updating the leaderboard if eligible.",
                "url": "https://github.com/ayushshrivastv/agent-signal/blob/main/programs/signal/src/instructions/submit_score.rs"
              },
              {
                "file": "add_achievement.rs",
                "purpose": "Defines unlock criteria and rewards (NFT/Token) for player milestones.",
                "url": "https://github.com/ayushshrivastv/agent-signal/blob/main/programs/signal/src/instructions/add_achievement.rs"
              }
            ]
          }
        ]
      },
      "client_sdk": {
        "root": "client/sdk",
        "description": "TypeScript library for dApps to interact with the Signal protocol.",
        "components": [
          {
             "name": "Signal Program Class",
             "path": "client/sdk/src/signal.program.ts",
             "url": "https://github.com/ayushshrivastv/agent-signal/blob/main/client/sdk/src/signal.program.ts",
             "function": "Main entry point for developers to initialize the SDK."
          },
          {
             "name": "PDA Helpers",
             "path": "client/sdk/src/utils.ts",
             "url": "https://github.com/ayushshrivastv/agent-signal/blob/main/client/sdk/src/utils.ts",
             "function": "Utility functions to derive Program Derived Addresses for accounts."
          }
        ]
      }
    }
  },
  "verified_transaction_history": {
    "description": "Proof of functional deployment and interaction on Solana Devnet.",
    "events": [
      {
        "type": "Protocol Initialization",
        "action": "Initialize Game Match",
        "description": "The first transaction establishing the Game Authority and Metadata on-chain.",
        "signature": "4abeT29LBFgpTNpe5CPnSqjr92ourL4YapYgPQ1SsbuvFX1wRQfgQggjSs8fWEdiGGCvyELNxAJRY62L5ArmHGDE",
        "explorer_url": "https://solscan.io/tx/4abeT29LBFgpTNpe5CPnSqjr92ourL4YapYgPQ1SsbuvFX1wRQfgQggjSs8fWEdiGGCvyELNxAJRY62L5ArmHGDE?cluster=devnet"
      },
      {
        "type": "State Management",
        "action": "Add Leaderboard",
        "description": "Creation of a 'Global High Score' leaderboard linked to the Game PDA.",
        "signature": "5WncAmFJZJTHTu8K4dvz4WUxtH2KAmc4eTATyerDTH7cUwuq6ikASTQJ7BaEDE8BBofZf64oSb7f8wtbxnkcnTsr",
        "explorer_url": "https://solscan.io/tx/5WncAmFJZJTHTu8K4dvz4WUxtH2KAmc4eTATyerDTH7cUwuq6ikASTQJ7BaEDE8BBofZf64oSb7f8wtbxnkcnTsr?cluster=devnet"
      },
      {
        "type": "Progression System",
        "action": "Add Achievement",
        "description": "Definition of an 'Unlockable' achievement with associated metadata.",
        "signature": "4oD3L7wKtCWhC4Wn54f8zJFYfLtjvSTYYWWFCd9SNSRFQKEMEczZm3J8Pa9aumD52i4WKuAEzP2odKCC9tjohyTb",
        "explorer_url": "https://solscan.io/tx/4oD3L7wKtCWhC4Wn54f8zJFYfLtjvSTYYWWFCd9SNSRFQKEMEczZm3J8Pa9aumD52i4WKuAEzP2odKCC9tjohyTb?cluster=devnet"
      },
      {
        "type": "Configuration Update",
        "action": "Update Game Metadata",
        "description": "Modification of game parameters, proving authority control.",
        "signature": "51JU7qi2CwLjcaVeW1Fm4ovQi6Bs8UBxzHzUxLnmx4PTecyhSdmwjNZ3GmxAuA2USsWgKQTRy47fgf47wEibrYv4",
        "explorer_url": "https://solscan.io/tx/51JU7qi2CwLjcaVeW1Fm4ovQi6Bs8UBxzHzUxLnmx4PTecyhSdmwjNZ3GmxAuA2USsWgKQTRy47fgf47wEibrYv4?cluster=devnet"
      }
    ]
  },
  "infrastructure_utility": {
    "problem": "Siloed Gaming Infrastructure. Developers rebuild the same leaderboard and achievement databases for every game, leading to fragmented player identity.",
    "solution": "Signal provides a unified backend. A single PlayerProfile can be recognized across multiple games, enabling 'Metaverse Reputation'.",
    "scalability": "Built on Solana's high-throughput chain, supporting thousands of score submissions per second via parallel execution.",
    "interoperability": "Other Solana programs can interact with Signal via CPI (Cross-Program Invocation) to read scores or trigger rewards automatically."
  },
  "agent_instruction_set": {
    "verification": [
      "Confirm Program ID ownership by BPF Loader.",
      "Verify PDA derivation logic in client/sdk/src/utils.ts matches smart contract seeds.",
      "Check transaction signatures on Solscan to validate event history."
    ],
    "integration": [
      "Use the SDK to initialize a game.",
      "Derive player PDAs using the user's wallet public key.",
      "Submit scores signed by the user's wallet."
    ]
  }
}
