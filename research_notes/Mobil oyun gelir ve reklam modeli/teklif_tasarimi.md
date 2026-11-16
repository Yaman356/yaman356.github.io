# Store offers and ad rewards in competitive, season-based sim/tycoon games (fairness-preserving design)

Research method note: about 15 web searches and fetches, run 2026-11-16. Several primary pages could not be fetched: pocketgamer.biz and docs.crazygames.com failed DNS lookup, deconstructoroffun.com timed out, and a Liquid & Grit URL returned 404. Where a finding rests only on a search-result snippet, not a full read, it is marked "(snippet)". Sources dated before 2023 are marked "[older]".

## Case studies: season passes, VIP subscriptions, cosmetics, time skips, "remove ads"

### Takeaway
Passes are now standard in top-grossing and hybrid-casual games. They convert many payers at a modest price, but each payer spends little, so a pass works mainly as a retention tool. The biggest player backlash comes from cutting pass value at the same price (Clash of Clans, Sept 2024) and from splitting passes into extra tiers that give power (Clash Royale). Subscriptions and VIP are small but meaningful: Kolibri's one data point is about 20% of IAP revenue in a test.

### Cited Findings
**Season / battle passes**
- Clash of Clans Gold Pass: base price rose to US$6.99 (before local tax/currency) on 1 July 2023, with extra perks added. Some players disliked the increase even with the perks. — [GamingOnPhone, Jul 2023](https://gamingonphone.com/news/clash-of-clans-gold-pass-july-2023-changes-increased-price-bank-capacity-and-more); [Supercell blog: Changes to Gold Pass](https://clashofclans.com/blog/news/changes-to-gold-pass.html)
- Clash of Clans, Sept 2024: Supercell swapped the pass's Hero skin for a decoration at the same price. The community pushed back and Supercell restored the Hero skin. Lesson: players judge a pass on perceived value per price, and lowering its contents without lowering the price triggers backlash. — [EarlyGame, Sep 2024](https://earlygame.in/news/news/clash-of-clans-september-2024-gold-pass-fixed-supercell-to-give-hero-skin-after-community-backlash); [Sportskeeda](https://www.sportskeeda.com/esports/news-clash-clans-fixes-gold-pass-following-community-backlash)
- Clash of Clans, Aug 2025: "global pricing" rolled out in 100+ countries. Some SEA/LatAm prices fell by up to about 50% while prices rose in high-income regions, and Reddit reaction was mixed (snippet). Relevant for Turkey: regional price points are now standard practice at Supercell. — [Supercell news: Clash global pricing upgrade](https://supercell.com/en/news/clash-global-pricing-upgrade/); [Fragster](https://www.fragster.com/supercell-launches-global-pricing-for-clash-of-clans-players/)
- Clash of Clans, Mar 2026: a reported Gold Pass rework added choice rewards and more free-track rewards with no price change. The source is promotional in tone, so treat with caution (snippet). — [SportsDunia](https://www.sportsdunia.com/gaming/clash-of-clans-gold-pass-changes-march-2026)
- Clash Royale: Pass Royale was split into Free / Gold / Diamond tiers, and 2v2 rewards were removed, which drew strong criticism. Supercell said in a 31 March video that it would "take note" of the feedback. Liquid & Grit notes the hardcore community calls the update pay-to-win "even though it has driven a lot of spend" (snippet; exact year not confirmed). — [PocketGamer.biz](https://pocketgamer.biz/news/81222/clash-royale-faces-backlash-following-latest-update/); [Liquid & Grit](https://liquidandgrit.com/?p=13473)
- Clash Royale, 2023: the US$100 cost to unlock Evolution cards was "heavily berated" [2023]. — [PiunikaWeb](https://piunikaweb.com/2023/06/20/clash-royale-100-cost-to-unlock-evolution-cards-heavily-berated/)
- Deconstructor of Fun [older, 2022]: passes "generate strong conversion but are very limited in ARPPU potential". They "extract a bit of revenue from a big chunk of the payer population", and for most players, payers included, the pass is "primarily retention and an engagement mechanism" (snippet; full page timed out). — [Deconstructor of Fun, Battle Passes analysis](https://deconstructoroffun.com/blog/2022/6/4/battle-passes-analysis)
- Deconstructor of Fun [older, 2020] compared Supercell's two pass economies (Clash Royale vs Clash of Clans). — [DoF, Supercell's Battle Pass Clash](https://deconstructoroffun.com/blog/2020/7/16/8jsjtv3v25nfmw9x177ampscr836m0)
- AppMagic 2025 Monetization Report: by mid-2025 nearly all top hybrid-casual games had a Season Pass (snippet). — [Mobidictum summary of AppMagic Monetization Report 2025](https://mobidictum.com/appmagic-monetization-report-2025/)
- A 2025 mobile monetization report credits standardized Season Passes and fail-triggered offers with an 84% rise in hybrid-casual IAP revenue. The figure is not clearly attributed (snippet). — [Game Industry Library, Mobile Monetization Report 2025](https://gameindustrylibrary.com/documents/mobile-monetization-report-2025)
- GameRefinery found battle passes in about 60% of top-20%-grossing mobile games. The date is unclear and probably before 2023 (snippet). — [PocketGamer.biz / GameRefinery](https://www.pocketgamer.biz/news/78958/gamerefinery-battle-pass-implementation-in-top-grossing-mobile-games/)
- GameRefinery/Liftoff podcast: "mini-battle passes" (short event-scoped passes) are a current trend. Web-store subscriptions and VIP hybrids were also discussed. — [Mobile Games Playbook ep. 61](https://www.buzzsprout.com/856837/episodes/16407008-episode-61-looking-forward-what-we-expect-to-dominate-mobile-gaming-in-2025?t=0)
- Sensor Tower data shows 2025 live-ops moving away from routine discount offers toward gacha and multi-pass setups (snippet). — [GameDev Reports weekly recap, Dec 2025](https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-december-32f)

**VIP subscriptions**
- Kolibri Games tested a VIP subscription in Idle Factory Tycoon (Dec 2019). It produced about 20% of purchase revenue over the winter break [older, 2020]. — [Kolibri newsletter Jan 2020](https://admin.kolibrigames.com/press/the-kolibri-games-newsletter-january-2020/)
- No source found that confirms a current subscription or paid offline-earnings boost in Idle Miner Tycoon itself. GameAnalytics describes Kolibri's model as "pay or wait" [older]. — [GameAnalytics: eight lessons from Kolibri](https://www.gameanalytics.com/blog/making-a-hit-idle-game-eight-lessons-from-kolibri-games)

**Monopoly GO (competitive events)**
- Passed US$6B revenue in 2025 in record time, reaching #14 on the all-time global mobile revenue list. — [Scopely / Sensor Tower](https://www.scopely.com/en/news/sensor-tower-scopelys-monopoly-go-hit-6-billion-revenue-milestone-in-2025-in-record-time)
- Deconstructor of Fun: chasing a high leaderboard prize pushes players to use big dice multipliers, take risks and "run out of energy quickly!". Here the leaderboard itself drives spending. DoF also reports Monopoly GO's LTV was 50% higher than Coin Master's in 2024. — [DoF, Coin Master after Monopoly GO (Jul 2025)](https://www.deconstructoroffun.com/blog/2025/7/25/what-happened-to-coin-master-after-monopoly-go); [DoF, Battle Royale meets Casino Royale (Apr 2024)](https://deconstructoroffun.com/blog/2024/4/29/battle-royale-meets-casino-royale?format=amp)
- Tournaments: taking part earns cash, while top ranks earn dice, stickers and event currency (fan wiki). — [Monopoly Wiki](https://monopoly.fandom.com/wiki/Monopoly_Go!_Tournaments)
- "Tycoon Express" added a 7-level seasonal progression on top of daily tournaments, because "high-performing players often weren't adequately rewarded". Daily competitions become a season-long meta progression. — [Liquid & Grit (search snippet; page later 404)](https://www.liquidandgrit.com/monopoly-go-transforms-daily-competitions-into-a-seasonal-progression/)

**Cosmetics-only**
- Cosmetics-only (the Fortnite/Apex/Valorant model) is widely seen as the fair competitive model. Selling power, by contrast, "breaks the implicit competitive contract" (glossary-level source). — [MWM glossary: pay to win](https://mwm.ai/glossary/pay-to-win)
- Counterpoint: one analyst argues most F2P cosmetics-only games "have either shuttered or reworked their monetization", and that competitive integrity alone does not pay the bills (snippet). — [Yahoo/PC Gamer-syndicated op-ed](https://tech.yahoo.com/general/articles/just-cosmetics-monetisation-doesnt-quite-175031479.html)
- Naavik: reception of a cosmetics-only gacha experiment was "generally positive" on fairness grounds. — [Naavik, fair gacha experiment](https://naavik.co/digest/evaluating-the-fair-gacha-games-experiment/); [Naavik, Ananta gacha-free](https://naavik.co/digest/is-neteases-gacha-free-ananta-the-new-blueprint/)
- Gray zone: "pay-for-convenience" items, such as a Where Winds Meet mount skin that auto-collects nearby resources, are presented as not pay-to-win. — [Buffget breakdown](https://buffget.com/news/where-winds-meet-monetization-gacha-or-cosmetic-only-full-breakdown-qa9xbd)

**"Remove ads"**
- iOS price points seen in idle games: Idle Stickman US$2.99; Idle Slayer US$9.99 permanent or US$3.99 per month; Idle Transformation US$2.99; Revolution Idle US$9.99. — [App Pricing Lab: Idle Slayer](https://apppricinglab.com/app/apple/1526599527); [Idle Stickman](https://apppricinglab.com/app/apple/1475489857); [Idle Transformation](https://apppricinglab.com/app/apple/1509685192); [Revolution Idle](https://apppricinglab.com/app/apple/6475233313)
- Melvor Idle dev: about 3% of free mobile players bought the Remove Ads IAP [older, 2021, Reddit]. — [r/MelvorIdle mirror](https://axebps-redlib.hf.space/r/MelvorIdle/duplicates/q9rkd0)

### Inferences
- For Tezgâh, a 60-day season maps cleanly onto a "Season Pass" (one pass per season) plus optional "mini-passes" for in-season events (e.g. the club bowling tournament week).
- To avoid Clash Royale-style backlash, the pass's paid track should hold cosmetics (company logo, building/shop skins, ranking-frame badges that carry over) and convenience items. It should not hold extra money or production multipliers that change ranked net worth.
- Pass value per price should be kept stable or clearly increased season over season. The CoC 2024 episode shows that quietly lowering value is the main trigger for backlash.
- Regional price points (as CoC did in 2025) matter for a Turkish audience. Prices should be set as local TL price points, not converted from USD.
- The Monopoly GO pattern (leaderboard prizes fuel spending) is the opposite of what a fairness-first net-worth ranking needs. If adopted, ranked prizes should be cosmetic or badge-only, so that paying does not buy rank.

### Gaps
- Hay Day Farm Pass and Township pass: no sourced price or design details found (searches returned unrelated results).
- No sourced, current Idle Miner Tycoon store breakdown (subscription, offline boost price).
- No primary 2023-2026 figure for the share of revenue from passes vs one-off packs. Only weak secondary claims exist (e.g. "about a fifth of mobile IAP", from a blog that admits there is no audited figure, [ShaneTheGamer](https://www.shanethegamer.com/research/battle-pass-statistics/)). Treat as unverified.

## How rewarded-ad rewards are sized and capped without breaking rankings

### Takeaway
Industry guidance caps only the ads that pay out economy-moving rewards (premium currency or big multipliers), at about 5 per day or once every few hours. Lighter ad slots (daily multipliers, return-from-offline doubling) stay frequent. I found no public source on how competitive idle games keep ad rewards out of ranked scores. That design has to be built from first principles (see Inferences).

### Cited Findings
- CrazyGames guidance: cap premium-currency rewarded ads at about 5 per day. Gate ad chests to about once every few hours to keep rewards scarce (snippet; page DNS failed). — [CrazyGames rewarded ads deep dive](https://docs.crazygames.com/resources/rewarded-ads-deep-dive/); [CrazyGames monetizing midcore idle](https://docs.crazygames.com/resources/monetizing-midcore-idle/)
- Meta/Facebook Instant Games guidance: do not limit rewarded video to once a day, because players come back several times daily. Test placements such as lobby, daily missions and mailbox [older]. — [Meta developer docs](https://developers.facebook.com/docs/games/monetize/best-practices)
- Common idle-game placements: a daily reward multiplier, a time booster, and "double rewards" on return after a break. Idle Supermarket Tycoon chains up to 6 videos, each giving a 2× multiplier, with a final gem reward and a visible progress checklist. — [ironSource/Unity (is.com) article](https://is.com/?p=58444); [is.com Idle Supermarket example](https://is.com/?p=58218)
- GameRefinery: the best ad placements sit inside the fiction (e.g. Build Car Manager Tycoon places them during exploration). — [GameRefinery: better mechanics for rewarded ads](https://gamerefinery.com/how-to-build-better-mechanics-for-rewarded-in-game-ads)
- Kolibri (Idle Miner Tycoon) saw ARPDAU up about 12.5% after adding Pangle rewarded video (vendor case study). — [Pangle case study](https://www.pangleglobal.com/resource/27816)
- Unity: typically 2-5% of F2P players pay. The other 95-98% are monetized through ads in a hybrid model. — [Unity IAP guide](https://unity.com/resources/in-app-purchases-guide)

### Inferences
- For Tezgâh (about 90 real minutes of active play per season), ad rewards that scale with net worth, such as "2× offline earnings", feed directly into the public ranking. Two safe options follow. (a) Pay ad rewards in non-ranked value: cosmetic currency, pass XP, bowling tries, a faster market-info refresh. (b) Pay ranked value only as flat, small, capped amounts, for example a fixed TL amount that is significant early and negligible at hundreds of millions, plus a daily cap of about 3-5.
- Offline catch-up is already capped at one game day. An "ad to double offline earnings" would let ad-watchers gain up to +1 game day per return. If kept, it should count toward a per-season cap so the ranking gap between ad-watchers and non-watchers is bounded and visible.
- One option is a separate "casual/unranked" mode or progress track where boosts are unlimited, with the ranked season keeping strict parity. This is a design option inferred from the fairness evidence, not a documented industry case.

### Gaps
- No public 2023-2026 source documents how a competitive idle or tycoon game with a public leaderboard sizes ad rewards relative to ranked score. No postmortem was found.
- No sourced benchmarks for rewarded-ad views per DAU in idle tycoons.

## Player sentiment: what is seen as pay-to-win vs fair

### Takeaway
Players accept paying for time, cosmetics and convenience. They revolt when money buys rank or exclusive power, when pass value is lowered at the same price, or when free rewards are removed. Leaderboards where spenders rank highest are a recurring complaint in idle games.

### Cited Findings
- AdVenture Capitalist (Steam): players complain that event leaderboards are won by spenders. One says "as a free-to-play player it's impossible to win any event", and others suspect bots and cheaters pad the boards [older]. — [Steam community thread](https://steamcommunity.com/app/346900/discussions/0/1635237606659297811)
- An itch.io dev comment: an external leaderboard system made server-side validation impossible, which raised integrity worries. — [itch.io post](https://itch.io/post/2918362)
- Clash Royale: change.org petitions ("Make Clash Royale Free to Play Again") and hardcore-community framing of updates as pay-to-win. Supercell's defense is that every card can be earned free, and that paying "primarily compresses the timeline" (snippet). — [Change.org petition](https://www.change.org/p/make-clash-royale-free-to-play-again); [PocketGamer.biz](https://pocketgamer.biz/news/81222/clash-royale-faces-backlash-following-latest-update/)
- Clash of Clans 2024: reduced pass value at the same price led to backlash and a reversal. — [EarlyGame](https://earlygame.in/news/news/clash-of-clans-september-2024-gold-pass-fixed-supercell-to-give-hero-skin-after-community-backlash)
- Rewarded ads are the preferred ad format. Tapjoy found players prefer opt-in rewarded ads over pre-roll by 4:1 (54% vs 32%, with 14% preferring paid download). Unity found 46% prefer rewarded video vs 29% full-screen pop-ups, 20% banners and 5% interstitials [older, pre-2023]. Tapjoy 2022: 53% name rewarded video as their favorite ad type. — [MediaPost](https://www.mediapost.com/publications/article/302685/mobile-gamers-prefer-rewarded-video-ads.html); [GamesBeat on Unity survey](https://gamesbeat.com/unity-the-majority-of-mobile-gamers-are-open-to-engaging-with-incentivized-video-ads/); [Game Developer, Tapjoy 2022](https://www.gamedeveloper.com/press-release/mobile-gamers-now-prefer-ad-supported-games-over-pay-to-play-games-according-to-tapjoys-modern-mobile-gamer-2022-report)
- Weak or unverified secondary claims: "64% of players say ads interrupt gameplay" (Bain, via Applixir) and "94% of US mobile gamers watched a rewarded ad in last 30 days" (data.ai 2024, via a CDN blog). — [Applixir](https://www.applixir.com/?p=3138); [BlazingCDN](https://blog.blazingcdn.com/en-us/rewarded-ads-2025-better-ux-or-just-more-revenue)

### Inferences
- In Tezgâh, the net-worth ranking is the "competitive contract". Anything bought that raises net worth will be read as pay-to-win. A visible "fair ranking" label (e.g. "the ranking cannot be bought; store items are cosmetic or limited to time-saving") would be a positioning advantage.
- A "time skip" also counts as pay-to-win when the season is time-bound and ranked. In a 60-day race, compressing the timeline is the competition. This is unlike CoC/CR, where there is no season end on the main progression.

### Gaps
- No Turkish-market player sentiment data found (Turkish Reddit/Ekşi Sözlük not searched).
- No direct Reddit threads about pay-to-win in competitive tycoon games (e.g. Business Empire, Idle Bank) surfaced.

## Retention and session design for seasonal games and its link to monetization

### Takeaway
The common patterns are login calendars with a valuable final-day reward, streaks that grow in value, and seasonal meta-progression layered over daily competitions (Monopoly GO's Tycoon Express). Passes double as retention tools, and streak-repair is a known (if contentious) monetization hook.

### Cited Findings
- GameRefinery: the two most common daily-reward designs are a monthly calendar with a different gift each day, and a bonus that grows each consecutive day (e.g. Dragon City). The final-day gift is usually the most valuable [older]. — [GameRefinery: progression in daily rewards](https://www.gamerefinery.com/feature-spotlight-progression-daily-rewards/); [GameRefinery onboarding part 2](https://www.gamerefinery.com/keep-your-players-coming-back-introducing-onboarding-best-practices-part-2/)
- GameRefinery: "gifts multiple times a day" and appointment mechanics bring players back several times per day [older]. — [GameRefinery: gifts multiple times a day](https://www.gamerefinery.com/feature-spotlight-gift-multiple-day/); [GameRefinery: appointment mechanics](https://www.gamerefinery.com/keep-your-players-coming-back-introducing-onboarding-best-practices-part-2/)
- ironSource: streak policies range from a reset to day 1 to letting players restore a broken streak with soft or hard currency [older]. — [ironSource LevelUp](https://medium.com/ironsource-levelup/keeping-players-engaged-common-strategies-for-daily-login-by-top-studios-b20d9b595035)
- Critique: daily login bonuses can backfire as a standalone mechanic without deep enough content. — [RoWatcher](https://rowatcher.com/news/reward-schedules-in-roblox-why-daily-login-bonuses-backfire)
- Monopoly GO Tycoon Express turned daily tournaments into a seasonal progression. — [Liquid & Grit](https://www.liquidandgrit.com/monopoly-go-transforms-daily-competitions-into-a-seasonal-progression/)
- DoF: the pass is mainly a retention mechanism for most players [older, 2022]. — [DoF](https://deconstructoroffun.com/blog/2022/6/4/battle-passes-analysis)
- AppMagic: in Merge games, LiveOps events are the core monetization driver, unlike other casual games built around hard currency and bundles (snippet). — [AppMagic Mobile Market Landscape 2026](https://gamedevreports.substack.com/p/appmagic-mobile-market-landscape)

### Inferences
- Tezgâh's season is only about 1.5 hours of active play spread over real days, so a daily login calendar should be measured in real days and tied to the season (e.g. one day per real day for about 7-14 days). Rewards should be cosmetic or pass XP, so absent players do not fall behind in rank.
- Badges carry over between seasons, so a long-term "career" meta (badge collection, company-logo unlocks) can be the persistent layer that passes and streaks feed. This mirrors Tycoon Express turning short competitions into lasting progression.
- Streak-repair for hard currency is a proven hook, but it should affect only cosmetic or pass progress.

### Gaps
- No 2023-2026 numeric retention uplift data for login streaks from a credible primary source. The 45% D30 claim on DEV Community is anonymous and unverified ([DEV](https://dev.to/raiden_studio/intermediate-strategies-for-building-reward-systems-in-mobile-game-development-3h1n)).

## Specific numbers: pass revenue share, pass price, conversion uplift

### Takeaway
Hard primary numbers are scarce. The best available: CoC Gold Pass at US$6.99 base (2023), a Kolibri VIP subscription at about 20% of IAP revenue in a test (2019/20), pass buyers at about 8-20% of active players vs 1-5% for single IAPs (glossary-level, unverified), a remove-ads price of US$2.99-9.99 in idle games, and about 3% remove-ads conversion in one idle game.

### Cited Findings
- Gold Pass base price US$6.99 (from July 2023). — [GamingOnPhone](https://gamingonphone.com/news/clash-of-clans-gold-pass-july-2023-changes-increased-price-bank-capacity-and-more)
- Battle pass purchase rate of 8-20% of active players vs 1-5% for individual IAP items (unverified glossary). — [MWM glossary: battle pass](https://mwm.ai/glossary/battle-pass)
- Kolibri VIP subscription produced about 20% of IAP revenue in a holiday test [older]. — [Kolibri newsletter](https://admin.kolibrigames.com/press/the-kolibri-games-newsletter-january-2020/)
- Rewarded video lifted Idle Miner Tycoon ARPDAU by about 12.5% (vendor case study). — [Pangle](https://www.pangleglobal.com/resource/27816)
- Hybrid-casual IAP revenue up 84%, attributed to Season Passes and fail offers (unclear attribution). — [Game Industry Library](https://gameindustrylibrary.com/documents/mobile-monetization-report-2025)
- Market context: 2025 mobile games IAP about US$81.8B (+1% YoY, Sensor Tower), while AppMagic puts 2025 growth at only +0.2%. The sources conflict in magnitude. — [Game World Observer, Jan 2026](https://gameworldobserver.com/2026/01/21/in-2025-the-revenue-of-the-mobile-gaming-market-grew-but-only-slightly-analysis); [AppMagic landscape](https://gamedevreports.substack.com/p/appmagic-mobile-market-landscape)
- Remove-ads price points of US$2.99-9.99, with Idle Slayer also offering a US$3.99/month version; about 3% conversion at Melvor [older]. — [App Pricing Lab](https://apppricinglab.com/app/apple/1526599527); [Melvor Reddit mirror](https://axebps-redlib.hf.space/r/MelvorIdle/duplicates/q9rkd0)

### Inferences
- A Tezgâh season pass priced near the local equivalent of the CoC tier (adjusted to Turkish regional price points), plus a small permanent remove-ads purchase, follows the established pattern. Exact TL prices should come from current Play Store regional tiers, which were not researched here.

### Gaps
- No verified share of revenue from passes vs one-off packs (2023-2026).
- No verified pass conversion uplift figure from a primary source.
- Hay Day / Township / Monopoly GO pass prices not found.
