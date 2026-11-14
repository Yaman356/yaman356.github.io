# Mobile game UX principles: navigation, touch ergonomics and FTUE (state as of 2025-2026)

Research date: 2026-11-14. Target product: "Tezgâh" (HTML/CSS/JS in a Capacitor shell, portrait phone, 9 top-level tabs in a horizontally scrolling row under a header HUD, long card lists, 7-step tutorial card).

Reading guide: every bullet under "Cited Findings" is marked **[Evidence]** (measured study or dataset), **[Guideline]** (platform or standards rule), or **[Opinion]** (practitioner advice, vendor blog, unverified figure). Anything without a source sits under "Inferences" or "Gaps".

Source-quality note: platform guidelines (Apple, Google, W3C) and NN/g studies were read directly. Hoober's columns were read directly. Game-specific FTUE and idle-loop material came almost entirely from vendor and developer blogs with thin methodology. I could not retrieve GDC talks, Deconstructor of Fun articles, Celia Hodent's own writing, Luke Wroblewski's posts, or the m3.material.io pages themselves (the site returns no text to a fetcher), so those are listed as gaps rather than paraphrased from memory.

---

## 1. Thumb zone, reachability, and bottom navigation vs. top tabs; how many destinations; what to do with 8-10

### Takeaway
Both platforms put primary navigation at the bottom of a phone and cap it at about five visible destinations (Material: three to five; Apple: fewer is better, avoid the overflow "More" tab; NN/g: show up to four links visibly, hide the rest only as a tradeoff). A 9-tab horizontally scrolling row under the header conflicts with all three: part of the navigation is hidden off-screen, and it sits in the region that is least accurate and hardest to reach.

### Cited Findings

