# Revenue models for mobile tycoon / trading / production sims (2025-2026 view, for "Tezgâh")

Research notes compiled 2026-11-16. Several primary sources (GameAnalytics PDF, Appodeal case study, Adjust Turkey report, Kolibri interviews) failed to load because of network/DNS errors. Where only a search summary was available, that is stated. Figures marked **[TR]** are Turkey-specific.

## 1. Which models do comparable games use?

### Takeaway
The genre standard is hybrid: free-to-play IAP (premium currency, starter/limited offers, speed-ups) plus rewarded ads built around natural wait points, with a season/farm pass layered on top. Persistent competitive browser-style management games (Torn, Airline Manager 4) lean on subscription/"VIP" status instead of ads. Idle tycoons started ad-led and moved toward IAP and live events as they matured.

### Cited Findings
- **Hay Day (Supercell)**: IAP-only diamond packs plus "Special Offer" bundles and a **Farm Pass Bundle** (season pass). Turkish App Store prices observed Nov 2026: ₺15, ₺19, ₺45, ₺55, ₺109, ₺269, ₺379 (Farm Pass Bundle), ₺549 (Sack of Diamonds) **[TR]**. — [App Store TR: Hay Day](https://apps.apple.com/tr/app/hay-day/id506627515)
- **Idle Miner Tycoon (Kolibri)**: IAP list on the Turkish App Store includes Boost Offer ₺49.99, Mystery Boost ₺49.99, Bundle of Super Cash ₺99.99, Event/Chest/Special offers ₺149.99, Starter Package ₺249.99, permanent "Double Cash" ₺399.99 **[TR]**. — [App Store TR: Idle Miner Tycoon](https://apps.apple.com/tr/app/idle-miner-tycoon-gold-games/id1116645064)
- Idle Miner Tycoon started with ads only, monetizing around the idle core loop. Kolibri then added RPG-style features that grew IAP, and live ops/events drove a significant share of revenue. — [Google Play Dev (Medium): monetizing genre-mashing titles](https://medium.com/googleplaydev/strategies-for-effectively-monetizing-genre-mashing-titles-97912f0944e3) (search summary)
- Kolibri reported a 12.52% ARPDAU increase from adding Pangle rewarded video (vendor case study, headline only). — [Pangle](https://www.pangleglobal.com/resource/27816)
- Unity's guidance: idle/simulation games suit an ad-leaning hybrid model. Idle wait moments fit rewarded ads, and IAP lets motivated players accelerate. — [Unity monetization guide](https://unity.com/resources/mobile-game-monetization-guide)
- **Business Empire: RichMan** (closest "become rich" tycoon comparable): free with 10 IAPs priced $1.99–$9.99. A third-party tracker estimates Android revenue at roughly **64% IAP / 36% ads**, with 21.3M installs, ~266K MAU and >$50K/month (estimates). iOS shows ~2M installs, ~60K MAU, <$10K/month. Appodeal case studies credit a solo indie developer (Ilya Artemov) and are titled "making $15k a day as a sole indie developer". The developer is not Turkish. — [AppGoblin Android](https://appgoblin.info/apps/com.ttterbagames.businesssimulator); [AppGoblin iOS](https://appgoblin.info/apps/6451208928); [Appodeal case study](https://appodeal.com/success-stories/making-15k-a-day-as-a-sole-indie-developer/) (title only; page did not load)
- **Torn** (text-based online crime/economy MMO with a player market and stocks, the closest analogue to Tezgâh's competitive economy): monetized through a **Donator Pack, $5 for 31 days of donator status + 60 points**, or a subscription at $4.85/month or $48.50/year. Donator status gives a 150 energy bar (vs 100), passive regen, advanced search and other perks. Packs are tradable in-game and sell for about $23.5M in-game cash at the pawn shop, so real money converts to in-game cash. — [Torn Wiki: Donator Pack](https://wiki.torn.com/wiki/Donator_Pack); [Torn Wiki: Donator](https://wiki.torn.com/wiki/Donator)
- Torn advertises about 108K–113K "active daily players" on its landing pages. — [torn.com](https://torn.com/)
- **Airline Manager 4**: no ads (browser). Monetized through premium currency and a subscription. The developer replied to an App Store review that it costs **$5.99/month or $49.99/year** and said "the whole core loop is free". The reviewer complained that route expansion was capped without the subscription. Steam English reviews are "Mostly Positive" (~1.7K reviews). — [App Store listing/reviews](https://apps.apple.com/bg/app/id1487669805); [Steam](https://store.steampowered.com/app/1641650/Airline_Manager_4)
- **Season pass ubiquity**: by mid-2025 nearly all top hybrid-casual games had a Season Pass, now a standard feature of new releases. — [AppMagic Monetization Report 2025 via Mobidictum](https://mobidictum.com/?p=206655)
- About 60% of US iOS top-20%-grossing games used a battle pass vs 14% outside the top 20% (GameRefinery, **2022** snapshot). — [PocketGamer.biz / GameRefinery](https://www.pocketgamer.biz/gamerefinery-battle-pass-implementation-in-top-grossing-mobile-games/)
- Battle passes reportedly drive 10–40% of revenue in top F2P titles (vendor blog, no methodology). — [Playio](https://blog.playio.co/battle-pass-monetization)
- **Turkish market tycoon/farm leaders [TR]**: Q2 2025, top Android tycoon games by revenue in Turkey were Hay Day (~$41K/week at start of Q2 → ~$22K/week at end), Township (~$30K → ~$23.7K), Family Island (~$18.8K → ~$16.3K), Build Master: Bridge Race (~$8.9K → ~$12.2K), Klondike Adventures (~$4.9K → ~$3.7K). — [Sensor Tower Q2 2025 Android TR tycoon](https://sensortower.com/blog/2025-q2-android-top-5-tycoon%20games-revenue-tr-602ae798241bc16eb86ec5ed)
- Europe comparison, Q1 2025 unified: Township ~$1.7–2.1M/week, Hay Day peaking at $1.9M/week. — [Sensor Tower Q1 2025 Europe](https://sensortower.com/blog/2025-q1-unified-top-5-tycoon%20games-units-europe-602ae798241bc16eb86ec5ed)

### Inferences
- Tezgâh combines a Hay Day-style production loop with a Torn/AM4-style persistent competitive economy. Plausible mix: (a) rewarded ads at wait points (production timers, auction cooldowns), (b) a per-season pass aligned with the 60-day season, (c) an optional "Kulüp üyeliği"/VIP subscription for convenience perks, modeled on Torn's donator status, and (d) cosmetic items (shop/club appearance, titles, bowling skins).
- Even Hay Day's top Android weekly revenue in Turkey is ~$22–41K, roughly 1/50th of its European revenue. Turkey alone supports only a modest IAP ceiling for this genre.

### Gaps
- No verified revenue or ad/IAP split for AdVenture Capitalist, Idle Supermarket Tycoon, Airline Manager 4 or Torn (all private).
- I found no Turkish-made trading/production tycoon with published revenue. Turkish developer revenue is ~97% puzzle (see §2).

## 2. Benchmarks (ARPDAU, ARPPU, conversion, ad/IAP split, retention, LTV)

### Takeaway
Retention keeps falling. GameAnalytics' 2026 report (2025 data) puts the median at ~22% D1, under 4% D7 and ~0.7–0.8% D30, with the top quartile just over 30% D1. Strategy/management games earn about 2× the market's average ARPDAU and conversion. Idle titles get about 60–70% of revenue from ads, and hybrid-casual ARPDAU estimates run $0.15–0.50 (Tier-1-weighted). Turkey-specific per-user figures are not public.

### Cited Findings
- GameAnalytics 2026 benchmarks (2025 data; secondary summary): median D1 ≈ 22%, D7 < 4%, D30 ≈ 0.7–0.8%. Top quartile D1 is just over 30%. Sample is roughly 11.6K–16.3K games, depending on the summary. — [GameAnalytics 2026 via GameDevReports](https://gamedevreports.substack.com/p/gameanalytics-mobile-and-pc-game); [AppFollow KPI guide](https://appfollow.io/blog/mobile-game-kpis)
- GameAnalytics: strategy games reach about 2× the ARPDAU and conversion rate of the average mobile title. — [GameAnalytics 2025 benchmarks via GameDevReports](https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks)
- Older baseline (**2019**): RPG and strategy had the highest payer conversion, 2–3%. — [WN Hub (2019)](https://wnhub.io/news/analytics/item-2261)
- Idle titles earn ads-heavy revenue (~60–70% ads) with lower ARPDAU than puzzle. GameAnalytics reports idle ARPDAU at about 9× hyper-casual. — [Gamesforum Casual Gaming Report 2025 (PDF)](https://investgame.net/wp-content/uploads/2025/07/Gamesforum-Intelligence-Casual-Gaming-Report.pdf) (search summary)
- ARPDAU ranges (2026 estimates, advisory blog): hypercasual $0.03–0.08, ads-only casual $0.01–0.05, **hybrid-casual $0.15–0.50**. — [Game Growth Advisor](https://gamegrowthadvisor.com/blog/2026-04-02-f2p-monetization-models-comparison-2026/)
- Rewarded impressions per DAU: there is no neutral published benchmark. "3–5/day" is a design rule of thumb, and one vendor cites 2–6. Ad ARPDAU = impressions/DAU × eCPM / 1000. — [Playio rewarded ad benchmarks 2026](https://blog.playio.co/rewarded-ad-benchmarks-2026); [Playio ad revenue calculator](https://blog.playio.co/mobile-game-ad-revenue-calculator)
- Liftoff Mobile Casual Benchmarks 2025 (US Android): idle games averaged **73.2 rewarded videos per user**, vs 101.5 for merge. — [AppDeveloperMagazine](https://appdevelopermagazine.com/mobile-casual-benchmarks-report-2025/)
- Rewarded video eCPM (2023–2025 vendor benchmark): Western Europe ~$3–7. Latin America/emerging markets ~$2–3 or under $2. Middle East Android rewarded was $1.19 in a **2021–22** dataset vs $3.62 in Western Europe. — [Applixir](https://www.applixir.com/?p=3187); [Adpumb 2022](https://adpumb.com/?p=8266)
- AppsFlyer: 59% of gaming IAP revenue comes from paid installs. — [AppsFlyer State of App Marketing & Monetization](https://www.appsflyer.com/resources/reports/app-marketing-monetization-report)
- Ad revenue across mobile games has passed $100B and is growing about twice as fast as IAP (Tenjin). — [Tenjin](https://tenjin.com/blog/mobile-game-monetization-how-genre-impacts-growth/)
- **[TR] Market size**: Turkey's domestic mobile game IAP revenue was **$347M in 2025 (+6% YoY, record)**, with 1.8B downloads (−4% YoY). Top grossers in Turkey: PUBG Mobile $17.3M, eFootball $10.4M, Whiteout Survival $10M. — [Mobidictum on AppMagic Türkiye 2026](https://mobidictum.com/appmagic-turkiye-mobile-gaming-landscape-2026/); [AppMagic PDF](https://appmagic.rocks/files/view/upload/Reports/Turkiye_Mobile_Gaming_Landscape_2026.pdf)
- Conflicting [TR] figures: mobilegamer.biz cites $374M (likely a typo), and Adjust forecast $427.5M for 2025 using a different method. — [mobilegamer.biz](https://mobilegamer.biz/data-digest-turkiye-us-asia-and-mena-market-stats-pokemon-go-ua-funding-and-more/); [Adjust via GameDevReports](https://gamedevreports.substack.com/p/adjust-the-mobile-market-of-turkiye)
- [TR] Turkish developers earned about $2.76B worldwide in 2025 (+25.5%), of which Dream Games was ~$1.7B. Puzzle is ~97% of Turkish developers' revenue and strategy 0.9%. — [Pulse](https://www.pulse.bot/entertainment/news/turkiyes-domestic-mobile-revenue-grew-6-to-347m-in-2025-720c671d-6b8a-453a-a70e-58aee38a8845/); [Mobidictum](https://mobidictum.com/appmagic-turkiye-mobile-gaming-landscape-2026/)
- [TR] Turkey's total gaming market crossed $1B domestic in 2025, with ~50M active gamers. — [Hürriyet Daily News](https://www.hurriyetdailynews.com/turkiyes-gaming-industry-crosses-1-billion-mark-report-219064)
- [TR] iOS users in Turkey spend much more than Google Play users (no figures given). — [FoxData](https://foxdata.com/en/blogs/latest-turkey-mobile-game-marketsubway-surfers-dominates-simulation-genre-gains-momentum/)

### Inferences
- $347M/year across a ~50M-gamer population works out to under ~$7 of IAP per gamer per year. That is very low compared with Tier-1 markets, which makes ads and wide-reach low-price items relatively more important in Turkey.
- Tezgâh has competitive seasons, a wealth ranking and trading, so its economy is closer to strategy/management than to pure idle. Conversion could plausibly land nearer the "strategy" end (2–3%+ in Tier-1), but Turkish purchasing power will pull ARPPU down.

### Gaps
- No published Turkey-specific ARPDAU, ARPPU, conversion % or retention. Adjust's Turkey report (could not load) may contain session/retention data.
- No reliable 2025 median ARPPU or LTV figures for idle/tycoon. The GameAnalytics PDF failed to load.
- No Turkey-specific rewarded/interstitial eCPM. Get it from the AdMob/AppLovin MAX country report after a soft launch.

## 3. Pricing for Turkey (TRY price points, regional pricing)

### Takeaway
Real 2026 Turkish store prices for comparable games range from about ₺15 to ₺549 per item, with the bulk at ₺45–₺150 and season/farm passes around ₺379. Both stores apply regional/local-currency price points; Apple has repeatedly re-tiered Turkey after lira devaluations.

### Cited Findings
- Hay Day TR App Store (observed Nov 2026): ₺15 / ₺19 / ₺45 / ₺55 / ₺109 / ₺269 / ₺379 (Farm Pass Bundle) / ₺549 **[TR]**. — [App Store TR: Hay Day](https://apps.apple.com/tr/app/hay-day/id506627515)
- Idle Miner Tycoon TR App Store: ₺49.99 / ₺99.99 / ₺149.99 / ₺249.99 / ₺399.99 **[TR]**. Kolibri uses .99 endings; Supercell uses round ₺ prices. — [App Store TR: Idle Miner Tycoon](https://apps.apple.com/tr/app/idle-miner-tycoon-gold-games/id1116645064)
- Historical context (**2021**): after the lira crash, Apple raised Turkish tier prices. Tier 1 went from ₺10.99 to ₺16.99, covering apps and one-time IAP but not auto-renewing subscriptions. Proceeds are calculated on the tax-exclusive price. — [MacRumors 2021](https://www.macrumors.com/2021/12/08/app-store-pricing-increase-turkey/)
- Business Empire: RichMan prices its USD IAPs at $1.99–$9.99. — [AppGoblin](https://appgoblin.info/apps/6451208928)
- Benchmark Western subscription prices for the genre: Torn $4.85/month; Airline Manager 4 $5.99/month or $49.99/year. — [Torn Wiki](https://wiki.torn.com/wiki/Donator_Pack); [App Store AM4](https://apps.apple.com/bg/app/id1487669805)

### Inferences
- Suggested Tezgâh ladder **[TR]**: a "starter" item around ₺15–19 to drive first conversion, a core currency pack at ₺45–55, a mid tier at ₺109–149, a season pass at ₺149–249 (below Hay Day's ₺379 bundle so that many more players enter the competition), a VIP/club subscription well below Western $5–6 (e.g. ₺79–129/month), and top packs at ₺269–549.
- Reprice whenever the lira moves sharply. Set prices manually in TRY rather than relying on automatic USD conversion.

### Gaps
- I could not access Google Play's current TRY price-template / minimum-price documentation or Apple's current Turkey price-point chart. Check Play Console > Pricing templates and App Store Connect > Price points.
- No source on Turkish players' willingness to pay for subscriptions specifically.

## 4. Competitive online play without becoming pay-to-win; regulation

### Takeaway
In ranked economies, players tolerate convenience perks (energy, queue slots, search tools, ad removal) and cosmetics, but object when cash can be converted into rank-relevant resources or capacity. Regulation is moving toward price transparency and protecting minors: the EU CPC principles (March 2025) and Turkey's Law 7578 amending Law 5651 (May 2026), which requires age rating.

### Cited Findings
- Torn: donator status gives gameplay perks, but a player argues it is "not p2w" because spending more does not proportionally ease advancement (one forum opinion). Real money can still become in-game cash by pawning donator packs (~$23.5M each). — [Lemmy comment](https://lemm.ee/comment/5341045); [Torn Wiki](https://wiki.torn.com/wiki/Donator_Pack)
- Airline Manager 4: a reviewer complained that route growth was gated behind a subscription and also wanted the option to buy money to progress. The developer defended the subscription as optional with a free core loop. This shows the line between "convenience sub" and "paywall" is contested. — [App Store AM4](https://apps.apple.com/bg/app/id1487669805)
- **EU CPC Network "Key Principles on In-Game Virtual Currencies" (21 March 2025, non-binding)**: they apply only to currency purchasable with real money. Requirements include showing real-money prices for currency and items, avoiding multiple paid currencies and forced exchanges, not selling currency bundles mismatched to item prices, not exploiting vulnerabilities (especially of children), and informing users of 14-day withdrawal rights. Industry bodies (EGDF, Video Games Europe) objected. The Commission held a stakeholder workshop on 3 June 2025 and folds the issues into the planned Digital Fairness Act. — [Bird & Bird 2025](https://www.twobirds.com/en/insights/2025/european-move-towards-protecting-users-from-harmful-practices-in-video-games-eu-consumer-protection); [Reed Smith Q&A](https://www.reedsmith.com/en/perspectives/2025/03/qas-on-the-eu-consumer-protection-authorities-joint-guidance-paper); [European Commission](https://commission.europa.eu/news-and-media/news/european-commission-hosts-stakeholders-talks-application-cpc-networks-key-principles-games-virtual-2025-06-03_pl)
- **[TR] Law No. 7578 amending Law No. 5651** (published in the Official Gazette on 1 May 2026; sources disagree on the gazette number): it brings digital games, developers and distributors under the internet law. Platforms may not offer games without an age rating, and unrated games default to 18+. Parental controls are mandatory, and foreign platforms with more than 100K daily Turkish users must appoint a local representative. There is no direct loot-box ban. The social-media ban for under-15s is separate. A January 2026 draft proposed a 55-minute daily limit for under-16s; whether this survived is unconfirmed. — [Chambers / Gün + Partners](https://chambers.com/articles/a-new-era-for-children-and-gaming-in-turkey); [PocketGamer.biz](https://www.pocketgamer.biz/turkey-passes-sweeping-digital-law-impacting-gaming-platforms-and-social-media/); [Turkish Minute (draft)](https://www.turkishminute.com/2026/02/03/turkey-seeks-stricter-controls-on-online-gaming-platforms-under-draft-law/); [Mondaq](https://www.mondaq.com/turkey/gaming/1802102/turkey-digital-game-regulation)

### Inferences
- For Tezgâh's public wealth ranking: do not sell the ranked currency (game money, gold, shares, land) directly, or the ranking becomes a spending leaderboard. Monetize time and convenience with caps (extra production queue, auto-sell, notifications/advanced market search), plus cosmetics and the season pass. Pass rewards should be cosmetic or capped boosts. Consider a separate "fair" leaderboard, or cap paid boosts per season.
- Since the stock market and gold are virtual, make sure nothing can be cashed out or traded for real money. That keeps the game away from gambling/financial-product framing. Avoid loot boxes, given EU/TR trends and the age-rating duty (a 3+/7+ rating is easier without gambling-like mechanics).
- Use a single premium currency with ₺ prices shown, in line with the CPC principles. This also helps a later EU launch.

### Gaps
- No systematic data (surveys or review analysis) on player reactions specifically in Turkish tycoon games.
- The final text of Law 7578's secondary regulations (age-rating body, playtime limits) was unconfirmed at the time of research.

## 5. Revenue estimate method (10K / 100K DAU, hybrid, Turkey)

### Takeaway
Revenue ≈ DAU × (IAP ARPDAU + ad ARPDAU), where ad ARPDAU = rewarded impressions/DAU × eCPM/1000 and IAP ARPDAU = daily payer conversion × average transaction value. Turkey-specific inputs are not public, so the figures below are an assumption-driven scenario model, not sourced benchmarks.

### Cited Findings (inputs)
- Ad ARPDAU formula and the 3–5 rewarded/DAU rule of thumb — [Playio calculator](https://blog.playio.co/mobile-game-ad-revenue-calculator)
- Emerging-market rewarded eCPM ~$2–3 or lower — [Applixir](https://www.applixir.com/?p=3187)
- Hybrid-casual ARPDAU $0.15–0.50 (Tier-1-weighted) — [Game Growth Advisor](https://gamegrowthadvisor.com/blog/2026-04-02-f2p-monetization-models-comparison-2026/)
- Turkish IAP price points ₺15–₺549 — App Store TR listings above
- Business Empire: RichMan reaches about $50K+/month at ~266K Android MAU with a 64/36 IAP/ad split (third-party estimate) — [AppGoblin](https://appgoblin.info/apps/com.ttterbagames.businesssimulator)

### Inferences (scenario model, all assumptions are mine)
- **Ads [TR]**: assume 4 rewarded impressions/DAU at a $1.5–3 eCPM, giving $0.006–0.012 per DAU. Adding a light interstitial (1/DAU at $0.5–1 eCPM) gives roughly **$0.007–0.013 ad ARPDAU**.
- **IAP [TR]**: assume 1.5–3% of DAU are monthly payers, ARPPU ₺250–400/month (~$6–10 at ~₺40/$; check the current rate), plus season pass uptake. Monthly IAP per DAU ≈ $0.09–0.30, which is **$0.003–0.010 IAP ARPDAU**.
- Combined Turkey ARPDAU ≈ **$0.010–0.023**, well below the Tier-1 hybrid range of $0.15–0.50.
  - **10K DAU**: ~$100–230/day, roughly **$3K–7K/month** (gross, before the 15–30% store fee on IAP).
  - **100K DAU**: ~$1K–2.3K/day, roughly **$30K–70K/month**.
  - Sanity check: Business Empire's estimated ~$50K/month at ~266K MAU (global, Tier-1 mix) supports this order of magnitude.
- A per-season subscription or pass tied to the 60-day season could lift ARPPU, since players pay once per competition. Model it as conversion × pass price ÷ 60 days.
- Expansion to Tier-1 markets would likely multiply ARPDAU by about 5–15×, given the eCPM and price gaps. This is an inference from the cited regional eCPM ranges and the Sensor Tower EU vs TR Hay Day revenue gap.

### Gaps
- Real Turkey eCPMs, conversion, ARPPU and retention must come from a soft launch. No public source gives them for this genre.
- The USD/TRY rate used above is an approximation and was not verified for Nov 2026.
