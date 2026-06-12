---
title: "Signals Methodology"
seo_title: "Jones Rating Methodology for Daily Stock Signals"
description: "Plain-English methodology for the 5amShift Screener, including the Jones Long Rating, Jones Short Rating, scoring pillars, freshness rules, trade-plan fields, and educational-use disclaimer."
summary: "How the Jones Long Rating and Jones Short Rating are intended to work."
---

## Objective

The 5amShift Screener is designed to score a fixed stock universe after the US market close and publish a repeatable research snapshot: a Top 10 Buy list, a Top 10 Sell list, a detail page per selected ticker, and an archive of past runs.

Each ticker receives two independent 0 to 100 scores:

- **Jones Long Rating:** how attractive the setup looks for a long-biased, 2 to 3 day directional idea.
- **Jones Short Rating:** how attractive the setup looks for a short-biased, 2 to 3 day directional idea.

A name that scores strongly in both directions should be treated as ambiguous and excluded from the published lists.

## Universe and data flow

The default universe is the S&P 500 plus Nasdaq 100, de-duplicated and stored in a configurable `universe.csv`. Daily OHLCV history should be stored locally, then updated with only the latest trading day on each run.

Weekly metrics are resampled from daily bars instead of fetched separately. That keeps the weekly view consistent with the stored daily history and avoids extra API usage.

Fundamentals should be refreshed weekly or around earnings dates because valuation inputs do not change every day. News and sentiment should be fetched only for the long and short shortlists to keep free-tier API usage under control.

## Scoring pillars

The Long Rating and Short Rating use the same four pillars with direction-specific logic.

### Weekly trend: 30%

For long setups, the model favors constructive weekly trend: price above the weekly 20-EMA, positive 4-week and 12-week momentum, a healthy weekly RSI range, and room to run inside the 52-week range. Short setups mirror the logic with weakening weekly trend, negative momentum, and bearish range position.

### Technical setup: 30%

For long setups, the model looks for daily 20/50/200 SMA alignment, useful proximity to support, RSI that is not overextended, ATR-based risk sizing, and volume confirmation. Short setups mirror the logic with rejection near resistance, breakdown conditions, and weak or rolling-over momentum.

### Valuation: 25%

The fair-value view should blend forward P/E versus historical median, PEG, and EV/EBITDA versus sector or the stock's own history. The detail page should show the actual numbers and the estimated upside or downside versus current price.

### News sentiment: 15%

The model should summarize recent headline sentiment, catalysts, and caution flags. Any name with earnings inside the next three trading days should carry a visible warning rather than implying a clean setup.

## Label bands

- **80 to 100:** Strong
- **65 to 79:** Favorable
- **50 to 64:** Neutral-lean
- **35 to 49:** Weak
- **0 to 34:** Avoid

## Trade-plan fields

Every selected ticker should include a plain trade-plan record:

- Entry zone and trigger condition
- Target, usually next resistance/support or an ATR-based move
- Stop or get-out level
- Risk-reward ratio
- Directional options note for calls or puts, with a reminder that short-dated options can lose the full premium

## Freshness rules

Every page should show the market date, run timestamp, data source, and data freshness. If any input is stale or missing, the page should say so directly.

## Compliance posture

This section is educational research. It is not investment advice, not a solicitation, and not a recommendation to trade. Public display should respect the terms of every data provider used by the scheduler.