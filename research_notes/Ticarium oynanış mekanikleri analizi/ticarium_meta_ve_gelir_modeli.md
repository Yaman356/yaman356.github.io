# Ticarium: finance, competitive/social, side-content and monetization systems (state as of Nov 2026)

> **Method caveat (read first).** In this environment every direct page fetch failed with DNS errors (yuyutogames.helpshift.com, help.ticarium.com, faq.ticarium.com, www.ticarium.com, apps.apple.com, play.google.com, eksisozluk.com, forum.donanimhaber.com, yandex.com.tr, lifesimulator.io, foxdata.com, soft112, apkgk, apkcombo, uptodown). Everything below therefore comes from **web-search result snippets/summaries of those pages**, not from reading the full pages. Numbers quoted are the ones the search index exposed; article bodies that the index truncated are listed under Gaps. URLs point to the page the snippet came from. Where a snippet looked old or its dating was ambiguous, that is flagged.
>
> Three official help sites exist in parallel and overlap: the Helpshift centre (yuyutogames.helpshift.com/hc/{tr,en}/3-ticarium), an older FAQ (faq.ticarium.com/{tr,en}/content/N) and a newer help centre (help.ticarium.com/{tr,en,de}/articles/N). The newer one has a dedicated "Kripto" section; the Helpshift one did not show one in snippets.

## How do bank interest and credit/loans work (rates, limits, penalties)?

### Takeaway
The game has a bank with a current ("checking") account, a savings/term-deposit account that pays interest ("Vadeli Banka", with a "government interest support" mechanic) and several loan types with distinct interest rates, but the actual rates, limits and penalties could not be retrieved: only the article titles were indexed. The bank's term-deposit system and the tax office were reworked in a 2.19.x update (Aug/Sep, most likely 2026).

