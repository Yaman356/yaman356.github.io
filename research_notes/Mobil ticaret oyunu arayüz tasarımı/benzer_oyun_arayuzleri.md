# UI patterns of comparable economy / trading / tycoon games (research date: 2026-11-14)

Reader note on evidence quality. Coverage is uneven and thinner than the brief asked for. Pages I actually opened and read: Ticarium App Store (TR) listing, Virtonomics official tutorial, Trustpilot pages for Sim Companies and Virtonomics, an EVE Online forum thread, a Hay Day fan-forum thread and a Change.org petition. Items marked "(search snippet only)" come from search-result summaries and were not opened (Google Play, Torn wiki and one aggregator blocked or failed). I found NO usable sourced material for Capitalism Lab, Township, Big Farm, Rise of Industry, OpenTTD mobile ports, AdVenture Capitalist, and no teardown from Game UI Database, Deconstructor of Fun, GameRefinery or GDC Vault. Anything about those games appears only under "Gaps", labelled as unverified recollection.

## 1. How do these games lay out main navigation, HUD, building/production screens, market screens and reports?

### Takeaway
The only two games for which I have sourced structure sit at opposite ends: Ticarium (mobile app) uses a bottom navigation bar and keeps adding search, bulk actions and countdown timers to its screens, while Virtonomics (browser) uses a seven-section top-level menu with deep sub-menus and openly admits its "unusual interface with a large number of numbers" confuses newcomers. EVE-style trading UIs are criticised when order management is split across several windows.

### Cited Findings
Ticarium (the direct inspiration)
- Ticarium has a bottom navigation menu; release notes for v2.17.0 (15 Jul, year not shown on the page, most likely 2026) say the bottom navigation icons were updated. — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Feature set listed by the developer (Yuyuto Games): shops with warehouse inventory, production facilities and chains, mines, lands, logistics warehouse, truck delivery contracts, restaurant system, side jobs, friends and gifting, CEO competitions on a leaderboard. — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Screens the developer chose to redesign in the last year of release notes: R&D screen (v2.14.x, May), banking screens with term deposits and the Tax Office with view / pay / defer / reduce debt options (v2.19.0, 27 Aug), Daily Rewards with streaks and milestones (v2.18.0, 10 Aug). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Search was added in two places: market product search (v2.15.0, 11 Jun) and facility/product search on the facility-type selection screen (v2.12.15, 30 Mar). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Bulk / shortcut actions were added: a "quick-sell" option for some products (v2.15.0), manager assignment inside a "fast management system" (v2.12.20, 6 Apr), bulk vehicle removal and contract cancellation (v2.12.20), item quantity selection (v2.12.11). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Shop shelves got sale countdown timers and purchase animations (v2.13.6, 27 Apr). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Cooperative chat got a separate announcements page (v2.13.5) and "show more" for long messages; cooperatives have activity and donation rankings (v2.16.0). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- App Store rating 4.7/5 from about 5k ratings; 8 languages including Turkish; Arabic with right-to-left layout added in v2.20.0 (7 Oct). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Google Play listing shows about 11.6K reviews (search snippet only; the page itself would not load for me). — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium)

Virtonomics (browser)
- Seven top-level menu sections: MY COMPANY, TOP MANAGER, ACTIVITIES, ANALYTICS, RATING, POLITICS, CONSTRUCTION. — [Virtonomics tutorial, undated, footer ©2026](https://virtonomics.com/blogs/lang/en/tutorial/introducing-virtonomics)
- MY COMPANY contains Enterprises (overview, open new subdivisions), Reports (financial, market, warehouse, logistics, technology), Management (equipment, technologies, licenses, boosters) and Strategy (strategies, models, company goals). — [Virtonomics tutorial](https://virtonomics.com/blogs/lang/en/tutorial/introducing-virtonomics)
- ANALYTICS is separated from the player's own company and holds market analysis (products, competitors, locations, licenses, production), macroeconomics (map, logistics costs, seasonality), reference data and bonuses/restrictions (taxes, fees, demographics). — [Virtonomics tutorial](https://virtonomics.com/blogs/lang/en/tutorial/introducing-virtonomics)

Sim Companies (browser + PWA)
- A Trustpilot summary describes it as having a "minimal interface" over a player-driven economy (search snippet only). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)
- A reviewer praises day-by-day graphs for every product as making information easy to access (search snippet only). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)

Torn (browser, text-heavy market)
- Torn's Item Market now lets players buy directly from a long list of sellers in single or bulk quantities, instead of being redirected to individual bazaars; the 250-listing cap was removed; a 5% sales tax applies since 22 June 2025; anonymous listing costs a 10% fee (search snippet only; wiki returned 403). — [Torn wiki: Item Market](https://wiki.torn.com/wiki/Item_Market)