**How people hold phones**
- **[Evidence]** Hoober observed 1,333 people in public over two months ending 8 Jan 2013; 780 were touching the screen. Grip among those: one-handed 49%, cradled 36%, two-handed 15%. One-handed: right thumb 67%, left thumb 33%. Cradled: thumb 72%, finger 28%. Two-handed: 90% portrait. — [Hoober, UXmatters, 18 Feb 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)
- **[Evidence]** The same study found grip changes often, sometimes every few seconds, and tracks the task; Hoober concluded designers should not put low-priority or dangerous functions in hard-to-reach areas on the assumption that nobody goes there, because people shift grip to reach them. — [Hoober 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)
- **[Opinion, conflict]** The popular green/yellow/red "thumb zone" chart (derived from the 2013 work and popularised by others) is disputed by its own source: secondary summaries report Hoober later called that chart wrong, and Addy Osmani's post advises against relying on it. The 2013 article itself carries an editor's note that the study was later updated. — [Monterail summary](https://www.monterail.com/blog/thumb-friendly-navigation-word-oriented-design); [Addy Osmani, "Modern Touch-Friendly Design"](https://addyosmani.com/blog/touch-friendly-design/); [Hoober 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)

**Where accuracy is best, and what goes where**
- **[Evidence]** Hoober's own touch measurements: accuracy varies from about 7 mm at the centre of the screen to about 12 mm at the corners. One-handed use while carrying a bag degrades the farthest corner to over 30 mm. — [Hoober, "Design for Fingers, Touch, and People, Part 3", UXmatters, 10 Jul 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Guideline from that research]** Put key actions and primary content in the middle half to two-thirds of the screen; put secondary options and buttons that lead to other screens along the top and bottom edges; hide tertiary functions in a menu opened from a corner; keep top and bottom bars to as few items as possible (no more than four, five on the largest phones); add extra bottom padding so the last list items can scroll up into the middle of the viewport; keep unrecoverable actions away from frequently used controls. — [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Evidence, secondary]** Hoober's talks state that on every portable touchscreen people prefer to touch the centre of the screen, and scroll content to the centre before tapping it. — [Addy Osmani summary](https://addyosmani.com/blog/touch-friendly-design/); [Hoober slides](https://www.slideshare.net/slideshow/fingers-thumbs-people-15-minute-version/45839635)

**Platform rules for the bottom bar**
- **[Guideline]** Android/Material 3: use a navigation bar for "three to five destinations of equal importance", on compact window sizes, with consistent destinations across screens. — [Android Developers, Navigation bar (Compose)](https://developer.android.com/develop/ui/compose/components/navigation-bar)
- **[Guideline]** Apple HIG (change log through June 2026): on iPhone the tab bar sits at the bottom of the screen. "It's generally easier to navigate among fewer tabs." "Avoid overflow tabs": the More tab "makes it harder for people to reach and notice content on tabs that are hidden". Keep the tab bar visible in every section. Do not disable or hide tab buttons when their content is unavailable; explain why the section is empty instead. Use a tab bar for navigation, not actions. Label every tab, single words where possible. Where tabs are customisable, default to five or fewer. — [Apple HIG, Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- **[Guideline]** Apple HIG on badges: a badge on a tab signals new information that warrants attention; "Reserve badges for critical information so you don't dilute their impact". — [Apple HIG, Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)

**Evidence on hidden vs. visible navigation**
- **[Evidence]** NN/g, 179 participants, 6 live sites, phone and desktop (published 26 Jun 2016). On mobile, navigation was used in 57% of cases when hidden vs. 86% when partly visible ("combo"). Hidden navigation cut content discoverability by more than 20%, made tasks 15% slower on mobile (39% slower on desktop), and raised perceived difficulty (2.6 hidden vs. 2.3 combo vs. 2.1 visible on a 1-7 scale). — [Pernice & Budiu, NN/g, "Hamburger Menus and Hidden Navigation Hurt UX Metrics"](https://www.nngroup.com/articles/hamburger-menus/)
- **[Guideline from that study]** With four or fewer top-level links, show them all. With more than four, hiding some is a reasonable tradeoff, and the cost should be mitigated with in-page links to the important hidden content. — [NN/g 2016](https://www.nngroup.com/articles/hamburger-menus/)
- **[Caveat]** The study tested websites, not games, and did not test a fully visible navigation condition on phones. — [NN/g 2016](https://www.nngroup.com/articles/hamburger-menus/)

### Inferences
- A horizontally scrolling tab row behaves like partly hidden navigation: the tabs scrolled out of view carry the same discoverability penalty that NN/g measured for hidden items and that Apple warns about for the More tab. Players are likely to under-use whatever sits in positions 6-9.
- For 9 destinations the options consistent with the sources are: (a) 4 fixed bottom tabs plus a fifth "More"/hub tab that opens a labelled grid of the rest; (b) regroup 9 into 4-5 parents with a segmented control or sub-tabs inside each; (c) a home/hub screen whose cards deep-link to the less frequent sections (this is the "in-page links" mitigation). Option (b) avoids the More-tab penalty Apple describes; option (a) is the cheapest change. Ranking the 9 tabs by visit frequency from analytics should decide which 4 stay visible.
- Hoober's layout rule maps onto the current design as follows: the header HUD (money, status) is read-only and fine at the top; tab switching belongs at the bottom edge; the per-card primary action (buy, sell, produce) should sit inside the card body rather than in a far corner.
- Apple's "don't hide or disable tabs" rule conflicts with unlocking tabs gradually (see section 3). A workable reconciliation is to keep the bar's slot count stable and show a locked state with its unlock condition, rather than making tabs appear and disappear.
- In a Capacitor shell the bottom bar must be padded with `env(safe-area-inset-bottom)` so it clears the iOS home indicator and Android gesture bar. No source was fetched for this; it is standard web-platform behaviour.

### Gaps
- No controlled study or published A/B test was found that quantifies bottom bar vs. top tabs in a game, or the engagement change from moving navigation to the bottom. Claims of that kind circulate widely but none surfaced with a verifiable primary source.
- The m3.material.io navigation-bar page could not be read directly; the three-to-five figure comes from the Android Developers page that links to it. One secondary source (SAP Fiori's Material-based docs) words the range as two to five, which I could not check.
- Apple's HIG no longer states a hard "maximum five tabs on iPhone" number in the text retrieved; the five-tab figure appears only as the customisation default and as the point where iOS compact widths trigger the More tab.
- Luke Wroblewski's reachability writing and any post-2020 reach study on 6.5-inch-plus phones were not retrieved. Hoober's accuracy figures date from 2013-2017 devices.
- One fetched summary of the 2013 article claimed a 2017 author comment retracting the "people touch the centre" finding; this contradicts Hoober's 2017 column and talks and I could not verify it, so treat the centre-preference claim as probable rather than settled.

---

## 2. Touch target sizes and spacing; evidence on error rates

### Takeaway
Design to about 9-10 mm physical targets: 48 x 48 CSS px with 8 px gaps satisfies Material, exceeds Apple's 44 pt and WCAG AAA's 44 px, and matches the research range where error rates flatten. WCAG 2.2 AA's 24 px is an accessibility floor, not a comfortable size for a game played one-handed on the move.

### Cited Findings

**Standards and platform rules**
- **[Guideline]** Apple HIG: "a button needs a hit region of at least 44x44 pt". Always give custom buttons a press state. Keep prominent buttons to one or two per view. — [Apple HIG, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- **[Guideline]** Google/Android: touch targets at least 48 x 48 dp, with 8 dp or more between targets. 48 dp is about 9 mm physically regardless of screen size; the recommended physical range for touchscreen objects is 7-10 mm. — [Android Accessibility Help, touch target size](https://support.google.com/accessibility/android/answer/7101858)
- **[Guideline]** WCAG 2.2 SC 2.5.8 Target Size (Minimum), Level AA: targets at least 24 x 24 CSS px, unless (spacing) a 24 px diameter circle centred on each undersized target does not intersect another target or its circle, or the target is inline in text, has an equivalent control, is browser-default, or is essential. Zoom cannot be used to justify a smaller target. — [W3C, Understanding SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- **[Guideline]** WCAG SC 2.5.5 Target Size (Enhanced), Level AAA: 44 x 44 CSS px; W3C encourages meeting it for important controls. — [W3C, Understanding SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- **[Guideline]** NN/g: interactive elements should be at least 1 cm x 1 cm (0.4 in), a physical measure and not a pixel count. About 2 mm is the often-recommended minimum spacing, and spacing does not rescue an undersized target. — [Harley, NN/g, "Touch Targets on Touchscreens", 5 May 2019](https://www.nngroup.com/articles/touch-target-size/)

**Measured data**
- **[Evidence]** MIT Touch Lab figures as cited by NN/g: average fingertip 1.6-2 cm wide; average thumb contact area about 2.5 cm wide. — [NN/g 2019](https://www.nngroup.com/articles/touch-target-size/)
- **[Evidence]** Parhi, Karlson & Bederson (MobileHCI 2006): for one-handed thumb use, 9.2 mm targets were sufficient for discrete taps and 9.6 mm for serial taps. — cited in [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Evidence]** Lee & Zhai: 10 mm buttons reached 98-99.4% accuracy. — cited in [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Evidence]** Henze et al. (large-scale in-the-wild study): error rates rise sharply below 15 mm and exceed 40% for targets under 8 mm. — cited in [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Evidence]** Schildbach & Rukzio: while walking, 6.74 mm buttons produced error rates up to 23%; about 20 mm buttons removed almost all problems. — cited in [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Evidence]** Hoober's region-dependent minimums: about 7 mm at screen centre, about 12 mm at corners; list rows at least 9-10 mm tall and tappable across the full row. — [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Opinion]** Hoober advises designing everything about 20% larger than calculated, because device scaling can render a nominal 7 mm control anywhere from 5 mm to 9 mm. — [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Evidence, anecdotal]** NN/g usability examples: a 6 mm x under 1 mm control took a participant about 10 tries to hit; 2 mm dismiss "x" buttons and 1 mm swatches were recurring failures. — [NN/g 2019](https://www.nngroup.com/articles/touch-target-size/)

### Inferences
- In a Capacitor WebView with a standard `width=device-width` viewport, 1 CSS px corresponds to 1 pt on iOS and 1 dp on Android, so the rules translate directly: 48 px minimum hit area, 8 px gaps, 44 px as the hard lower bound for anything a player taps often. The hit area can exceed the visible glyph through padding.
- The riskiest controls in a trading sim are small, adjacent, and consequential: quantity steppers (+/-), close "x" buttons, buy next to sell, and chips in a scrolling tab row. Henze's and Schildbach's numbers suggest these need 48 px or more plus real separation, and buy/sell should not be neighbours at minimum size.
- Bottom-bar items sit at the screen edge where Hoober measured the worst accuracy, which supports bar items of roughly 12 mm width: five items on a 360-390 px wide phone give 72-78 px each, comfortably above that; nine items would give 40-43 px, below Apple's minimum. This is an arithmetic argument for the five-item cap independent of the guidelines.
- Making the whole card row tappable (with a clear single outcome) follows Hoober's full-row rule and reduces precision demands in long lists.

### Gaps
- The primary papers (Parhi 2006, Henze 2011, Schildbach & Rukzio 2010, Lee & Zhai 2009) were not opened; figures are as reported in Hoober's 2017 column. Publication years here are from memory of the literature, not from a fetched page.
- The W3C page does not publish error-rate data behind the 24 px choice; it says the working group reviewed research and the typical target sizes of high-traffic sites.
- A blog claim that users with motor impairments show "up to 75% higher" error rates on small targets (attributed to the MIT Touch Lab) could not be traced to a primary source and should not be used. — [TestParty blog](https://testparty.ai/blog/wcag-target-size-guide)
- No study newer than 2019 on touch accuracy for current 6.5-6.9 inch phones was found.

---

## 3. FTUE, onboarding and tutorials: length, interactivity, skip, contextual tips, D1 impact, progressive disclosure

### Takeaway
The one controlled study retrieved found that front-loaded read-through tutorials did not improve task success or speed and made tasks feel harder; practitioner sources converge on short, interactive, just-in-time teaching with a skip path and per-step funnel tracking. Published numbers on tutorial changes moving D1 retention exist only as vendor anecdotes of a few percentage points, with at least one documented case of a redesign lowering D1.

### Cited Findings

**Retention context (what "good" looks like)**
- **[Evidence]** GameAnalytics 2026 benchmarks (2025 data, 16,262 mobile games with at least 1,000 MAU), as reported by a secondary digest: D1 retention top 25% just above 30%, top 10% about 40%, top 1% 64-68%, and lower in 2025 than 2024. D7 median just under 4%, top 25% 6-7%, top 10% 11-12%. D30 median 0.69-0.79%, top 25% 1.6-1.8%. — [GameDev Reports digest of GameAnalytics, 4 Jun 2026](https://gamedevreports.substack.com/p/gameanalytics-mobile-and-pc-game)
- **[Evidence, secondary]** GameAnalytics 2025 report (2024 data), via secondary coverage: median D1 about 22%, top 10% about 40%; median D7 about 4%, top 10% about 12%. — [GameDev Reports digest, 2025](https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks)
- **[Opinion/benchmark, conflicting]** Genre figures disagree by source and method. Tycoon/idle: D1 40% or higher and D30 about 6% (AppQuantum 2025 via PocketGamer.biz). Simulation: 30.10% D1, 8.71% D7, 2.96% D30 (Mistplay data via Segwise). A Playio table gives far higher ranges (simulation 45-60% D1; idle 35-50% D1) with no stated method. — [PocketGamer.biz](https://www.pocketgamer.biz/marketing-a-new-mobile-game-where-should-studios-start/); [Segwise](https://segwise.ai/blog/mobile-gaming-app-user-retention-strategies.md); contradicted by [Playio](https://blog.playio.co/retention-by-game-genre)

**Do tutorials work?**
- **[Evidence]** NN/g between-subjects test, 70 iPhone users, four apps with skippable deck-of-cards tutorials (published 8 Mar 2020). Read tutorial vs. skipped: task success 91% vs. 94% (not significant, p = 0.443); ease rating 4.92 vs. 5.49 on a 7-point scale (significant, p = 0.047, tutorial readers found tasks harder); task time 93.5 s vs. 85.2 s (not significant), excluding the time spent reading the tutorial. — [Kendrick, NN/g, "Mobile Tutorials: Wasted Effort or Efficiency Boost?"](https://www.nngroup.com/articles/mobile-tutorials/)
- **[Opinion from that study]** Invest in making the UI self-explanatory before building a tutorial; if onboarding is needed, prefer interactive, contextual help. The study did not test contextual tips itself, and it covered four utility apps, not games. — [NN/g 2020](https://www.nngroup.com/articles/mobile-tutorials/)

**Measured or reported effects of tutorial changes in games (all weakly documented)**
- **[Opinion, vendor anecdote]** A mobile RPG that cut its tutorial from 12 pop-ups to 6 and moved to just-in-time teaching reported tutorial completion up 12% and D1 up 4-6 percentage points; the vendor also claims an undocumented 7% average D1 lift across its studies. — [Emhance](https://www.emhance.ai/blog/mobile-game-playtesting)
- **[Opinion, anecdote]** A casual puzzler that replaced a 90-second tutorial with three rewarded micro-challenges reportedly reached 38% D1 and 2.3x tutorial completion; no baseline, sample or test design given. — [gameconsole.link](https://gameconsole.link/why-mobile-games-win-or-lose-on-day-1-retention-in-2026)
- **[Opinion, anecdote]** A simplified-tutorial A/B test reported about 15% higher retention after two weeks, with no baseline or significance stated. — [Onkodex](https://onkodex.com/how-a-b-testing-can-improve-your-video-game-development/)
- **[Evidence, counterexample, secondary]** Google Play's developer blog describes Traplight's new first-time-user funnel lowering D1 from 51% to 48%. I could not open the article itself (HTTP 403), so this figure is from a search summary. — [Google Play Dev, "Testing like a pro"](https://medium.com/googleplaydev/testing-like-a-pro-tips-tricks-to-improve-mobile-game-testing-7f6487c97ac)

**Practitioner consensus (opinion, consistent across sources)**
- **[Opinion]** Track every tutorial step as a funnel event and look for the step with the largest drop. — [GameAnalytics, FTUE tips](https://gameanalytics.com/blog/tips-for-a-great-first-time-user-experience-ftue-in-f2p-games)
- **[Opinion]** Offer a skip path for experienced players and extra reinforcement for novel or complex mechanics; some players will skip entirely. — [Unity, 10 FTUE tips](https://unity.com/how-to/10-first-time-user-experience-tips-games)
- **[Opinion]** Let players act within seconds, teach one concept at a time, make them feel successful early, and end the first session with a visible future goal or pending reward. — [Bugnet](https://bugnet.io/blog/how-to-design-a-tutorial-that-doesnt-bore-players); [Unity](https://unity.com/how-to/10-first-time-user-experience-tips-games)
- **[Opinion]** Frame onboarding around cognitive load: working memory is limited, so reveal concepts when they become relevant and remove anything extraneous to the current task. — [Wayline](https://www.wayline.io/blog/tutorials-onboarding-funnels-ux)
- **[Opinion]** Randomise at install, analyse by cohort, and use D1, D7 and tutorial completion as the primary outcomes when testing FTUE changes. — [gameconsole.link](https://gameconsole.link/why-mobile-games-win-or-lose-on-day-1-retention-in-2026)

### Inferences
- For a 7-step tutorial card, the NN/g result argues that steps which only explain (text to read, then "Next") are the weakest part; each step should be completed by performing the real action on the real control (buy one item, sell it, see the profit), with the card acting as a checklist rather than a slideshow.
- Seven steps is not inherently too long; the reported gains came from halving pop-up count and deferring content, not from hitting a magic number. A defensible structure is 3-4 mandatory actions that complete one full buy-produce-sell loop in the first two or three minutes, with the remaining concepts delivered as contextual tips the first time the player opens the relevant screen.
- Progressive disclosure fits a 9-tab game well: start with the 2-3 tabs needed for the core loop and unlock the rest on milestones. This reduces first-session cognitive load and gives each unlock the role of a goal and reward. To respect Apple's stability rule, keep bottom-bar positions fixed and show locked destinations with their unlock condition (or keep locked features inside the "More"/hub screen until unlocked).
- Realistic expectation setting: with median D1 near 22% and top-quartile just above 30% across all mobile games, a tutorial rework is plausibly worth low single-digit percentage points of D1, not a doubling. The Traplight case shows changes must be A/B tested rather than assumed positive.
- Minimum instrumentation: one event per tutorial step (shown, completed, skipped), time to first sale, and first-session length, split by cohort.

### Gaps
- No rigorous public dataset was found for tutorial completion rate benchmarks, per-step drop-off, or the D1 difference between players who skip and players who complete a game tutorial.
- No GDC talk on FTUE, no Deconstructor of Fun article, and none of Celia Hodent's own writing ("The Gamer's Brain") was retrieved; the cognitive-load framing above comes from blogs that echo those ideas, not from the primary texts.
- No sourced evidence was found on the retention effect of gradual tab/feature unlocking specifically.
- GameAnalytics' genre-level tables (simulation, idle, strategy) were not accessible; only all-genre aggregates via a secondary digest.
- A conference write-up's claims that at most 40% of users continue past day one and only 16% of mobile games exceed 50% retention carry no date or method and were left out of the findings. — [PocketGamer.biz](https://www.pocketgamer.biz/news/77289/pgc-digital-how-to-enhance-the-first-time-user-experience/)

---

## 4. Session design for idle/sim games: return loop, badges, daily goals, "what should I do next"

### Takeaway
Top-quartile mobile games see about 5 short sessions a day of roughly 5 minutes each, so every launch should open with a brief "while you were away" summary and one obvious next action. The return-screen conventions (time away, amount earned, an offline cap of around 8 hours) are genre practice documented in developer blogs, not user research; badge restraint is the one point backed by platform guidance.

### Cited Findings

**Session shape**
- **[Evidence]** GameAnalytics 2026 (2025 data, mobile): session length top 25% about 5.2 min, top 10% 8 min, top 1% about 22 min. Sessions per day top 25% 5.3-5.7, top 10% about 9.6. Daily playtime top 25% 22-24 min, top 10% 40-42 min. Medians were not stated in the digest. — [GameDev Reports digest, 4 Jun 2026](https://gamedevreports.substack.com/p/gameanalytics-mobile-and-pc-game)

**Return loop / offline earnings (developer practice, opinion)**
- **[Opinion]** The welcome-back screen is treated as a signature moment of the genre: a modal stating how long the player was away and what was earned, for example "While you were away for 4 hours, your generators earned 1.25M coins". — [Phaser idle tutorial](https://generalistprogrammer.com/tutorials/phaser-idle-clicker-tutorial); [Offline Progress Manager](https://skypage6.itch.io/offline-progress-manager)
- **[Opinion]** Offline income is usually capped so that accumulation stops and returning feels worthwhile; 8 hours is a common default, chosen so long absences do not trivialise progress. Some designs also run offline production at reduced efficiency (one sample uses 50%). — [Mind Studios](https://themindstudios.com/blog/idle-clicker-game-design-and-monetization); [Game design bootcamp, idle module](https://seanking11.github.io/gamebootcamp/modules/34-idle-incremental)
- **[Opinion, player feedback]** Forced waits on the return popup are resented: a forum thread about a loading bar on a welcome-back dialog shows players reading it as an obstacle. — [war.app forum](https://war.app/Forum/581561-purpose-loading-bar-welcome-back-popup)
- **[Opinion]** Offline calculation must survive crashes and unexpected shutdowns, or players lose trust in it. — [Incremental game wiki mirror](https://wiki.riteme.site/wiki/Idle_games)

**Badges**
- **[Guideline]** Apple: reserve tab badges for critical information so they keep their meaning. — [Apple HIG, Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- **[Opinion]** "Red dot blindness": a badge that is always present stops conveying anything; use a quieter, darker badge style for low-priority items and red only for what needs action. Written about apps generally, not games. — [Braze, "Beware Red Dot Blindness"](https://www.braze.com/resources/articles/beware-red-dot-badging)

**Next-step guidance**
- **[Opinion]** The first session and each later one should leave the player with a future goal, a pending reward and a next challenge, without overwhelming them. — [Unity, 10 FTUE tips](https://unity.com/how-to/10-first-time-user-experience-tips-games)
- **[Evidence, by analogy]** NN/g's mitigation for hidden navigation is in-page links to the important content; a home screen that links directly to the section needing attention applies the same mechanism. — [NN/g 2016](https://www.nngroup.com/articles/hamburger-menus/)

### Inferences
- With sessions of about five minutes, the first ten seconds matter: a return summary should be one screen, dismissible with one tap in the lower half of the screen, with no artificial delay. Useful content for a trading/production sim: time away, goods produced, sales completed, money earned, and anything that stopped (full warehouse, missing input, expired order), each with a deep link to the place where it is fixed.
- If an offline cap exists, state it on the summary ("production paused after 8 h, storage full") so the limit reads as a rule rather than a bug.
- A persistent "next goal" strip or card (one current objective, progress, reward, and a "Go" button that jumps to the right tab) answers "what should I do next" and doubles as the continuation of the tutorial checklist after onboarding ends. Daily goals can use the same component.
- Badge policy that follows from the sources: at most one or two red badges visible at once, tied to things that are actionable now (collectable output, a blocked factory); numbers only where the count matters; neutral dots for "new content". With a "More"/hub tab, badges inside it must bubble up to the More tab or the hidden sections become invisible twice over.
- Whether the header HUD or the home screen should carry the next-goal strip is a layout decision the sources do not settle; Hoober's rule favours putting the actionable "Go" control in the middle or lower part of the screen.

### Gaps
- No user research or A/B data was found on welcome-back screens, offline caps, or their effect on retention; the 8-hour and 50% figures are conventions from tutorials and vendor posts.
- No sourced benchmark was found for daily-goal or daily-login systems' retention impact, nor guidance from Deconstructor of Fun, Adjust or AppsFlyer on session design (not retrieved).
- No evidence specific to notification badges in games; Braze's piece is practitioner opinion about apps.
- Push-notification practice (timing, opt-in rates) was outside what I could cover.

---

## 5. Feedback and "juice": animation, haptics, tick-ups, toasts vs. modals, confirming destructive actions

### Takeaway
Keep UI feedback fast (about 100 ms for taps, 200-300 ms for screen-level changes, never beyond 500 ms), use haptics sparingly and in sync with visuals, and prefer immediate action plus undo over confirmation dialogs. Reserve modal confirmation for irreversible or expensive actions, with outcome-named buttons and no destructive default.

### Cited Findings

**Animation timing**
- **[Guideline]** NN/g: most UI animation should last 100-500 ms, and the shortest duration that is not jarring is best. Simple feedback such as a toggle: about 100 ms, which feels immediate. Substantial changes such as a modal entering: 200-300 ms. 400 ms is already "very slow"; 500 ms feels like a drag. Exits should be shorter than entrances (for example 300 ms in, 200-250 ms out). Ease-out for entering elements. — [Laubheimer, NN/g, "Executing UX Animations: Duration and Motion Characteristics", 9 Feb 2020](https://www.nngroup.com/articles/animation-duration/)
- **[Guideline]** Apple: every custom button needs a press state, otherwise it feels unresponsive; show an activity indicator inside the button when an action does not complete instantly. — [Apple HIG, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)

**Haptics**
- **[Guideline]** Android haptics principles: favour fewer, well-crafted effects because excess vibration numbs the hand and distracts; prefer "clear" and "rich" effects over "buzzy" ones; stay consistent with system haptics; weigh how frequent and how important an event is; design visual, audio and haptic feedback together. — [Android Developers, Haptics design principles](https://developer.android.com/develop/ui/views/haptics/haptics-principles)
- **[Guideline]** Material: use the platform's standard haptic constants where they exist, limit haptics to simple information, and respect the user's system settings. — [Material Design, Android haptics](https://m2.material.io/design/platform-guidance/android-haptics.html)

**Confirmation, undo, toasts, modals**
- **[Guideline]** NN/g: use confirmation dialogs only before actions with serious consequences (destroying work, spending significant money), especially irreversible ones; routine confirmations train people to click through without reading. Offer undo wherever possible. Name buttons after outcomes ("Delete file" / "Keep file"), not Yes/No. Do not make the destructive option the default. State the specific item and consequence. For rare, very dangerous actions require a deliberate extra step such as typing a word. Consider thresholds, confirming only unusually large transactions. — [Nielsen, NN/g, "Confirmation Dialogs Can Prevent User Errors — If Not Overused", 18 Feb 2018, reviewed 2026](https://www.nngroup.com/articles/confirmation-dialog/)
- **[Guideline]** Apple: never give the primary (visually prominent) role to a destructive button, even when it is the likely choice, because people tap prominent buttons without reading. — [Apple HIG, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- **[Guideline]** Hoober: place unrecoverable actions away from frequently used controls. — [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Opinion]** Practitioner consensus: for reversible actions commit immediately and show a toast with Undo for a few seconds; batch bulk actions into one toast; use a modal only when a decision is required. A caveat: for infrequent actions an undo toast is easy to miss and a dialog can be the safer choice. — [DEV Community, confirm vs. undo vs. soft delete](https://dev.to/137foundry/how-to-choose-between-confirmation-dialogs-undo-windows-and-soft-delete-patterns-1opj); [UX Planet](https://uxplanet.org/confirmation-dialogs-how-to-design-dialogues-without-irritation-7b4cf2599956)

### Inferences
- Applied to a trading sim: ordinary buy/sell/produce should execute on one tap with a toast and a number tick-up, no dialog. Confirmation (or a threshold rule in NN/g's sense) fits selling or demolishing a building or machine, spending a large share of current cash, leaving a cooperative, and resetting a save. Where a real undo is possible (for example cancelling a just-placed order within a few seconds), it beats a dialog.
- Number tick-ups for money and stock should stay inside the NN/g window, roughly 300-500 ms, so they finish before the player's next tap; long counting animations on every transaction would violate the "shortest that is not jarring" rule in a game with frequent small trades.
- Toasts should appear where they do not cover the bottom bar or the control just pressed; with bottom navigation, a position just above the bar or under the HUD works. No source was retrieved on toast placement or duration.
- Haptics budget consistent with Android's guidance: a light tick on a completed trade at most, a stronger pattern for rare events (level-up, unlock, large sale), none for scrolling or tab switches, and a settings toggle. In Capacitor this goes through the Haptics plugin; on the web fallback, the Vibration API is unavailable on iOS Safari (stated from general knowledge, not a fetched source).
- Honour `prefers-reduced-motion` for the larger celebratory animations (general accessibility practice, no source fetched).

### Gaps
- No empirical study was found that measures the effect of "juice" (particles, tick-ups, haptics) on retention or satisfaction in mobile sims; the timing rules above are general UI guidance, and game-feel literature (for example Swink's "Game Feel", or the "Juice it or lose it" talk) was not retrieved.
- No NN/g article specifically comparing toasts and modals on mobile was found; that guidance rests on practitioner posts.
- Material 3 motion duration tokens and Apple's haptics page ("Playing haptics") were not retrieved.

---

## 6. Common UX mistakes in management/sim games on mobile

### Takeaway
The best-supported mistakes are structural rather than cosmetic: hiding navigation, undersized and crowded targets, front-loaded explanation, over-confirmation, and indiscriminate badges. Game-specific sources on sim/management UX were thin and mostly opinion, so this list is largely derived from the general evidence in sections 1-5.

### Cited Findings
- **[Evidence]** Hiding navigation lowers discoverability by more than 20% and slows mobile tasks by 15%. — [NN/g 2016](https://www.nngroup.com/articles/hamburger-menus/)
- **[Guideline]** Overflowing the tab bar makes hidden sections harder to reach and notice; hiding or disabling tabs unpredictably makes the interface feel unstable. — [Apple HIG, Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- **[Evidence]** Targets under 8 mm produce error rates above 40%; small targets while walking produce up to 23% errors. — Henze et al. and Schildbach & Rukzio, cited in [Hoober 2017](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[Evidence]** Read-first tutorials did not improve success or speed and made tasks feel harder. — [NN/g 2020](https://www.nngroup.com/articles/mobile-tutorials/)
- **[Guideline]** Confirming routine actions teaches players to dismiss dialogs unread, so the dialog fails when it matters. — [NN/g 2018](https://www.nngroup.com/articles/confirmation-dialog/)
- **[Guideline]** Too many prominent buttons in one view raises cognitive load; keep to one or two. — [Apple HIG, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- **[Opinion]** Information overload is described as the most common HUD mistake; clutter comes from weak prioritisation and inconsistent styling more than from element count, and an all-red HUD destroys the meaning of red. — [Abratabia, game UI mistakes](https://www.abratabia.com/game-ui-design/game-ui-mistakes.php); [Bootcamp/UX Collective, 7 HUD mistakes](https://bootcamp.uxdesign.cc/7-obvious-beginner-mistakes-with-your-games-hud-from-a-ui-ux-art-director-d852e255184a)
- **[Opinion]** Badges on everything cause red dot blindness. — [Braze](https://www.braze.com/resources/articles/beware-red-dot-badging)
- **[Opinion]** Forced waits or extra steps on return screens are read by players as friction. — [war.app forum](https://war.app/Forum/581561-purpose-loading-bar-welcome-back-popup)
- **[Guideline]** Buttons without a press state or progress indication make players doubt their input registered. — [Apple HIG, Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)

### Inferences
Checklist against the current Tezgâh layout (derived, not directly sourced):
- Nine tabs in a scrolling top row: combines hidden navigation with the least reachable, least accurate screen region. Highest-priority fix.
- Long scrolling card lists: risk of the primary action per card being small or inconsistent in position; of the last card being stuck against the bottom edge (add bottom padding per Hoober); and of losing scroll position when switching tabs (Apple notes tab bars should preserve each section's state).
- Desktop-style density: tables of prices and stock shrunk to fit a phone push targets and text below usable size. Prefer one card per item with two or three key numbers and a detail view.
- Every card with a coloured primary button: violates the one-or-two prominent buttons rule; reserve the accent style for the single recommended action on screen.
- Same visual weight for "sell 1 unit" and "sell the factory": irreversible actions need distance, a different style and a confirmation.
- A tutorial that ends and leaves no guidance: the next-goal component from section 4 should take over.
- No summary on return: the player must visit several tabs to learn what happened while away.
- Header HUD growing over time: each new currency or meter reduces list space on a portrait phone; cap it and move secondary stats to a tap-through.

### Gaps
- No systematic study, GDC postmortem or Deconstructor of Fun analysis of UX failures in mobile tycoon/management games was retrieved; a claim that players give "80% of attention to gameplay and 20% to the HUD" appears unsourced and was excluded.
- Google Play's game quality guidelines / Play Academy material and Android vitals thresholds were not retrieved.
- Nothing was found on localisation-specific layout risks (Turkish strings are often longer than English ones, which matters for single-word tab labels); this needs checking against the actual label set.