### Cited Findings
- Google Play listing text: players "manage their own banking accounts with a checking and savings account", with "an interest rate aspect" (the latter phrase is from a player review quoted on the listing). — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Help centre "Company & Bank / Şirketim & Banka" section contains the articles "Types of loans and interest rates" (TR: "Kredi tipleri ve faiz oranları"), "What is the Term Bank government interest support?" (TR: "Vadeli Banka devlet faiz desteği") and "Kredi nasıl hesaplanır?" (how credit is calculated). Only titles were indexed. — [Helpshift EN index](https://yuyutogames.helpshift.com/hc/en/3-ticarium/); [faq.ticarium.com TR](https://faq.ticarium.com/tr/content/37); [help.ticarium.com TR](https://help.ticarium.com/tr)
- The newer help centre describes the section as "Şirket yönetimi ve banka işlemleriyle ilgili temel bilgileri içerir" (basic info on company management and bank transactions). — [help.ticarium.com](https://help.ticarium.com/tr)
- App Store changelog, v2.19.1 (2 Sep): "Tax Office and tax system were reworked, with more options to view, pay, defer, and reduce tax debts"; "the bank's term deposit system and banking screens were also updated". — [App Store listing](https://apps.apple.com/tr/app/ticarium-business-tycoon/id1620118127)
- New-player "government support" applies for the first 2 weeks after joining; "no tax will be charged to you in the first week" (second-week detail was truncated). — [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/)
- A (promotional, old) Turkish forum post says loans can be used to fund investments and that new companies pay no tax in their first week. — [korsanfan.com tanıtım](https://www.korsanfan.com/konu/ticarium.10767/) (old; year not confirmed, treat as c. 2022)
- Bankruptcy/reset exists as an account-level concept ("Hesabımı sıfırlayabilir veya baştan başlayabilir miyim? İflas nedir?"). Content not indexed. — [faq.ticarium.com/tr/content/46](https://faq.ticarium.com/tr/content/46)
- All in-game currencies are virtual; the game "does not provide any financial services, investment services, or real-money transactions". — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- In-game money is denominated in dollars; Turkish App Store reviewers criticise the use of dollars rather than lira. — [App Store TR](https://apps.apple.com/tr/app/ticarium-online-ticaret-oyunu/id1620118127?l=tr)

### Inferences
- The bank is a simulated, system-run institution (deposit interest paid by the game, loans issued by the game); nothing found suggests player-to-player lending. The explicit policy that money transfers between accounts "are not in our game and never will be" (see multiplayer section) supports this.
- "Devlet faiz desteği" on the term bank is probably a bonus on deposit interest (possibly tied to the new-player government-support window), but this is a guess from the title only.
- Tax debts that can be "deferred" and "reduced" (v2.19.1) imply tax arrears accrue as a debt mechanic alongside loans.

### Gaps
- Loan types, interest rates, credit limits, repayment schedule, default penalties: **not found** (article bodies not indexed; help hosts unreachable).
- Deposit interest rate, term lengths, early-withdrawal rules, what "government interest support" pays: **not found**.
- No YouTube/forum guide with bank numbers surfaced in search.

## How does the virtual crypto exchange work (tokens/coins, price movement, player-driven or simulated)?

### Takeaway
A virtual crypto exchange is confirmed to exist (own "Kripto" section in the newer help centre; mentioned in an Uptodown description), but no mechanical detail was retrievable: which coins exist, how prices move, or whether it is player-driven. Do not confuse it with "Ticarium Coin" (the soft-premium currency) or "Tokens" (lucky-draw tickets).

### Cited Findings
- help.ticarium.com has a "Kripto" section described as covering "oyundaki kripto para alım satımı ve borsa işlemleriyle ilgili temel bilgiler" (basics of in-game crypto buying/selling and exchange operations). — [help.ticarium.com/tr](https://help.ticarium.com/tr)
- Uptodown's description says players can "engage with a virtual crypto exchange to diversify investments and profit from market fluctuations". — [Uptodown](https://ticarium-business-tycoon.en.uptodown.com/android)
- A Google Play reviewer says "the stock market is a little broken, as too many inactive people have drowned it" (date not captured; listing snapshot showed 2026 review dates). — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Official disclaimer: currencies are entirely virtual, no real-world value, no investment services. — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Terms of use state virtual currency and items "(including Gold Bars)" have no real-world monetary value. — [ticarium.com terms](https://www.ticarium.com/legal/terms.php?lang=en)

### Inferences
- The "stock market drowned by inactive people" review suggests at least one market in the game is populated by player listings/orders (it may refer to the player goods market rather than crypto; the snippet does not say). This is weak evidence that markets are partially player-driven; it does **not** establish how crypto prices form.
- "Profit from market fluctuations" implies fluctuating prices and buy-low/sell-high play; whether fluctuation is algorithmic/random or order-driven is unknown.

### Gaps
- Coin list, price-update interval, fees, limits, unlock level, any mining mechanic, any link to real crypto prices: **not found**.
- Whether a separate share/stock exchange exists in addition to crypto: **not confirmed**.
- No player sentiment specifically about the crypto exchange was found.

## What are CEO competitions and the PvP event: format, duration, scoring, rewards, how spending affects outcomes?

### Takeaway
Competitive layers confirmed: a "Race of CEOs" (CEO'ların Yarışı) event, a "CEO Pass" (battle-pass style, with reward track and perks), a "World Duel" event added Aug/Sep (likely 2026), weekly rankings (growth, reputation, restaurant), a monthly 30-day Reputation Target event, and level ranking. Rules/scoring/rewards of Race of CEOs and World Duel were not retrievable; a US App Store reviewer states that one must pay to be competitive in "the pvp event".

### Cited Findings
- Store listings: "CEO competitions/CEO Races" in which players "compete with rivals to become the top CEO and climb the leaderboard". — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en&gl=US); [App Store](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)
- Help centre "Events" section lists: "Race of CEOs Event" (TR: "CEO'ların Yarışı Etkinliği Nedir?"), "Updates to the Race Of CEO'S Event", "Memory Card Event", "What is a Lucky Draw?". Bodies not indexed. — [Helpshift EN](https://yuyutogames.helpshift.com/hc/en/3-ticarium/); [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/)
- CEO Pass perks documented: +2 concurrent side-job slots; unlocks the 4th research slot in the Innovation Center. v2.10.0 notes say "CEO Pass rewards were updated". — [Side-job limits FAQ](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/271-what-are-the-limits-for-creating-side-jobs/); [İnovasyon Merkezi](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/); [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
- Memory card event gives "a CEO chest reward based on end-of-game score" (v2.12.11–2.12.15, March). — [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
- "World Duel" event added in v2.19.0 (27 Aug) per one snippet, v2.19.1 (2 Sep) per another. No rules given. — [App Store TR](https://apps.apple.com/tr/app/ticarium-business-tycoon/id1620118127)
- App Store (US) review: "This game is free to play BUT you do have the option to pay for other perks that greatly benefits the growth of your business. Also better shell out if you want to be competitive in the pvp event." Same reviewer: "you have to be on every 30 min or you'll run out of stock or max your energy for the 'side quests'". Date not captured. — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)
- Weekly reputation ranking: "The total value of gifts sent to the top 10 companies in the weekly rankings is distributed ... among the top 10 users as rewards" (split percentages truncated). — [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/)
- Weekly growth ranking: a player must have spent at least 7 days in the game before appearing, because weekly growth rate needs time to compute. — [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/)
- Weekly restaurant ranking rewards are auto-distributed every Wednesday 20:00 GMT+3. — [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/)
- Monthly Reputation Target event (İtibar Hedefi Etkinliği): receiving a gift from another player gives reputation points that feed the event; lasts 30 days, resets monthly, top reward tier at 100,000 reputation points. — [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/286-what-is-a-montly-reputation-target-event/); [help.ticarium.com](https://help.ticarium.com/tr/articles/132-itibar-hedefi-etkinligi-nedir)
- Level system: XP from store sales and production; "main purpose ... is to earn rewards and enter the level ranking"; 50 Ticarium Coins per level-up. — [faq.ticarium.com/en/content/20](https://faq.ticarium.com/en/content/20)
- Official site: "New events every day; compete on global leaderboards"; real-time competition "with thousands of players in the same economy". — [ticarium.com](https://www.ticarium.com/?lang=en)
- Prestige ("Become a Legend"): reset with permanent bonuses; Legend levels 6–10 added in v2.12.20 (6 Apr). Legend level multiplies side-job income (+50%/level) and restaurant income (+20%/level). — [faq.ticarium.com/en/content/53](https://faq.ticarium.com/en/content/53); [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127); [v2.2.11 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/229-v2-2-11-update-notes-29-08-2024/)

### Inferences
- Reputation ranking is directly purchasable in effect: reputation comes from gifts, each gift has a reputation value, and gifts are bought with premium currency; so reputation leaderboards and the monthly reputation event are spend/social-capital driven. (Gift purchase currency itself was not confirmed in snippets.)
- "The pvp event" in the App Store review most plausibly refers to Race of CEOs (the review appears to pre-date World Duel), but this mapping is unconfirmed.
- CEO Pass is a paid season-pass product (it grants slots and has a reward track); its price and season length were not found.

### Gaps
- Race of CEOs: duration, cadence, scoring metric, brackets/leagues, reward table: **not found**.
- World Duel: all mechanics: **not found**.
- Reputation top-10 split percentages; restaurant ranking reward amounts: **not found**.
- CEO Pass price and season length: **not found**.

## How do the restaurant system and side jobs work (active mini-game vs idle)?

### Takeaway
The restaurant is a semi-active order-fulfilment loop (accept order, move ingredients from shelves to a conveyor/production line, collect cash from a register) layered with coin sinks, an ad boost, VIP-gated reports, weekly rankings and (since v2.12.1, Feb 2026) Elite Membership, Prestige Levels and Restaurant Cards. Side jobs are timer-based cooperative jobs between players: create or join, auto-start when full, payout goes to a vault; income scales with side-job level (max 30), boost cards (x2) and Legend level (+50% each).

### Cited Findings
**Restaurant**
- Orders appear in an Orders section; accept with "Start"; clues for required items appear on the production line; the player moves items from shelves onto the conveyor. — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- Start with 4 shelves, expandable to 18 with coins; each shelf-capacity upgrade adds 1,000 units for 50 Ticarium Coins. — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- Extra production lines are bought with coins and bring more orders/earnings. — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- Rejecting an order costs coins: first rejection of the day 5 Ticarium Coins, +5 each further rejection, capped at 50. — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- Rewarded ad: "by watching ads, you can triple the earnings of all your orders for 5 minutes". — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- Restaurant level-up raises cash-register capacity and unlocks products; register money is transferred to cash manually. — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- Restaurant reports require a VIP package. — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- v2.2.11 (29.08.2024, old): restaurant income +20% per Legend level; the +20% income from product-level upgrades becomes +50% for legends. — [v2.2.11 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/229-v2-2-11-update-notes-29-08-2024/)
- v2.12.1 (10 Feb, i.e. 2026): "Elite Membership" for restaurants (raises shelf capacity, earnings and order selection), plus Restaurant Prestige Levels and Restaurant Cards; v2.12.5 (27 Feb) improved Restaurant Card effect display. — [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
- Weekly restaurant ranking rewards paid Wednesdays 20:00 GMT+3. — [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/)
- Complaint: a Play reviewer reported restaurant income suddenly zeroed after an update. — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)

**Side jobs (Ek İşler)**
- Definition: "a structure that allows you to earn extra income in partnership with other players"; post a new job or join another player's; some jobs require specific products; the job starts automatically once enough players join. — [What is the Side Jobs?](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/200-what-is-the-side-jobs/)
- Duration depends on job type; at the end money goes to a vault, collectable any time. — [What is the Side Jobs?](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/200-what-is-the-side-jobs/)
- Progression: start as "porter"; side-job ("moonlighting") level up to 30 unlocks better jobs; top listed job "Rocket Launch" has base income 5 million. — [What is the Side Jobs?](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/200-what-is-the-side-jobs/)
- Boost card keeps the job's energy constant and doubles income (x2); +50% income per Legend level; worked example: Legend 5 + boost on Rocket Launch = 35 million. — [What is the Side Jobs?](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/200-what-is-the-side-jobs/)
- Report section costs 75 coins for 7 days (7-day income graph, all-time income, jobs created/joined). — [What is the Side Jobs?](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/200-what-is-the-side-jobs/)
- Limits: 2 concurrent side jobs at start; Side Job Center level 20 = +1 free; level 30 = +1 via package; "Side Job Limit Package" = +1; CEO Pass = +2. — [Side-job limits FAQ](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/271-what-are-the-limits-for-creating-side-jobs/)
- v2.10.0 (13 Oct 2025): side-job limits updated and the daily creation limit removed. v2.2.11 (29.08.2024): side-job energy purchase activated. — [Updates section](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/116-updates/); [v2.2.11 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/229-v2-2-11-update-notes-29-08-2024/)
- Player views: "side jobs help fill the time between sales" (Play); "you have to be on every 30 min or you'll ... max your energy for the 'side quests'" (App Store). — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US); [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)

### Inferences
- Restaurant = light active mini-game (manual order matching on a conveyor) with idle accumulation in the register; side jobs = idle timers gated by an energy resource and by other players joining, so they are a check-in loop (~30 min per the reviewer), not a skill game.
- Both systems monetise through slot/limit packages, VIP-gated analytics, boost cards and Elite Membership, i.e. convenience and multiplier sales rather than direct stat purchase.

### Gaps
- Per-job table (durations, energy cost, required players/products) was visible to the indexer but column headers were not; values not reproduced here.
- Elite Membership price/duration; Restaurant Card and Prestige details: **not found**.
- Unlock levels for restaurant and side jobs: **not found**.

## What multiplayer interaction really exists: trading between players, friends, chat, companies/alliances?

### Takeaway
Real interaction exists but is indirect: a shared player economy/market (logistics warehouse buying from other players, contracts, auctions, government tenders), cooperatives (guilds with offices, donations, ranks, chat and announcements), global chat with translation, friends list, gifts that confer reputation, invite codes, and co-op side jobs. Direct money transfer between players is explicitly excluded and repeated transactions between two accounts are a bannable "spam" pattern.

### Cited Findings
- Official site: "Buy and sell on the global market"; "Team up with other players and grow together" (cooperatives); real-time shared economy. — [ticarium.com](https://www.ticarium.com/?lang=en)
- Policy: "transfers of money between accounts are not in our game and never will be". — [Helpshift TR Hesap](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/section/101-account/)
- Turkish store reviews list the lack of player-to-player money sending as a missing feature. — [App Store TR](https://apps.apple.com/tr/app/ticarium-online-ticaret-oyunu/id1620118127?l=tr); [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Player goods trade: a Play reviewer complains that after an update the warehouse default switched from the game's own agency goods to products from other players and restocking got pricier; developer replied that the Logistics Warehouse is hidden for new players and unlocks as the company grows. — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Contracts (cancel contract, bulk vehicle removal, vehicle maintenance options) and an "auction world map" exist per changelogs (v2.10.0, v2.13.0, v2.14.x). — [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127); [soft112 changelog](https://ticarium-business-tycoon.soft112.com/)
- Government contracting/tender module: bid on state tenders and deliver products to locations; v2.16.0 (8 Jul): products needing no raw materials can be sold to the government at a margin. — [faq.ticarium.com/en/content/115](https://faq.ticarium.com/en/content/115); [App Store changelog](https://apps.apple.com/tr/app/ticarium-business-tycoon/id1620118127)
- Cooperatives: offices upgraded via member donations; visiting an office gives activity points and bonus energy; president can send announcements (v2.1.17, 15.03.2024); vice presidents can remove members and chat shows join/leave messages (v2.12.1, Feb 2026); separate announcements page in cooperative chat, bot controls (v2.13.5, 22 Apr 2026); cooperative language/flag/photo, activity and donation rankings, cooperative gifts (v2.17.0, Jul 2026). — [faq.ticarium.com/tr/content/65](https://faq.ticarium.com/tr/content/65); [Helpshift Updates](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/116-updates/); [App Store changelog](https://apps.apple.com/cm/app/ticarium-tycoon-strategy/id1620118127?l=en-GB)
- Global chat: news, blocked-user list and full-screen translation added in v2.17.0; message blocking added v2.10.0. — [App Store changelog](https://apps.apple.com/cm/app/ticarium-tycoon-strategy/id1620118127?l=en-GB)
- Friends: "My Friends" button on profile, "End Friendship" button per friend. — [help.ticarium.com DE](https://help.ticarium.com/de/articles/159-wie-entfernt-man-einen-spieler-aus-der-freundesliste)
- Gifts: from a player's profile use the Gift button; each gift has a reputation value; "Showcase" displays up to 6 gifts on the profile (v2.7.0). — [help.ticarium.com itibar](https://help.ticarium.com/tr/articles/130-itibar-nedir-itibar-puani-nasil-kazanilir); [Helpshift Updates](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/116-updates/)
- Invite code (Company page > Invite): inviter earns 25 Coins when the invitee opens a 2nd store, 50 at level 10, 75 at first-level production licence, 100 at final-level production licence. — [faq.ticarium.com/en/content/59](https://faq.ticarium.com/en/content/59)
- Ban policy: bannable = growing accounts via "spam transactions" (same device, same IP block, very frequent similar transactions between two accounts), account sales, exploiting unreported bugs. Escalation: 1st detection 1-day ban + 3% tax on company value; 2nd 3 days + 5%; 3rd 7 days + 10%; 4th 30 days + 20%; 5th or other violations permanent, including device/network re-registration block. Automatic flagging plus periodic manual admin review. — [faq.ticarium.com/en/content/34](https://faq.ticarium.com/en/content/34)
- Multiple accounts are against the rules and "all your accounts and actions are logged". — [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/)
- Old forum view (c. 4.5 years old per the search engine): real shortage of ore/mines, most players hoard materials except during events. — [DonanımHaber](https://forum.donanimhaber.com/online-mobil-ticaret-oyunu-ticaret-simulator--152272506)

### Inferences
- Player-to-player trade is real but mediated by markets/contracts with anti-funnelling surveillance; the ban ladder (tax on company value) is designed to remove the gains from alt-account feeding.
- Social status loop: gifts -> reputation -> weekly/monthly rewards + profile showcase; this is the main direct player-to-player "transfer", and it is one-directional prestige rather than cash.

### Gaps
- Whether private 1:1 messaging exists (only "message blocking" seen): **not confirmed**.
- Cooperative size limits, cooperative-vs-cooperative competition: **not found**.
- Discord/Instagram/TikTok community details: **not found** in search.

## What do Ticarium Coins buy, what does VIP give, what are IAP price points, where are rewarded ads placed?

### Takeaway
Monetization is layered: Diamonds (premium hard currency introduced v2.9.0, 2025) convert into Ticarium Coins (formerly the premium currency, now a soft-premium sink), plus 30-day VIP, monthly No-Ads, CEO Pass, restaurant Elite Membership, numbered "Ticarium Packs", a Starter Pack, limit packages, boost/speed-up cards and lucky-draw tokens. Rewarded ads are embedded across the loop (coins, promo cards, restaurant x3, tokens, new-player cash support). IAP names on the App Store still show Coin packs; current Diamond pack prices were not found.

### Cited Findings
**Currencies**
- Economy revamp: "Diamonds are now the game's premium currency"; bought with real money or in packages; "Those who want to buy Coins can now convert Diamonds to Coins"; all store packages moved to the Diamond system; Diamonds buy special items, speed-up cards and new content. — [Updates We Are Working On!](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/)
- Diamonds were added as a new currency in v2.9.0 with updated packs. — [App Store TR](https://apps.apple.com/tr/app/ticarium-online-ticaret-oyunu/id1620118127?l=tr) (via search summary; v2.10.0 is dated 13 Oct 2025, so v2.9.0 is 2025)
- Free Ticarium Coin sources: level-ups (50 per level), daily rewards, daily quests, watching ads, lucky draw; plus invite-code milestones (25/50/75/100). — [Helpshift TR Genel Oynanış](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/section/104-general-game-play/); [faq.ticarium.com/en/content/20](https://faq.ticarium.com/en/content/20); [faq.ticarium.com/en/content/59](https://faq.ticarium.com/en/content/59)
- Known Ticarium Coin sinks: restaurant shelves/capacity (50 per +1,000 units), restaurant production lines, order rejection (5 to 50), side-job report (75 for 7 days); historically licence "Limit packs" (removed v2.5.0 with refunds) and store TV/Radio promotion (moved to Promo Cards in v2.5.0). — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/); [What is the Side Jobs?](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/200-what-is-the-side-jobs/); [V2.5.0 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
- Old promo post: Ticarium Coin buys VIP "and other advantageous things"; coins also from ads available about every ten minutes or direct payment; VIP benefits matter mostly after a certain level. — [korsanfan.com](https://www.korsanfan.com/konu/ticarium.10767/) (old, pre-Diamond)

**VIP / subscriptions / passes**
- VIP: "a package within the game that speeds up your progress and provides you with advantages"; remaining VIP days shown in-game. — [faq.ticarium.com/tr/content/60](https://faq.ticarium.com/tr/content/60)
- Confirmed VIP perks: 7 daily Promotion-Card ad views vs 5 for non-VIP; access to restaurant reports. — [faq.ticarium.com/tr/content/56](https://faq.ticarium.com/tr/content/56); [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- No-Ads is a separate monthly package; developer reply (UK store): "the No-ADS package is monthly, and if it's not renewed when it expires, you may start seeing ads". — [App Store UK](https://apps.apple.com/gb/app/ticarium-business-tycoon/id1620118127)
- CEO Pass: +2 side-job slots, 4th Innovation Center slot, reward track. — [Side-job limits FAQ](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/271-what-are-the-limits-for-creating-side-jobs/); [İnovasyon Merkezi](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/)
- Other paid items: Side Job Limit Package, speed-up cards (R&D, build, maintenance) obtainable via quests/events or real money, R&D limit card, Promo Cards, Restaurant Elite Membership, lucky-draw Tokens (free, ads or real money; odds displayed). — [Updates We Are Working On!](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/); [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)

**IAP price points (App Store "top in-app purchases" as indexed; snapshot age unclear, some cached pages are old)**
- US: Monthly No Ads $7.99 (another US-dollar storefront shows USD 6.99); 2300 Ticarium Coin $9.99. — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127); [App Store AZ](https://apps.apple.com/az/app/ticarium-business-tycoon/id1620118127)
- UK: 30-Day VIP £7.99; 175 Ticarium Coin £0.99. — [App Store UK](https://apps.apple.com/gb/app/ticarium-tycoon-strategy/id1620118127)
- Greece: 30-Day VIP €8.99; 4250 Ticarium Coin €19.99. — [App Store GR](https://apps.apple.com/gr/app/ticarium-business-tycoon/id1620118127)
- Saudi Arabia: 30-Day VIP SAR 34.99; 400 Ticarium Coin SAR 9.99. — [App Store SA](https://apps.apple.com/sa/app/ticarium-business-tycoon/id1620118127)
- Azerbaijan (USD storefront): 175 Ticarium Coin USD 0.99. — [App Store AZ](https://apps.apple.com/az/app/ticarium-business-tycoon/id1620118127)
- Also listed: numbered "Ticarium Pack" bundles (Pack 1 ... Pack 100) and a Starter Pack. — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)
- User-reported (US, review dated 04/07/2025, "nickname4now"): about $9/month for VIP and about $6/month for no-ads. — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)
- Self-reported spend: one satisfied App Store reviewer says they spend $40-$60 a month, "optional". — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)

**Rewarded-ad placements confirmed**
- Ticarium Coin for watching ads (general). — [Helpshift TR Genel Oynanış](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/section/104-general-game-play/)
- Promotion Cards for store promotion: 5 ad views/day (7 for VIP). — [faq.ticarium.com/tr/content/56](https://faq.ticarium.com/tr/content/56)
- Restaurant: x3 order earnings for 5 minutes. — [Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/)
- Lucky Draw tokens via ads. — [Updates We Are Working On!](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/)
- New-player periodic cash support for watching ads (old promo source). — [korsanfan.com](https://www.korsanfan.com/konu/ticarium.10767/)
- A dedicated help article exists for ads stuck on "Searching for ads". — [Helpshift FAQ 179](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/179-i-can-t-watch-ads-my-game-stays-on-the-searching-for-ads-screen-why/)

### Inferences
- Conversion rate implied by Coin packs: roughly 175-230 Coins per USD at the listed tiers (175/$0.99, 2300/$9.99, 4250/€19.99), i.e. mild bulk discount. Whether these Coin SKUs are still sold after the Diamond migration is unclear; the App Store "top IAP" lists may be stale.
- Since both a paid No-Ads plan and complaints of "ads every few min" exist, the game likely runs interstitial/forced ads in addition to opt-in rewarded ads; a Play reviewer however says ads are "mostly for rewards". Forced-ad frequency is unconfirmed.
- Spending mainly buys speed (speed-up cards, energy, limits/slots, multipliers) and reputation, which compounds in a shared competitive economy; this is the basis of the pay-to-win perception.

### Gaps
- Full VIP benefit list (article body not indexed).
- Diamond pack sizes/prices, Diamond-to-Coin rate, CEO Pass and Elite Membership prices, Turkish-lira price points: **not found**.
- Google Play IAP range string: **not found**.
- Daily reward and daily quest reward amounts: **not found** (only that a streak system with milestone rewards arrived in v2.19.0).

## What are the recurring complaints and praises in player reviews (pay-to-win, early-game confusion, balance changes, bugs, support, bans), with dates where possible?

### Takeaway
Ratings are high (about 4.4 on Google Play, 4.6-4.7 on the App Store) and praise centres on depth, addictiveness and being playable without paying; recurring complaints are pay-for-advantage/PvP spending pressure, ad load vs paid No-Ads, steep/confusing early game, cost-raising balance changes (warehouse, licences), post-update bugs, bans for alleged multi-accounting, and templated developer replies. Few review dates were retrievable.

### Cited Findings
**Ratings**
- Google Play about 4.4 from roughly 11,000 reviews (regional snapshots range 4.0-4.5). — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- App Store US 4.6 from 418 ratings; App Store Turkey 4.7 from about 4,000-4,650 ratings (two snapshots: 4,011 and 4,645). — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127); [App Store TR](https://apps.apple.com/tr/app/ticarium-online-ticaret-oyunu/id1620118127?l=tr)

**Praise**
- "fun and addictive" for strategy fans; "a VERY in depth business game"; "Ads are not over the top, mostly for rewards. You can set your prices for products in your stores"; savings account with interest appreciated. — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Ekşi Sözlük user: has played almost daily since installing, the game pulls you in without tiring you, and you can stay in the game without spending money. — [Ekşi Sözlük](https://eksisozluk.com/ticarium--7396788)
- Developer fixed a black-screen-on-launch bug quickly after the 28 Aug 2024 update, per a reviewer. — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Side jobs "fill the time between sales"; cooperatives "can be joined with some perks". — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)

**Complaints**
- Pay-to-win / spend pressure: "better shell out if you want to be competitive in the pvp event"; "isn't friendly to new players who don't want to invest money"; 04/07/2025 review: $9/month VIP plus $6/month no-ads, otherwise "ads every few min", described as pay-to-get-bonuses. — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)
- No-Ads confusion: "I paid for the remove ads and now I am seeing adverts again?" (UK); developer: package is monthly and lapses. — [App Store UK](https://apps.apple.com/gb/app/ticarium-business-tycoon/id1620118127)
- Early-game confusion: a Play reviewer quit because they "never figured out how, or had the money to expand past one store", no adequate tutorial; developer's reply implies the difficulty is intentional. — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Balance changes: warehouse restocking became more expensive and defaulted to other players' goods; licence fees seen as too high; industrial-facility cap (15) criticised (the licence-limit system was removed in v2.5.0, so this complaint is older). — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US); [App Store TR](https://apps.apple.com/tr/app/ticarium-online-ticaret-oyunu/id1620118127?l=tr); [V2.5.0 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
- Bugs: sales revenue disappearing; restaurant income reset to zero after an update; black screen after 28 Aug 2024 update; "a few concerning notifications, like spyware type". — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Time pressure: "have to be on every 30 min". — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127)
- Bans: a Play user says their account was banned for using different accounts although they only use one, and asks for support. — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Allegation (single user, unverified): admins "look after you" once you deposit money. — [App Store TR](https://apps.apple.com/tr/app/ticarium-online-ticaret-oyunu/id1620118127?l=tr)
- Missing features per Turkish reviews: no player-to-player money sending; dollars instead of lira. — [App Store TR](https://apps.apple.com/tr/app/ticarium-online-ticaret-oyunu/id1620118127?l=tr)
- Market health: "stock market is a little broken, as too many inactive people have drowned it". — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Support: developer replies are largely templated (constantly improving; use in-game live support or support@yuyutogames.com; "resolved with our latest updates"); none of the visible replies addressed pay-to-win or ad frequency directly. — [App Store US](https://apps.apple.com/us/app/ticarium-business-tycoon/id1620118127); [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- Cheating demand exists: a 2022 cheatglobal thread asks for a Ticarium mobile cheat (someone offers paid "help"); a Yandex YaCevap answer warns that cheats for fast money can get the account suspended. — [cheatglobal](https://cheatglobal.com/konu/ticarium-mobil-hile-yapabilecek-var-mi.30862/); [YaCevap](https://yandex.com.tr/yacevap/c/oyun/q/ticarium-oyunu-nasil-oynanir-3834587191)
- Mod-APK sites advertise "Speed Mod/No Ads" builds of v2.14.1. — [gamekillerapp](https://gamekillerapp.com/games/ticarium-business-tycoon)

### Inferences
- Sentiment is polarised by spend profile: engaged long-term players (including voluntary $40-60/month spenders) are satisfied, while non-spenders hit ad load and competitive disadvantage; early churn comes from an under-tutorialised first-store phase.
- The strict, automated ban ladder plus logging of same-device/IP transactions is a likely source of false-positive "I only have one account" complaints (e.g. siblings/shared Wi-Fi), though only one such complaint was actually found.
- Higher Turkish rating (4.7) than global (4.4-4.6) suggests the core audience is Turkish and friction is higher for international newcomers; Arabic localisation work in 2026 indicates MENA expansion.

### Gaps
- Şikayetvar: no Ticarium/Yuyuto complaint page surfaced in search (cannot say none exist).
- Technopat, Reddit, YouTube guides, Discord/Instagram/TikTok: nothing retrievable.
- Most reviews lack dates in snippets; a "Ticarion" App Store listing (id1631756903) with harsh reviews is a different app and was excluded.
- Full Ekşi Sözlük and DonanımHaber threads could not be read.

## What live-ops cadence does the game have (update frequency, events like the Halloween event)?

### Takeaway
Very active live-ops: multiple releases per month (feature release plus several point fixes), with 2026 moving from v2.12 (Feb) to v2.21 (25 Oct), i.e. roughly one minor version a month. Recurring/rotating events include Race of CEOs, Memory Cards, Lucky Draw, monthly Reputation Target, Whack the Mole, World Duel and a Halloween "Ghost Warehouse" event; fixed weekly beats are Wednesday 20:00 GMT+3 ranking payouts and a Sunday 22:00 market reset (old source).

### Cited Findings
- Version timeline (App Store changelog as indexed; day-month given without year for the latest year, read as 2026 because v2.10.0 is dated 13 Oct 2025 and v2.11.0 1 Dec 2025):
  - v2.1.17 (15.03.2024), v2.2.0 (09.08.2024, bug fixes, iOS 14 support), v2.2.11 (29.08.2024). — [Helpshift Updates](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/116-updates/)
  - v2.5.0 (date not captured): licence limits removed, Management Centers, per-minute shop profit, Promo Cards. — [V2.5.0 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
  - v2.7.0: gift Showcase. v2.9.0: Diamonds. v2.10.0 (13 Oct 2025): side-job limits, CEO Pass rewards, message blocking. — [Helpshift Updates](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/116-updates/); [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
  - v2.11.0 (1 Dec 2025), v2.12.0 (2 Feb): Innovation Center, "Send All" vehicles. v2.12.1 (10 Feb): restaurant Elite Membership, Prestige Levels, Restaurant Cards. v2.12.5 (27 Feb). v2.12.11-2.12.15 (Mar). v2.12.20 (6 Apr): Legend levels 6-10. v2.13.0 (8 Apr): contract features, shop managers. v2.13.5 (22 Apr). — [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
  - v2.14.0/2.14.1 (22-23 May; third-party sites show up to 10 Jun 2026): R&D redesign, R&D limit card, market product search, support system update. — [soft112](https://ticarium-business-tycoon.soft112.com/); [Uptodown](https://ticarium-business-tycoon.en.uptodown.com/android)
  - v2.15.x (11-19 Jun), v2.16.0 (8 Jul: new products/facilities, sell to government), v2.17.x (15-23 Jul: cooperative and global chat features), v2.18.0 (10 Aug: fixes), v2.19.0 (27 Aug: Daily Rewards with streak and milestone rewards), v2.19.1 (2 Sep: tax office + term deposit rework; World Duel), v2.20.0 (7 Oct: fixes), v2.21.0 (25 Oct: Halloween). — [App Store changelog](https://apps.apple.com/cm/app/ticarium-tycoon-strategy/id1620118127?l=en-GB); [App Store TR](https://apps.apple.com/tr/app/ticarium-business-tycoon/id1620118127)
  - Note: search mirrors disagree on which notes sit under which version (e.g. Whack the Mole is attributed both to v2.14.0 and v2.21.0; World Duel to v2.19.0 and v2.19.1).
- Halloween: "Ghost Warehouse" event in v2.21.0 (25 Oct): open chests, catch ghosts, collect pumpkin coins, earn rewards; Play listing adds "collect keys to unlock haunted warehouse treasures". — [App Store TR](https://apps.apple.com/tr/app/ticarium-business-tycoon/id1620118127); [Google Play](https://play.google.com/store/apps/details/Ticarium:+Business+Tycoon?id=com.ticarium&hl=en_NZ)
- "Whack the Mole!" mini-game event and Memory Cards improvements; Arabic language/layout work; sounds respect silent mode. — [App Store changelog](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
- Lucky Wheel replaced by token-based Lucky Draw with visible odds; Daily Quests refresh daily and give prizes plus daily-quest points. — [Updates We Are Working On!](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/); [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/)
- Fixed beats: weekly ranking payout Wednesday 20:00 GMT+3; monthly 30-day reputation event; market conditions reset Sunday 22:00 with five sales tiers (old promo post, may be outdated). — [Helpshift General Game Play](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/104-general-game-play/); [korsanfan.com](https://www.korsanfan.com/konu/ticarium.10767/)
- Official site claim: "New events every day". — [ticarium.com](https://www.ticarium.com/?lang=en)
- Developer publishes a forward-looking roadmap page ("Updates We Are Working On!"). — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/)

### Inferences
- 2026 cadence: about 10 minor versions in about 9 months, each followed by 1-5 hotfix builds, so effectively a build every 1-2 weeks.
- 2025-2026 direction: shift from pure economy sim to event/mini-game live-ops (Memory Cards, Whack the Mole, Ghost Warehouse, World Duel), a hard-currency layer (Diamonds), passes/memberships, and social features (chat translation, cooperative gifts/rankings).

### Gaps
- Event calendar (how often Race of CEOs, Memory Cards, Lucky Draw recur; durations): **not found**.
- Ghost Warehouse dates, reward table and monetisation (key/chest purchases): **not found**.
- Whether there were Halloween events in earlier years, or other seasonal events (New Year, Ramadan): **not found**.
- Exact year stamps for the v2.12-v2.21 entries are inferred, not printed in snippets.