EVE Online (desktop, relevant as a market-screen reference)
- Traders have to arrange three separate windows (Wallet market transactions, Market Orders, regional Market); the original poster asks to see own orders and own transaction history together in one screen (8 Nov 2023). — [EVE forums](https://forums.eveonline.com/t/ui-market-consolidate-or-reduce-number-of-windows-needed-to-manage-market-orders/426887)

Hay Day (mobile)
- Production buildings start with a small number of queue slots (1 to 3) that players fill; a later update added cancelling queued products with ingredients refunded (search snippet only, fan wiki). — [Hay Day fandom wiki: Production Buildings](https://hayday.fandom.com/wiki/Production_Buildings), [Update log](https://hayday.fandom.com/wiki/Update)

### Inferences
- Ticarium's release notes read like a list of pain points a growing trading game hits: lists get long (so search is added), repetitive per-building actions become tedious (so quick-sell, bulk remove and fast management are added), and finance screens need restructuring once loans/deposits/taxes accumulate. Tezgâh will likely hit the same sequence; building search, bulk actions and a consolidated finance screen early is cheaper than retrofitting.
- Torn's change (buy from an aggregated seller list rather than visiting each seller's shop) and the EVE complaint (own orders and own history scattered) point the same way: a market screen should put the order book, the player's own listings and recent own trades in one place.
- Virtonomics separates "my things" (My Company) from "the world" (Analytics). That split is a reasonable model for Tezgâh's secondary information architecture even if the seven-item top menu is not.

### Gaps
- No sourced description of HUD contents (cash, clock, notification icons) for any game. I could not open store screenshots or Game UI Database / Interface In Game pages.
- No sourced layout for Sim Companies' map, building, exchange or contract screens; search returned nothing from the developer's blog or forum.
- No sourced material at all for Capitalism Lab, Township, Big Farm, Rise of Industry, OpenTTD mobile ports, AdVenture Capitalist, Industry Idle screens.
- Unverified recollection, not from a source in this session and to be checked against the live games before use: Sim Companies opens on a tile map of the player's buildings with a persistent top bar for cash and links to exchange, warehouse and headquarters; Hay Day and Township use a scrollable town/farm as the hub with corner HUD buttons and no tab bar; AdVenture Capitalist uses a single scrolling list of businesses with a side or bottom menu for managers, upgrades and investors.
- Ticarium's exact number and names of bottom tabs are not stated in the listing text.

## 2. How many top-level destinations, and how are secondary features grouped?

### Takeaway
Sourced numbers are scarce: Virtonomics uses 7 top-level sections with finance filed under "My Company > Reports" and leaderboards as their own top-level "Rating"; general mobile UX guidance says 3 to 5 bottom tabs. Ticarium uses a bottom bar but I could not confirm its tab count.

### Cited Findings
- Virtonomics: 7 top-level sections; finance is not top-level (it is a report type under My Company); the leaderboard is top-level (RATING); missions, contests and tenders are grouped under ACTIVITIES. — [Virtonomics tutorial](https://virtonomics.com/blogs/lang/en/tutorial/introducing-virtonomics)
- Ticarium groups co-op features (chat, announcements page, activity and donation rankings, co-op gifts, member-removal rights) inside the cooperative area, and has a global chat alongside. — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Ticarium treats banking and the Tax Office as distinct screens that were redesigned together in one release. — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- General mobile guidance: bottom bar with 3 to 5 clearly labelled destinations; frequently used controls low on the screen because the top is hard to reach on large phones (generic UX blogs, not game-specific, search snippet only). — [UXPeak on Medium](https://medium.com/@uxpeak.com/top-ui-ux-design-tips-how-to-design-a-great-bottom-mobile-navigation-bar-part-6-97acd8b28453), [Appnality guide](https://www.appnality.com/blog/guide-to-mobile-game-ui-ux-design/)

### Inferences
- For Tezgâh's feature list, a plausible 5-tab grouping consistent with the above would be: plots/buildings (home), market (exchange + own listings + auctions), work (contracts, workers), finance (cash flow, loans, reports), and social/season (co-op, leaderboard). This is my suggestion, not something observed in a source.
- Virtonomics' "Activities" bucket (missions, contests, tenders) suggests contracts and time-limited events can share one destination rather than each having its own.

### Gaps
- No sourced tab counts for Ticarium, Sim Companies, Township, Hay Day, Big Farm, Industry Idle, Torn.
- No source comparing bottom-tab vs hub-map vs side-menu retention or usability for this genre.

## 3. What do players praise or complain about?

### Takeaway
Across the sourced reviews, players of trading sims rarely complain about visual style; they complain about opacity (unclear mechanics, weak tutorials), repetitive number-tweaking, waiting, and clunky mobile versions. The loudest purely visual backlash found is Hay Day's March 2023 UI reskin, where long-time players rejected a brighter, more cartoonish look and a changed production-building interface.

### Cited Findings
Sim Companies
- Trustpilot score 4.7/5 from 3,927 reviews (as of Nov 2026). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)
- "Great business learning experience, average UX" (Jean Ducrot, 30 Oct 2026). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)
- "the time to wait for the next actions is too long, and the tutorials are not clear enough for newbie." (G-Khiêm, 20 Oct 2026). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)
- "short-enough timers that it can keep me busy rather than waiting for far too long." (Fairy, 11 Nov 2026), i.e. the opposite view on timers. — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)
- Reviewer says interfaces are "a bit janky, especially the mobile version" (search snippet only, date not captured). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)
- Reviewer says the game does not make it easy to suggest ideas or report issues from inside the game (search snippet only). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)

