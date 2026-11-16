# In-game advertising for Tezgâh (Capacitor, Turkey-first tycoon): networks, eCPMs, placements, payouts

Research date: 2026-11-16. Some primary sources could not be fetched: github.com and capawesome.io had DNS failures, appodeal.com was blocked, and the Appodeal and TopOn PDFs are image-only. Figures below come from the sources that could be reached. Gaps are marked.

## 1. Ad networks, mediation and Capacitor support

### Takeaway
For a Capacitor app, `@capacitor-community/admob` is the only well-established, actively maintained route, and Capacitor's official docs recommend it. It supports every format Tezgâh needs (rewarded, rewarded interstitial, interstitial, banner, app open), plus UMP consent, iOS ATT and rewarded SSV. No Capacitor plugin was found for AppLovin MAX, Unity LevelPlay or other mediation SDKs. The practical path is AdMob first, then AdMob mediation (other networks added as native adapters), or a custom native bridge if MAX is needed later.

### Cited Findings
- Capacitor's official "Advertisements" guide recommends one plugin, the community-maintained `@capacitor-community/admob`. Install with `npm install @capacitor-community/admob` and then `npx cap update`. — [Capacitor docs](https://capacitorjs.com/docs/guides/ads)
- The npm registry dist-tags show `latest` = 8.4.1 at research time. The README served at `@latest` still says v8.2.0, so the README lags behind the releases. — [npm registry](https://registry.npmjs.org/@capacitor-community/admob); [README via unpkg](https://unpkg.com/@capacitor-community/admob@latest/README.md)
- Per the README, v8 requires Capacitor 8.5 or later (use `@7` for Capacitor 7), iOS 15+ and Android API 24+. It pins Google Mobile Ads SDK Android 25.4.x and iOS 13.11.0, with UMP Android 4.0.0. Google's "Next-Gen" Android SDK is deferred to a future major version. The README lists the status as "Actively Maintained" with 2 maintainers. — [README via unpkg](https://unpkg.com/@capacitor-community/admob@latest/README.md)
- Formats and methods in the plugin:
  - Banner: `showBanner`, `hideBanner`, `resumeBanner`, `removeBanner`, plus adaptive sizes.
  - Interstitial: `prepareInterstitial` / `showInterstitial`.
  - Rewarded: `prepareRewardVideoAd` / `showRewardVideoAd`.
  - Rewarded interstitial: `prepareRewardInterstitialAd` / `showRewardInterstitialAd`.
  - App open: `loadAppOpen` / `showAppOpen` / `isAppOpenLoaded`.
  - Native ads have a separate guide.
  - Source: [README](https://unpkg.com/@capacitor-community/admob@latest/README.md)
- UMP consent methods are `requestConsentInfo` (returns `canRequestAds` and whether privacy options are required), `showConsentForm`, `showPrivacyOptionsForm` (since 7.0.3) and `resetConsentInfo`. iOS ATT uses `trackingAuthorizationStatus` and `requestTrackingAuthorization`. — [README](https://unpkg.com/@capacitor-community/admob@latest/README.md)
- Rewarded and rewarded-interstitial ads support server-side verification through the `ssv` option, which needs a `userId` or `customData`. `AdMobRevenueData.networkName` reports which mediation adapter served an impression, so the plugin is aware of mediation. The README has no dedicated mediation setup guide. — [README](https://unpkg.com/@capacitor-community/admob@latest/README.md)
- Alternatives exist but are less proven:
  - Capawesome has announced its own Capacitor AdMob plugin (paid or sponsor-ware ecosystem; could not fetch details).
  - `cap-go/capacitor-admob` was created 2025-10-09.
  - Forks such as `@ququplay/admob` and `capacitor-badr-admob` also exist.
  - Sources: [capawesome announcement (search result)](https://capawesome.io/docs/blog/announcing-the-capacitor-admob-plugin/); [ecosyste.ms cap-go](https://awesome.ecosyste.ms/projects/github.com%2Fcap-go%2Fcapacitor-admob); [npm @ququplay/admob](https://www.npmjs.com/package/@ququplay/admob)
- No AppLovin MAX Capacitor plugin was found. AppLovin officially supports Flutter, Unity, Unreal, Android and iOS. Its Flutter plugin covers interstitial, rewarded, banner and MREC, and its v4.0.0 depends on SDK v13.0.0. — [pub.dev applovin_max](https://pub.dev/packages/applovin_max/changelog); [AppLovin MAX Android rewarded docs](https://support.applovin.com/en/max/android/ad-formats/rewarded-ads)
- AdMob mediation supports AppLovin as a mediated network through adapters. Setup needs an AppLovin SDK Key and Report Key. The docs found were for the Unity plugin. — [Google AdMob Unity mediation: AppLovin](https://developers.google.com/admob/unity/mediation/applovin)
- Vendor case studies show what mediation and network choice can do in idle games:
  - Hyper Hippo (idle publisher) reported +25% ARPDAU after moving to AppLovin MAX. — [casestudies.com](https://www.casestudies.com/company/applovin/case-study/hit-idle-game-publisher-moves-to-max-and-boosts-arpdau-by-25)
  - Kolibri Games (Idle Miner Tycoon) reported +12.52% ARPDAU after adding Pangle rewarded video. — [Pangle](https://pangleglobal.com/resource/27816)
- Tenjin's 2026 ad-monetization benchmark says Japan, Türkiye and Brazil each made up 5% of Android ad revenue share in Q3 2025. That puts Türkiye in the top-10 Android ad-revenue countries by share; this is a revenue-share measure, not an eCPM. — [Tenjin (search snippet)](https://tenjin.com/tr/blog/ad-mon-gaming-2026/)

### Inferences
- **Recommended stack for launch:**
  - `@capacitor-community/admob` v8 with AdMob as the only network.
  - Use UMP. It is required for EEA/UK users, and Turkey itself is not EEA.
  - Use rewarded with SSV so rewards are granted server-side if Tezgâh has a backend; otherwise use the client callback.
- **Adding mediation later:** AdMob mediation needs no JS changes. The AppLovin, Unity, Liftoff, Mintegral, Pangle and Meta adapters are added as native Gradle/CocoaPods dependencies in the Capacitor `android/` and `ios/` projects and configured in the AdMob UI. This is standard native AdMob mediation; the plugin README does not document it, so verify per adapter.
- **Switching to MAX or LevelPlay as the mediation layer:** this would require writing a custom Capacitor plugin around the native SDKs. That is only worth it at meaningful scale, roughly tens of thousands of DAU.
- **Meta Audience Network:** it is bidding-only and is typically accessed through a mediation platform. This is unverified in this session.
- **Version alignment:** Tezgâh must be on Capacitor 8.5+ to use plugin v8. Check `package.json`.

### Gaps
- GitHub (issues count, last commit, open bugs) could not be accessed. Maintenance status is based only on the README and npm tags.
- No documentation was found confirming that AdMob mediation adapters work cleanly with the community plugin. No Turkey-specific fill or eCPM data was found per network (Meta, Mintegral, Pangle, Liftoff).
- No Unity LevelPlay or ironSource Capacitor plugin was found; it was not searched exhaustively.

## 2. eCPM benchmarks (Turkey vs Tier-1, Android vs iOS) and ad ARPDAU

### Takeaway
No reliable, recent, Turkey-specific eCPM figure by format was found in public sources. Turkey is a high-volume, low-eCPM Tier-2 market. Generic sources put Tier-2 eCPMs about 30–60% below Tier-1. The global H1 2025 Android rewarded eCPM was about $6.70, a three-year low. Tezgâh should plan conservatively and use AdMob's own eCPM Trends tool or live data.

### Cited Findings
- **TopOn, H1 2025, global games:**
  - Android rewarded video eCPM was $6.70, a three-year low, and Android interstitial was also at multi-year lows.
  - iOS rewarded eCPM rose 18% year over year.
  - Europe and North America led with rewarded at $12.24 and interstitial at $10.27.
  - Source: [TopOn H1 2025 report (via search)](https://mores.toponad.com/reports/TopOn%20Global%20Mobile%20Games%20Monetization%20Report%20_%202025%20H1.pdf)
- Appodeal's 2025 report says rewarded video has the highest eCPM globally on both platforms. iOS earns higher eCPM, especially in North America and Europe, while Android does well in APAC and LATAM. Turkey is in Appodeal's market set, but its figure could not be extracted because the PDF is image-only. — [Appodeal eCPM Report 2025](https://appodeal.com/wp-content/uploads/2025/03/Appodeal-The-Latest-eCPM-Report-2025.pdf)
- A US iOS rewarded eCPM of about $12–16 is cited, along with "30–60% lower in many tier-2 markets". This is a secondary or vendor source. — [Applixir / search summary](https://www.applixir.com/?p=4354)
- Udonis and Undrads give a top-20-country Android eCPM range of $3.31–$12.91, with the US at $12.91. The data covers about H2 2021–H1 2022 and is old; Turkey's position was not visible. — [Udonis](https://www.blog.udonis.co/mobile-marketing/mobile-apps/ecpms); [Undrads](https://www.undrads.com/blogs/how-much-do-mobile-games-make-per-ad)
- A low-quality aggregator lists Turkey at "$0.35" (AdMob, 2025) with no format or platform and an unclear method. **Do not rely on it.** — [thesrzone](https://www.thesrzone.com/2024/01/admob-ecpm-rates-by-country.html)
- Playwire (Sept 2025) says geography determines AdMob eCPM more than anything else. AdMob launched an "eCPM Trends" benchmarking tool in February 2025 that shows country-level benchmarks inside the account. — [Playwire](https://www.playwire.com/blog/admob-ecpm-benchmarks-what-publishers-should-expect); [ppc.land](https://ppc.land/google-admob-launches-new-ecpm-benchmarking-tool-for-app-publishers/)
- **Rewarded volume in idle games:**
  - ironSource (2020) reported about 9.7 rewarded videos per session, and later "over 11 per idle session, 2x other casual". — [ironSource is.com](https://is.com/?p=58218); [is.com](https://is.com/?p=58444)
  - Appodeal (2025) lists an average of 73.2 rewarded videos per user for idle games and 101.5 for Merge-3. The time window is unclear. — [via Playio/Appodeal search summary](https://blog.playio.co/rewarded-ad-benchmarks-2026)
  - Idle games earn about 9x the ARPDAU of hyper-casual (ironSource, 2020). — [is.com](https://is.com/?p=58218)
  - Hyper-casual ARPDAU is $0.02–0.05; there is no idle row. — [Adapty glossary](https://adapty.io/glossary/arpdau/)
  - A GameRefinery teardown (2021) of Idle Restaurant Tycoon counted 25 ads in a 35-minute session and estimated 20–40 ads per session. — [GameRefinery](https://www.gamerefinery.com/masters-of-ad-placements-idle-restaurant-tycoon-empire/)
  - "ARPDAU rises 30–66% after rewarded implementation" is a secondary claim with an unclear sample. — [Playio 2026](https://blog.playio.co/rewarded-ad-benchmarks-2026)
- iOS users can outperform Android by up to 5x in revenue per user. — [Juegostudio](https://www.juegostudio.com/blog/arpdau-benchmarks-by-game-genre)

### Inferences
- **Working assumptions for a Turkey-heavy Android audience:**
  - Rewarded eCPM is likely in the low single dollars. A rough $1–3 is a placeholder derived from the 30–60%-lower-than-global guidance and the $6.70 global Android rewarded figure; it is not a measured Turkey number.
  - Interstitial would be lower than rewarded and banner much lower, likely cents.
  - Validate with AdMob eCPM Trends after launch.
- **Simple model:** ad ARPDAU = (rewarded views per DAU × rewarded eCPM + interstitial impressions per DAU × interstitial eCPM) / 1000.
  - Example: 5 rewarded views per DAU at a $2 eCPM is $0.01 per DAU per day, so 10k DAU gives about $100/day. This is illustrative arithmetic only.
- **Lira vs USD:** revenue is earned in USD-linked eCPMs while costs are in lira, which works in Tezgâh's favour. But Turkish players' low eCPMs mean ad revenue only becomes material at high DAU. Tier-1 users, if any, contribute disproportionately.

### Gaps
- No verified Turkey rewarded, interstitial or banner eCPM split by Android and iOS for 2024–2026 was found. The Appodeal and TopOn PDFs that might contain them are image-only. Next step: open the PDFs manually, or check AdMob eCPM Trends with the Country=TR filter.
- No tycoon-specific ad ARPDAU in dollars was found from a primary source.

## 3. Best-practice rewarded placements in tycoon/idle games; caps, retention, interstitials, remove-ads

### Takeaway
The highest-converting idle/tycoon placement is the "welcome back" offer to multiply offline earnings ×2 or ×3. Other strong placements are timed income boosts, random "visitor" cash offers, time skips and daily-reward multipliers. Rewards must be clearly valuable and scale with progression. Interstitials affect retention first, so they need A/B testing; many idle hits rely almost entirely on rewarded ads plus a paid "remove ads / instant rewards" pack.

### Cited Findings
- CrazyGames' developer docs call the welcome-back offline earnings ×2/×3 for an ad "one of the highest-converting placements in idle games". They also recommend temporary multipliers (for example 2x for 10 minutes) and daily reward multipliers. — [CrazyGames: monetizing clicker](https://docs.crazygames.com/resources/monetizing-clicker/); [CrazyGames: midcore idle](https://docs.crazygames.com/resources/monetizing-midcore-idle/)
- **Idle Restaurant Tycoon teardown (2021):**
  - Placements:
    - Random "influencer" visitors give a cash payout for a roughly 30-second ad, about 400–2,000 currency versus 5–30 per meal. They appear about every 2–3 minutes.
    - Relaunch shows "double offline profit", with ×3 available for gems.
    - Up to 12 consecutive ads, each giving 12 minutes of 2x profit, for 2 hours total.
    - "Skip to sunrise" for an ad.
  - The Continue button is locked for 2 seconds on relaunch.
  - A one-time "remove ads + instant rewards" purchase (13.99 CAD) is shown on the main screen, in the shop and on relaunch.
  - Lessons: obvious and guaranteed value, offers timed to the player's flow, player choice preserved, rewards that scale with the economy.
  - Source: [GameRefinery](https://www.gamerefinery.com/masters-of-ad-placements-idle-restaurant-tycoon-empire/)
- Idle Supermarket Tycoon runs a ladder of up to 6 rewarded videos, each 2x income, with a final 30-gem reward. — [ironSource](https://is.com/?p=58218)
- Outlets Rush (Supercent) lets returning players choose regular or multiplied rewards via rewarded video. — [MAF](https://maf.ad/en/blog/outlets-rush-arcade-idle/)
- Legend of Slime instead sells an upgradeable offline-income boost (+20%). — [search summary of idle sources](https://www.gamerefinery.com/how-to-build-better-mechanics-for-rewarded-in-game-ads)
- Audiencelab (via Playio) suggests 2–3 opt-in placements per session as a practical frequency guide. — [Playio](https://blog.playio.co/rewarded-ad-benchmarks-2026)
- Interstitial frequency changes can move revenue either way. Interstitials affect engagement and retention first, which then drives revenue. — [Airflux](https://airflux.ai/blog/rethinking-interstitial-ads)
- In one experiment, reordering the interstitial ahead of the results screen and rewarded double-up gave +24–30% ad revenue. — [PocketGamer.biz](https://www.pocketgamer.biz/what-five-in-game-ad-experiments-taught-us-about-player-behaviour-and-revenue/); [Global Games Forum](https://www.globalgamesforum.com/ctv/5-surprises-from-in-game-ad-experiments)
- "A rewarded placement served to a motivated player who chooses it will outperform three placements served to a fatigued one" (vendor opinion). — [Applixir](https://www.applixir.com/?p=4308)
- Vendor case study: adding rewards to Crypto Miner Tycoon gave +355% D30 retention and +124% ad ARPDAU (ZBD). Treat this cautiously. — [ZBD](https://zbdpay.com/case-studies/unlocking-scalability-through-massive-uplifts-for-an-idle-tycoon-game)

### Inferences
- **Mapping to Tezgâh mechanics:**
  - **Welcome back:** "Dükkân kapalıyken kazandığın ×2" on return. This should be the primary placement.
  - **Timed boost:** "Üretim hızı ×2, 10–15 dk", stackable to a cap of about 2 hours.
  - **Extra market listing slot:** temporary or per-day.
  - **Auction:** free re-roll or retry once per day.
  - **Daily chest ×2.**
  - **Random "tüccar/müşteri" event:** a visiting merchant offering lump-sum cash, Idle Restaurant style.
  - **Instant finish:** complete a production or shipment for an ad, capped.
- **Guardrails:**
  - Every rewarded placement should be optional and have a non-ad alternative.
  - Cap per placement per day, and add cooldowns of a few minutes for random events.
  - Scale reward size to current income so it never feels trivial.
  - Grant rewards only on the reward callback (or SSV).
  - Handle "no fill" gracefully: hide the button or show "reklam yok, sonra dene".
- **Interstitials:** avoid them for a tycoon/management game early on, or only after N minutes of play at natural breaks, and never in the first session. A/B test against D1/D7 retention.
- **Banners:** low value; they clutter a Pixi UI and could be skipped.
- **Remove-ads IAP:** in a rewarded-first design, sell it as "reklamsız ödüller" (rewards without watching) or "VIP" rather than plain "remove ads".

### Gaps
- No published 2024–2026 A/B data on interstitials specifically for tycoon or trading sims was found.
- No Turkish-market player sentiment data on ads was found.

## 4. Technical and business: AdMob account, app-ads.txt, test ads, payouts to Turkey, tax

### Takeaway
Apps created in AdMob after January 2025 get **limited ad serving until app-ads.txt is verified**, and the file must be hosted on a public developer website. A separate "app readiness review" can also limit serving. The payout threshold for TRY-reporting accounts is ₺200, paid around the 21st of the month. In Turkey, individual app developers can use the GVK mükerrer 20/B exemption: an exemption certificate, a dedicated bank account, and 15% withholding as final tax under a yearly cap (4.3M TL for 2025). A company route brings invoicing, VAT and corporate tax obligations. Confirm with a mali müşavir.

### Cited Findings
- AdMob says apps created after January 2025 that are not verified "will face limited ad serving". The fix is to host app-ads.txt on the developer website listed in the store, then click "Verify app" in App settings. App verification continues to roll out through 2025, and eventually all publishers must verify. — [AdMob Help 15948559](https://support.google.com/admob/answer/15948559?hl=en); [ppc.land](https://ppc.land/new-admob-policy-requires-app-ads-txt-from-january-2025/)
- A separate "app readiness review" can also cause limited ad serving for new apps. Developer forum reports from 2025 describe apps still limited after verification, including "invalid traffic" limits. — [AdMob Help 10564477](https://support.google.com/admob/answer/10564477); [Google group](https://groups.google.com/g/google-admob-ads-sdk/c/b1YsgKDUhuw)
- Google first introduced app-ads.txt to block unauthorized inventory. — [Google blog](https://blog.google/products/admob/app-ads-txt-protects-app-revenue-and-brand/)
- **AdMob thresholds for TRY reporting currency:** verification ≈ $10 equivalent, payment method selection ₺20, **payment ₺200**, cancellation ₺20. Payment is issued on or around the 21st when the balance exceeds the threshold with no holds. — [AdMob Help 2772208](https://support.google.com/admob/answer/2772208?hl=en)
- Available payment methods vary by country and can include EFT/wire. No official page confirming the method for Turkish accounts was found. — [optad360](https://optad360.com/blog/google-ads-payment-a-guide-for-publishers)
- Google may need tax information depending on location, submitted under Payments. Missing info can lead to a higher withholding deduction, and tax treaties can reduce withholding. The page does not mention Turkey. — [AdMob Help 14135099](https://support.google.com/admob/answer/14135099?hl=en)
- **Turkey, GVK mükerrer 20/B (sosyal içerik üreticisi ve mobil uygulama geliştirici istisnası):**
  - It covers developers selling or earning through app platforms such as Google Play and the App Store.
  - Requirements:
    - An İstisna Belgesi from the tax office.
    - A dedicated bank account through which all such income must be collected.
    - Banks withhold 15%, and this is final; no declaration is needed.
  - The 2025 cap is 4,300,000 TL.
  - Existing sole proprietors apply by petition.
  - The article is dated 2021, updated January 2025, and does not explicitly mention AdMob.
  - Sources: [Mükellef](https://mukellef.co/blog/sosyal-medya-icin-vergi-istisnasi/); [Paraşüt: Google gelirleri](https://www.parasut.com/blog/google-gelirlerinin-vergilendirilmesi); [Kadim Hukuk: AdSense](https://kadimhukuk.com.tr/?p=9218)
- Secondary sources disagree on the cap: 1.9M TL is quoted for 2023, 4.3M TL for 2025, and 3.0M TL is mentioned for 2026. **The 2026 figure is unverified.** — [search summary incl. alomaliye 2026](https://www.alomaliye.com/2026/02/21/sosyal-icerik-ureticilerine-yapilan-odemelerden-gelir-vergisi-ve-kdv-uygulamasi/)
- Companies pay corporate tax and have VAT and invoice obligations on Google revenue. A service-export VAT exemption may apply. — [Paraşüt](https://www.parasut.com/blog/google-gelirlerinin-vergilendirilmesi); [muhasebetr](https://www.muhasebetr.com/yazarlarimiz/menderescetin/023/)

### Inferences
- **Launch checklist:**
  1. Create the AdMob account.
  2. Register the app and link it to the store listing.
  3. Publish a simple website (could be a GitHub Pages or Netlify site for Tezgâh) with `/app-ads.txt` and set it as the developer website in Play Console and App Store Connect.
  4. Verify in AdMob.
  5. Configure UMP messages (GDPR, plus an IDFA/ATT message for iOS).
  6. Use Google's test ad units, or register test devices, during development. Never click your own live ads, to avoid invalid-traffic bans.
- **Low payout threshold:** ₺200 is easy to reach. In a TRY-currency account, payments go to a Turkish bank. For 20/B, that should be the dedicated "istisna" account.
- **Tax route:** the 20/B route (15% final withholding) is likely simplest for an individual until revenue nears the cap. Beyond that, or with other income streams, a şahıs/limited şirket is needed. A mali müşavir must confirm that AdMob ad revenue falls under 20/B.

### Gaps
- No official confirmation was found of which payment methods (EFT vs wire) AdMob offers Turkish publishers, or of USD vs TRY account behaviour.
- The 2026 20/B cap and whether AdMob revenue explicitly qualifies were not confirmed from GİB or Resmî Gazete.
- No official AdMob statement was found on how long new-app limited serving lasts.
