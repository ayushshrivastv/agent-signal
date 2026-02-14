#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use signal::cpi::accounts::{ClaimFtReward, SubmitScore};
use signal::cpi::{self};
use signal::{LeaderTopEntries, PlayerScoresList};

declare_id!("Tensgwm3DY3UJ8nhF7xnD2Wo65VcnLTXjjoyEvs6Zyk");

#[program]
mod tens {
    use super::*;

    pub fn register(
        ctx: Context<Initialize>,
        signal_state: Pubkey,
        signal_leaderboard: Pubkey,
        signal_leaderboard_top_entries: Pubkey,
    ) -> Result<()> {
        let state = &mut ctx.accounts.tens_state;

        // Prelude: We initialize the signal_game and signal_leaderboard off-chain and set
        // this program's `internal_state` as an authority so it can sign for CPIs to
        // the signal program.

        state.signal.state = signal_state;
        state.signal.leaderboard = signal_leaderboard;
        state.signal.top_entries = signal_leaderboard_top_entries;
        state.counter = 0;

        Ok(())
    }

    pub fn make_move(ctx: Context<MakeMove>) -> Result<()> {
        let tens = &mut ctx.accounts.tens_state;
        tens.counter = tens.counter.checked_add(1).unwrap();

        if tens.counter % 10 == 0 {
            msg!(" You won this round! ");

            let accounts = SubmitScore {
                payer: ctx.accounts.user.to_account_info(),
                authority: tens.to_account_info(),
                player_account: ctx.accounts.signal_player_account.to_account_info(),
                game: ctx.accounts.signal_state.to_account_info(),
                leaderboard: ctx.accounts.signal_leaderboard.to_account_info(),
                player_scores: ctx.accounts.signal_player_scores.to_account_info(),
                top_entries: ctx
                    .accounts
                    .signal_top_entries
                    .as_ref()
                    .map(|a| a.to_account_info()),
                system_program: ctx.accounts.system_program.to_account_info(),
            };

            let state_bump = ctx.bumps.tens_state;
            let seeds = &[b"tens".as_ref(), &[state_bump]];
            let signer = &[&seeds[..]];

            let cpi_ctx = CpiContext::new(ctx.accounts.signal_program.to_account_info(), accounts)
                .with_signer(signer);
            msg!("Submitting score {} for user.", tens.counter);
            cpi::submit_score(cpi_ctx, tens.counter)?;
        }

        Ok(())
    }

    pub fn claim_reward(ctx: Context<Claim>) -> Result<()> {
        // We claim a reward if the user's score is present in the top-entries account.
        let player = &ctx.accounts.player_account;
        let top_entries = &ctx.accounts.signal_top_entries;
        if top_entries
            .top_scores
            .iter()
            .any(|score| score.player == player.key())
            .eq(&true)
        {
            msg!("Player has a top score!..Claiming reward: ");
            let accounts = ClaimFtReward {
                user: ctx.accounts.user.to_account_info(),
                authority: ctx.accounts.tens_state.to_account_info(),
                payer: ctx.accounts.user.to_account_info(),
                game: ctx.accounts.signal_state.to_account_info(),
                achievement: ctx.accounts.signal_achievement.to_account_info(),
                reward: ctx.accounts.signal_reward.to_account_info(),
                player_account: ctx.accounts.player_account.to_account_info(),
                player_achievement: ctx.accounts.signal_player_achievement.to_account_info(),
                source_token_account: ctx.accounts.source_token_account.to_account_info(),
                user_token_account: ctx.accounts.user_token_account.to_account_info(),
                token_program: ctx.accounts.token_program.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
            };

            let state_bump = ctx.bumps.tens_state;
            let seeds = &[b"tens".as_ref(), &[state_bump]];
            let signer = &[&seeds[..]];

            let cpi_ctx = CpiContext::new(ctx.accounts.signal_program.to_account_info(), accounts)
                .with_signer(signer);

            cpi::claim_ft_reward(cpi_ctx)?;
        } else {
            msg!("This user isn't eligible for a reward!");
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        seeds = [b"tens"],
        bump,
        space = 112,
        payer = signer,
    )]
    pub tens_state: Account<'info, Tens>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MakeMove<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"tens"], bump,
        constraint = tens_state.signal.leaderboard == signal_leaderboard.key(),
        constraint = tens_state.signal.state == signal_state.key(),
    )]
    pub tens_state: Account<'info, Tens>,
    /// CHECK: The signal game account for this program.
    pub signal_state: UncheckedAccount<'info>,
    /// CHECK: The signal leaderboard for this program.
    pub signal_leaderboard: UncheckedAccount<'info>,
    /// CHECK: The signal player account for this user.
    pub signal_player_account: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: The signal player scores account for this user.
    pub signal_player_scores: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: The signal top entries account for this leaderboard.
    pub signal_top_entries: Option<UncheckedAccount<'info>>,
    /// CHECK: The signal program ID.
    #[account(address = signal::ID)]
    pub signal_program: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"tens"], bump,
        constraint = tens_state.signal.state == signal_state.key(),
    )]
    pub tens_state: Account<'info, Tens>,
    /// CHECK: The signal player account for this user.
    #[account(mut)]
    pub player_account: UncheckedAccount<'info>,
    #[account(
        has_one = player_account,
        constraint = signal_player_scores.leaderboard == tens_state.signal.leaderboard
    )]
    pub signal_player_scores: Account<'info, PlayerScoresList>,
    #[account(constraint = tens_state.signal.top_entries == signal_top_entries.key())]
    pub signal_top_entries: Account<'info, LeaderTopEntries>,
    /// CHECK: The signal game for this tens program.
    pub signal_state: UncheckedAccount<'info>,
    /// CHECK: The signal achievement.
    pub signal_achievement: UncheckedAccount<'info>,
    /// CHECK: The signal reward account.
    #[account(mut)]
    pub signal_reward: UncheckedAccount<'info>,
    /// CHECK: The player-achievement account to be initialized.
    #[account(mut)]
    pub signal_player_achievement: UncheckedAccount<'info>,
    /// CHECK: The specified source account for the reward.
    #[account(mut)]
    pub source_token_account: UncheckedAccount<'info>,
    /// CHECK: The user's token account.
    #[account(mut)]
    pub user_token_account: UncheckedAccount<'info>,
    /// CHECK: The token program.
    pub token_program: UncheckedAccount<'info>,
    /// CHECK: The system program.
    pub system_program: UncheckedAccount<'info>,
    /// CHECK: The signal program.
    #[account(address = signal::ID)]
    pub signal_program: UncheckedAccount<'info>,
}

#[account]
/// A simple game.
pub struct Tens {
    /// The game counter.
    pub counter: u64,
    /// The signal keys for this program.
    pub signal: signalKeysStorage,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct signalKeysStorage {
    /// The signal state for this game.
    state: Pubkey,
    /// The signal leaderboard for this game.
    leaderboard: Pubkey,
    /// The signal top-entries account for this game.
    top_entries: Pubkey,
}
