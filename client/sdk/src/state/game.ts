import { type PublicKey } from "@solana/web3.js";
import type BN from "bn.js";
import { type IdlAccounts } from "@coral-xyz/anchor";
import { type signal } from "../idl/signal";
import { type signalProgram } from "../signal.program";
import { GameClient } from "../signal.game";

/** Class representing a deserialized on-chain `Game` account. */
export class GameAccount {
  public readonly address: PublicKey;
  public readonly meta: GameAttributes;

  public readonly achievementCount: BN;
  public readonly leaderboardCount: BN;
  public readonly auth: PublicKey[];

  protected constructor(
    _address: PublicKey,
    account: IdlAccounts<signal>["game"]
  ) {
    this.address = _address;
    this.meta = account.meta;
    this.achievementCount = account.achievementCount;
    this.leaderboardCount = account.leaderboardCount;
    this.auth = account.auth;
  }

  /** Create a new instance from an anchor-deserialized account. */
  public static fromIdlAccount(
    account: IdlAccounts<signal>["game"],
    address: PublicKey
  ): GameAccount {
    return new GameAccount(address, account);
  }

  public async client(signal: signalProgram): Promise<GameClient> {
    return new GameClient(signal, this.address, this);
  }

  /** Pretty print. */
  public pretty(): {
    address: string;
    meta: {
      title: string;
      description: string;
      genre: Genre;
      gameType: GameType;
      nftMeta: string;
    };
    achievementCount: string;
    leaderboardCount: string;
    auth: string[];
  } {
    return {
      address: this.address.toBase58(),
      meta: {
        ...this.meta,
        nftMeta: this.meta.nftMeta.toBase58(),
      },
      achievementCount: this.achievementCount.toString(),
      leaderboardCount: this.leaderboardCount.toString(),
      auth: this.auth.map((auth) => auth.toBase58()),
    };
  }
}

export interface GameAttributes {
  title: string;
  description: string;
  genre: Genre;
  gameType: GameType;
  nftMeta: PublicKey;
}

export const enum GameType {
  Mobile = 0,
  Desktop = 1,
  Web = 2,
  Unspecified = 255,
}

export const enum Genre {
  RPG = 0,
  MMO = 1,
  Action = 2,
  Adventure = 3,
  Puzzle = 4,
  Casual = 5,
  Unspecified = 255,
}