Virtonomics
- Trustpilot score 4.3/5 from 267 reviews. — [Trustpilot CA](https://ca.trustpilot.com/review/virtonomics.com)
- "Most of my time was spent tweaking numbers for sale prices and supply lines, which annoyingly change every day." and "Some of the mechanics are really obscure, so you end up scratching your head" (sirdorius, 16 Feb 2026). — [Trustpilot CA](https://ca.trustpilot.com/review/virtonomics.com)
- "i think its a little to advanced for beginners unless they have a general understanding" (Zasqia, 28 Aug 2026). — [Trustpilot CA](https://ca.trustpilot.com/review/virtonomics.com)
- A 1-star reviewer calls the interface ugly and hard on the eyes with no dark mode, and complains of donation offers everywhere (search snippet only; I did not see this review on the page I opened). — [Trustpilot NL p.5](https://nl.trustpilot.com/review/virtonomics.com?page=5)
- The developer itself says the game "may seem complicated and incomprehensible to you at the very beginning", citing "an unusual interface with a large number of numbers". — [Virtonomics tutorial](https://virtonomics.com/blogs/lang/en/tutorial/introducing-virtonomics)

Ticarium
- The four App Store reviews shown are about economy rules, not UI: license fees too high (12/09/2022), wanting to send money to friends (11/04/2023), why currency is $ rather than ₺ (03/08/2022), and the 15-facility cap being too low (07/02/2025). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Developer reply: player-to-player money transfer is deliberately not offered to prevent pay-to-win; a future update will let players choose their currency. — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- A Google Play reviewer says the game was enjoyable until warehouse restocking got more expensive and the top warehouse option stopped being Ticarium agency products (search snippet only). — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium)

Hay Day (UI reskin of 27 March 2023)
- Petition created 27 Mar 2023, 360 supporters, closed: the update "changed the UI graphics and the production building interface", "made the game unplayable for left handed players", and asked that the new UI be "an option not an obligation". — [Change.org](https://www.change.org/p/restore-the-previous-hay-day-ui-graphics-and-production-building-interface)
- Fan forum, 31 Mar to 2 Apr 2023: update "killed the whole nostalgia" and the production queue is annoying (auvrt); looks "like a game for 4 year olds" (chezlavigne); cartoonish buttons clash with the farm's natural look (LuvHayDay). — [Just Hay Day forum](https://justhayday.boards.net/thread/1796/new-ui)
- A forum member relays second-hand that Supercell would revise the UI somewhat but not revert it (unofficial, unverified). — [Just Hay Day forum](https://justhayday.boards.net/thread/1796/new-ui)

Industry Idle
- A review-aggregator summary says the UI "can be unintuitive" for new players while the clean interface and symbolic icons are appreciated (search snippet only, low-authority aggregator). — [gamebrain.co](https://gamebrain.co/game/industry-idle)

EVE Online
- "sometimes I slide all three windows around trying to find a good layout" (Circumstantial_Evidence, 9 Nov 2023). — [EVE forums](https://forums.eveonline.com/t/ui-market-consolidate-or-reduce-number-of-windows-needed-to-manage-market-orders/426887)
- A trader complains of having to update an order's price "5 times or more in a day" (Wesfahrn, 9 Nov 2023). — [EVE forums](https://forums.eveonline.com/t/ui-market-consolidate-or-reduce-number-of-windows-needed-to-manage-market-orders/426887)

### Inferences
- The recurring complaint in the text-heavy sims (Sim Companies, Virtonomics) is comprehension, not aesthetics: players want to know why a number is what it is and what to do next. Explanatory affordances (tap a number to see its breakdown, a "next step" prompt) probably matter more for Tezgâh than visual polish.
- Daily re-pricing chores are a known irritant (Virtonomics, EVE). Price-setting UI that shows the current market price next to the input and allows one-tap "match/undercut" would address it; this is my suggestion.
- Hay Day shows the risk of reskinning an established UI: change in control placement (handedness) and tone drew more anger than any missing feature. For a small team, incremental changes with an opt-out are safer than a big-bang redesign.
- Ticarium reviewers asking for ₺ instead of $ suggests Turkish players notice localisation of currency and units; relevant for a Turkish-first game.

### Gaps
- No Reddit threads were retrievable for any of these games (search returned unrelated results).
- No Ekşi Sözlük or Turkish forum entries about Ticarium were found.
- Google Play reviews for Ticarium and Sim Companies could not be read; the sample of Ticarium reviews is four App Store reviews, which is too small to say players have no UI complaints.
- No sourced praise/complaints for Township, Big Farm, Capitalism Lab, Rise of Industry, OpenTTD ports, AdVenture Capitalist, Torn mobile/TornPDA.

## 4. Common patterns for production chains, timers, collect/claim actions and "needs my attention" indicators

### Takeaway
Sourced evidence supports a few concrete patterns: slot-based production queues with cancel-and-refund (Hay Day), countdown timers placed directly on the thing that is selling/producing (Ticarium), streak-based daily rewards (Ticarium), and restrained badge use from general UX guidance. I found no sourced description of how any of these games visualise multi-step production chains.

### Cited Findings
- Hay Day: per-building queue of limited slots; originally queued items could not be discarded, and a later update added cancel with ingredient refund (search snippet only, fan wiki). — [Hay Day fandom wiki](https://hayday.fandom.com/wiki/Production_Buildings), [Update log](https://hayday.fandom.com/wiki/Update)
- Ticarium added countdown timers on shop shelves showing time until sale, plus purchase animations (v2.13.6). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Ticarium refreshed Daily Rewards with streaks and milestone rewards (v2.18.0) and runs short themed events (Halloween "Ghost Warehouse", "Whack the Mole", "World Duel"). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Ticarium added a market status update and contract cancellation (v2.14.x, v2.12.20). — [App Store TR listing](https://apps.apple.com/tr/app/id1620118127)
- Players are split on timer length in Sim Companies: one finds timers short enough to stay busy, others say waiting is "the worst" part (Oct to Nov 2026). — [Trustpilot](https://www.trustpilot.com/review/simcompanies.com)
- Badge guidance (generic, not game-specific, search snippet only): use a dot when "something changed" matters more than the count, abbreviate large counts ("9+", "99+"), never rely on colour alone, and avoid badging every minor update because it causes notification fatigue. — [Setproduct: badge UI design](https://www.setproduct.com/blog/badge-ui-design)

### Inferences
- Because Ticarium put timers on the shelf itself rather than in a separate list, the likely lesson is to show remaining time in place on each building/plot card, and additionally offer one aggregated "what finishes next" list for players with many buildings. The aggregated list is my suggestion.
- Cancel-with-refund on queues was added to Hay Day only later, which implies players wanted to undo mis-taps; Tezgâh should allow cancelling queued production and listings from the start.
- For attention indicators, badge only actionable states (production finished, auction outbid, contract expiring, loan payment due) and keep purely informational changes unbadged.

### Gaps
- No sourced examples of production-chain visualisation (recipe trees, input/output cards) from Sim Companies, Industry Idle, Rise of Industry or Township.
- No sourced description of "collect all" buttons or offline-earnings popups in idle games (AdVenture Capitalist, Industry Idle), although these are widely believed to be standard; treat as unverified.
- No data on push-notification practice for these games.

## 5. Published teardowns or GDC / Deconstructor of Fun / Game UI Database analyses

### Takeaway
I found none. Searches for teardowns of these specific games' UI returned unrelated results, and I did not manage to open Game UI Database or Interface In Game.

### Cited Findings
- The only UI-focused public artefacts found were player-authored: the Hay Day petition and forum thread about the March 2023 reskin. — [Change.org](https://www.change.org/p/restore-the-previous-hay-day-ui-graphics-and-production-building-interface), [Just Hay Day forum](https://justhayday.boards.net/thread/1796/new-ui)
- The closest thing to a developer-authored interface explanation is Virtonomics' own menu walkthrough. — [Virtonomics tutorial](https://virtonomics.com/blogs/lang/en/tutorial/introducing-virtonomics)

### Inferences
- Absence in my searches is not evidence that such teardowns do not exist; the search tool returned poor results for these queries. A manual check of gameuidatabase.com (Hay Day, Township, AdVenture Capitalist entries) and deconstructoroffun.com (Township, Hay Day articles) is still worthwhile.

### Gaps
- Game UI Database, Interface In Game, Deconstructor of Fun, GameRefinery/Liftoff, Mobile Free To Play and GDC Vault were not successfully consulted.
- The most valuable missing step is first-hand: play Ticarium and Sim Companies on a phone for an hour each and screenshot navigation, HUD, a building screen, the market and finance screens. That would settle most gaps above faster than further web search.
