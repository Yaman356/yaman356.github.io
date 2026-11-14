# Presenting dense economic data on small phone screens (for Tezgâh), as of 2025-2026

Researcher notes, compiled 2026-11-14. Conventions used below:

- **Cited Findings** = what a source says. "(fetched)" means I read the page itself; "(search snippet)" means I only saw a search-engine excerpt or a secondary summary and the wording is not verified against the original.
- **Inferences** = my own design rules for Tezgâh derived from the findings. These are opinion, not evidence.
- Several suggested sources could not be read (Material Design 3, Apple HIG, SAP Fiori, Markswebb, Stephen Few's PDF returned empty pages, 403/404 or binary). Nothing from them is asserted beyond search snippets; see the Gaps of each section.
- Most of the usable evidence is qualitative guidance from NN/g (2015-2024). I found almost no quantitative studies (sample sizes, effect sizes) for any of these questions.

## 1. Tables on mobile (card lists vs. tables, column priority, horizontal scroll, sticky headers, numerals, alignment)

### Takeaway
Numeric tables survive on phones far better than wordy ones: NN/g says only about 2 wordy columns fit legibly, but shows an 11-column numeric table without horizontal scroll thanks to icons and abbreviated headings. If a table is longer than one screen, lock the header; if it scrolls sideways, lock the first column and show a cut-off column or arrow as a scroll cue; numbers should be right-aligned in tabular figures.

### Cited Findings
- Content must be "legible without requiring the user to zoom in"; for wordy comparison entries "only 2 columns may fit legibly on a narrow mobile screen" (Amy Schade, NN/g, 17 Sep 2017, fetched) — [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)
- Number-heavy tables fit more columns: a National Rugby League standings table showed 11 columns with no horizontal scrolling by using team logos and abbreviated headings; the article warns abbreviations can confuse unfamiliar users (fetched) — [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)
- Lock column headers for any table longer than one screen; without them "it is easy to lose the context of what the table is displaying". When horizontal scroll is needed, also lock the leftmost (row-label) column (fetched) — [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)
- Horizontal scrolling is "somewhat acceptable for large tables on mobile screens" but must be signalled: "arrows or cut-off elements convey this information best"; dots are easier to miss; arrows should sit inside the table body, not above it (fetched) — [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)
- Forcing landscape orientation is a last resort: it gains columns, loses rows and annoys users (fetched) — [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)
- Let users reduce the data: filter before viewing (single-item lookup), choose which attributes are shown (comparison), group attributes in accordions, or toggle "all / similarities / differences" as Samsung does (fetched) — [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)
- The NN/g article does not discuss card layouts as a table alternative at all (fetched; absence noted by me) — [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)
- Tabular numerals "are a must when displaying numbers in tables"; proportional numerals suit running text (search snippet) — [EU Data Visualisation Guide: fonts for numbers](https://data.europa.eu/apps/data-visualisation-guide/fonts-for-numbers)
- CSS `font-variant-numeric: tabular-nums` keeps the design font while equalising digit widths, works only if the font ships tabular figures, and also prevents layout shift when live numbers change; a monospace font aligns digits too but wastes width on non-digits (search snippet, developer blog) — [dev.to: tabular numbers in CSS](https://dev.to/alanwest/tabular-numbers-in-css-font-variant-numeric-vs-monospace-hacks-25cn)
- Right-aligning numbers lets users compare values of different lengths (search snippet, course material, low authority) — [Uxcel: numbers alignment](https://app.uxcel.com/courses/ui-components-best-practices/tables-best-practices-356/numbers-alignment-1984)
- Secondary guides (not NN/g) list five mobile patterns: horizontal scroll, stacked rows, cards, priority columns, expandable rows; one suggests scroll containers for dense comparison data and stacked cards for records read one at a time (search snippet, vendor blog) — [Ninja Tables](https://ninjatables.com/?p=33242)

### Inferences
- (Opinion) Market list of 12 products: keep it a real table-like list, not free-form cards, because the task is comparison across rows. One row per product, about 3-4 numeric columns: name+icon (left, locked) | price (right-aligned, tabular) | change % with arrow | sparkline. 12 rows of roughly 56-64 px fit in about one and a half screens, so a sticky header is enough; no horizontal scroll needed.
- (Opinion) Listings with delivered price are read "one at a time, then pick" → a sorted list with one emphasised number (delivered price) and secondary line (unit price + freight, seller, quantity). Sort by delivered price by default so position itself encodes the ranking.
- (Opinion) Leaderboard: rank | name | one metric. Lock the player's own row to the bottom edge when it is off-screen (same logic as NN/g's locked reference column).
- (Opinion) Daily income/expense report: two-column ledger (label left, amount right-aligned, tabular figures, same abbreviation unit in the whole column), subtotals bold, net result as the first line, not the last.
- (Opinion) Use `tabular-nums` everywhere a number can change in place (cash balance, countdowns, prices) to avoid jitter.

### Gaps
- Material Design 3 data-table guidance could not be retrieved (M3 has no dedicated mobile data-table page that I could load; the URL I tried returned 404). No M3 numbers are cited.
- Baymard and Smashing Magazine material on mobile tables was not reached within the call budget.
- No quantitative evidence found comparing card lists vs. tables on task time or error rate; the "cards for single-record reading, tables for comparison" rule rests on practitioner consensus only.
- The claim that dynamic comparison tables should accept only 3-4 items (attributed to a 2024 NN/g article by Moran and Dykes) appeared only in a secondary summary and is unverified.

## 2. Small charts: sparklines, minimum sizes, up/down colour and colour-blind safety

### Takeaway
A sparkline is a word-sized trend cue, not a chart to read values from; the only concrete size numbers I found come from one enterprise design system (minimum about 64 x 18 px). Never encode up/down with red/green alone: add an arrow or sign, and make the two colours differ in lightness.

### Cited Findings
- Tufte defines sparklines as small, intense, word-sized graphics that can sit wherever a word or number can; the definition is by scale (text-line height), not a pixel count (search snippet of Tufte's own notebook) — [Edward Tufte: Sparkline theory and practice](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/)
- SAP Fiori's line micro chart has a minimum of 64 px width and 18 px height and a maximum of 320 x 94 px; at the smallest sizes data points/labels are hidden when there is no room (search snippet; page itself returned 403) — [SAP Fiori line micro chart](https://www.sap.com/design-system/fiori-design-web/v1-136/ui-elements/line-micro-chart/usage)
- Length and 2D position are the most accurately judged encodings; area, angle and colour show that a difference exists but not its size; colour has no inherent order and should not be the primary magnitude encoding (Page Laubheimer, NN/g, 18 Jun 2017, fetched) — [NN/g Dashboards: preattentive](https://www.nngroup.com/articles/dashboards-preattentive/)
- Line charts for trends over time, sorted bar charts for comparison, bullet charts instead of gauges for value-vs-target; avoid pie/donut (except very large disparities), gauges, treemaps and any 3D (fetched) — [NN/g Dashboards: preattentive](https://www.nngroup.com/articles/dashboards-preattentive/)
- Do not rely on colour alone, because many people have colour-vision deficiencies; use colour as a secondary cue that reinforces shape, border or proximity (fetched) — [NN/g Dashboards: preattentive](https://www.nngroup.com/articles/dashboards-preattentive/)
- Do not combine green with red or orange, or green with blue of the same lightness; "Blue is the safest hue"; pair blue with orange or red if two hues are needed (Lisa Charlotte Muth, Datawrapper, 23 Jun 2020, fetched) — [Datawrapper: colorblindness part 2](https://www.datawrapper.de/blog/colorblindness-part2)
- Red and green can both read as olive/orange shades to red-green-blind readers, so what separates them is lightness; palettes should still work in greyscale ("Get it right in black & white") (fetched) — [Datawrapper: colorblindness part 2](https://www.datawrapper.de/blog/colorblindness-part2)
- Add symbols to colour-coded tables (e.g. checkmarks), label lines directly instead of using a colour key, keep to about 3-4 colours per chart, vary line width or dashes when similar lines overlap (fetched) — [Datawrapper: colorblindness part 2](https://www.datawrapper.de/blog/colorblindness-part2)
- Test with simulators (Coblis, Color Oracle, Sim Daltonism, browser dev tools) but also with colour-blind people, since simulators are approximations (fetched) — [Datawrapper: colorblindness part 2](https://www.datawrapper.de/blog/colorblindness-part2)
- A practical option when red/green is culturally expected: keep red and green but double-encode with up/down arrows or plus/minus signs (Andy Kirk, Aug 2019, search snippet) — [Visualising Data: five ways to design for red-green colour-blindness](https://visualisingdata.com/2019/08/five-ways-to-design-for-red-green-colour-blindness/)
- Tableau's guidance makes the same point: with red and green, add icons, directional arrows, labels or annotations (search snippet) — [Tableau blog](https://origin-tableau-www.tableau.com/en-gb/blog/examining-data-viz-rules-dont-use-red-green-together)

### Inferences
- (Opinion) Sparkline size for the market row: roughly 64-80 px wide, 20-28 px high, about 1.5 px stroke, no axes, no gridlines, no labels; optionally a dot on the last point. Below about 64 x 18 px drop it and show only arrow + percentage.
- (Opinion) Use a sparkline only where the shape of the trend adds something a "▲ %4,2" does not (market prices, FX/gold/stocks, cash balance over the last days). Do not put sparklines on plot cards, contracts, loans or tax lines.
- (Opinion) All 12 product sparklines must share the same time window; state it once in the header ("son 7 gün"), not per row. Each sparkline is self-scaled, so it shows shape only; relative magnitude must come from the % figure next to it.
- (Opinion) Up/down encoding with three redundant channels: sign (+/−), shape (▲/▼, and "–" or "●" for unchanged) and colour. Choose a green that is clearly lighter or darker than the red, so the pair survives greyscale. Offer a settings toggle for a blue/orange pair. Note that a price rise is not "good" for a buyer: reserve green/red for direction of price and use a separate neutral/semantic colour for profit vs. loss in the player's own report, or always use it for the player's P&L only and keep market direction to arrows. This is a design choice I could not find evidence on.
- (Opinion) Larger charts (product detail, investment detail) belong on a detail page or sheet: one line, a few period chips (1G / 1H / 1A), direct label of last value, tap-and-hold to read a point.

### Gaps
- No source gives a researched minimum sparkline size for phones; the SAP numbers are one vendor's component limits, taken from a search snippet.
- Apple HIG "Charting data" and Material Design 3 data-visualisation pages returned no readable content; nothing from them is cited.
- No prevalence figure for colour-vision deficiency was captured from a fetched source (the commonly quoted "about 8% of men" is not sourced here).
- Not researched: regional convention differences for up/down colours (e.g. East Asian markets use red for up); irrelevant for a Turkish audience as far as I know, but unverified.

## 3. How mobile trading/finance apps lay out watchlists, order entry and portfolio screens

### Takeaway
Evidence here is thin: I could not retrieve professional teardowns (Built for Mars, Mobbin, PageFlows, Markswebb), so only a few observations are sourced. The sourced lessons are: explain choices at the moment of choice, avoid extra taps and full-screen hops inside order entry, and put the live price on the action button.

### Cited Findings
- Markswebb's investment-app research credits Revolut with explaining order types at the moment of choice, with a one-line description per order type inside the trade flow and deeper detail on demand (search snippet; page returned 403) — [Markswebb: reducing uncertainty in investment apps](https://markswebb.com/insights/reducing-uncertainty-in-investment-apps/)
- Trading 212 users complained that after a redesign, changing the order type opens a separate view and choosing Limit opens another full-screen page just to enter the price (user forum post, anecdotal, search snippet) — [Trading 212 community](https://community.trading212.com/t/new-order-layout-is-messy/93490)
- Robinhood iOS: the portfolio screen is led by an interactive performance graph with preset timeframes (1 day, 1 week, 1 month ...); the Trade button took the stock's colour (green when up, red when down); Buy/Sell/Options were hidden behind a single Trade button, which the critic says adds a step and uncertainty; proposed fix is separate Buy and Sell buttons each showing the live ask/bid price (student design critique, Jeffrey Yang, 13 Feb 2025, fetched; opinion, not research) — [IXD@Pratt: Robinhood critique](https://ixd.prattsi.org/2025/02/design-critique-robinhood-ios-app/)
- The same critique faults Robinhood for giving no at-a-glance view of asset allocation, forcing users to piece diversification together manually (fetched; opinion) — [IXD@Pratt: Robinhood critique](https://ixd.prattsi.org/2025/02/design-critique-robinhood-ios-app/)
- Bottom sheets suit short, contextual interactions where the user needs to keep seeing the background (relevant to order tickets opened over a price list); they should not replace full page-to-page flows (Page Laubheimer, NN/g, 11 Jun 2023, fetched) — [NN/g Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)

### Inferences
- (Opinion, based on my general familiarity with these apps, not on a fetched source) The common watchlist row is: left = icon + short name + secondary line (ticker/holding); middle = sparkline; right = price with a coloured change pill. Tezgâh's market row can copy this directly.
- (Opinion) Buy/sell ticket as a single modal bottom sheet over the market list: quantity stepper with quick chips (¼, ½, Max), live total, and the fees/freight broken out so the "delivered price" is visible before confirming. Order-type or seller choice should be inline in the same sheet, never a second full-screen hop (Trading 212 complaint).
- (Opinion) Put the price on the button ("Satın al · ₺12.450") so the commit action restates the cost.
- (Opinion) Investment screen (FX, gold, stocks): top = total portfolio value + today's change; below = an allocation bar (single stacked horizontal bar, not a pie); then three sections with watchlist-style rows.
- (Opinion) One-line explanations at the point of choice for loan types, contract terms and tax items, with a "?" drill-down, following the Revolut pattern.

### Gaps
- No verified teardown of Revolut, Binance, Midas, Trading 212 or any Turkish bank app (Garanti BBVA, İşbank İşCep, Akbank, Ziraat, Midas) was obtained. Built for Mars, Mobbin and PageFlows were not reached. Any statement about their exact layouts would be from memory and is therefore omitted.
- No data on which watchlist density or row height these apps use.
- A report writer needing this section should treat it as the weakest of the notes; a screenshot-based review (Mobbin) would close the gap.

## 4. Number formatting and abbreviation of large numbers; Turkish conventions

### Takeaway
Turkish uses a decimal comma and a dot for thousands; Unicode CLDR's compact-short suffixes for Turkish are "B", "Mn", "Mr", "Tn" (e.g. "1,5 Mr"), which differ from the "mn/mlr" used in the brief. Where the ₺ sign goes is disputed between sources: a 2012 TDK meeting recommended left of the number with no space (as CLDR does), while a TDK letter quoted on a forum says the symbol should follow the number.

### Cited Findings
- CLDR 48 Turkish verification chart: 1.000 → "1 B" (short) / "1 bin" (long); 1.000.000 → "1 Mn" / "1 milyon"; 1.000.000.000 → "1 Mr" / "1 milyar"; 10^12 → "1 Tn" / "1 trilyon"; a space separates number and suffix (fetched) — [CLDR 48 tr numbers chart](https://unicode.org/cldr/charts/48/verify/numbers/tr.html)
- Same chart: decimal separator is a comma ("1,1 Mn", "1,5 Mr"), grouping separator is a dot ("1.000.000"); in compact currency the symbol precedes the number with no space ("€1 Mn") and the minus sign precedes the symbol ("-€123 B"). The chart uses € as its sample currency, not TRY (fetched) — [CLDR 48 tr numbers chart](https://unicode.org/cldr/charts/48/verify/numbers/tr.html)
- CLDR short patterns for Turkish are "0 B", "00 B", "000 B" for thousands and the same shape with Mn / Mr / Tn for higher tiers (search snippet) — [CLDR 48 delta chart, tr](https://www.unicode.org/cldr/charts/48/delta/tr.html)
- Turkish writing rules as taught from TDK's guide: numbers of four or more digits are grouped in threes from the right with dots (4.567; 326.197; 49.750.812); fractions are separated with a comma; in large numbers the words bin, milyon, milyar, trilyon may be written out ("1 milyar 500 milyon") (search snippet of secondary education sites, not TDK's own page) — [egitimsistem.com: sayılar nasıl yazılır](https://www.egitimsistem.com/sayilar-nasil-yazilir-77359h.htm)
- A 2012 meeting held at TDK on the use of the TL sign recommended that in numeric use the symbol be written to the left of the number and adjacent to it, with "TL" or "Türk lirası" used in running text (news report, search snippet) — [haberler.com](https://www.haberler.com/turk-lirasi-nin-simgesinin-nasil-kullanilacagi-3779687-haberi/)
- Conflicting: a TDK reply reproduced by a forum user says the symbol should be used after the digits because Turkish does not place currency symbols before numbers, and notes the Central Bank's practice differs (forum post, unverified, search snippet) — [Ekşi Sözlük entry](https://eksisozluk.com/entry/27728823)
- TCMB's FAQ prefers "Türk lirası" or "TL" in text and official correspondence and recommends the symbol in charts and tables (search snippet); the TCMB TL-symbol page I fetched contains no rule on position or spacing — [TCMB TL Simgesi](https://tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Banka+Hakkinda/TL+Simgesi)

### Inferences
- (Opinion) Pick one convention and apply it everywhere. Recommended default: symbol first, no space, CLDR-style: "₺2,5 Mn", "₺1,2 Mr", "₺850 B". This matches `Intl.NumberFormat('tr-TR', {style:'currency', currency:'TRY', notation:'compact'})` output shape, so it can be generated rather than hand-built (verify the actual runtime output; I did not run it).
- (Opinion) The brief's "mn / mlr" lowercase forms are common in Turkish financial press as far as I know, but I found no source for them; "Mr" for milyar may be less familiar to players than "mlr" or "milyar". Worth a five-person hallway test; if "Mr" is misread, use "mlr" or the long form "1,2 milyar" where width allows.
- (Opinion) "B" for bin is the riskiest suffix: it reads as "billion" to anyone used to English apps. For thousands, consider showing the full number with dot grouping (₺850.000 is only 8 characters) and abbreviating only from one million up.
- (Opinion) Precision rules: max 3 significant digits in abbreviated form (₺2,5 Mn; ₺12,4 Mn; ₺124 Mn); never abbreviate in places where the player commits money (order ticket, loan confirmation, tax due) - show the full figure "₺2.512.400"; tapping an abbreviated figure reveals the exact one.
- (Opinion) Within one table column use one unit for all rows (all Mn or all full numbers), otherwise right alignment stops meaning anything; negative numbers with a real minus sign "−" before the symbol (−₺1,2 Mn), in line with the CLDR pattern.
- (Opinion) Percentages in Turkish put the sign before the number ("%4,2"); I did not capture a source for this in this session, so it is listed here rather than as a finding.

### Gaps
- No primary TDK page (tdk.gov.tr) was fetched; TDK rules above come from secondary sites and a news report.
- No authoritative source found for the abbreviations "mn" and "mlr"; no Turkish banking or BDDK/TCMB style guide on abbreviating large amounts was found.
- The ₺ position conflict (before vs. after the number) is unresolved; TCMB's own FAQ page on usage was not fetched.
- CLDR chart checked is version 48; I did not confirm whether version 49 changed any Turkish compact pattern (a v49 delta chart for tr exists).
- Percent-sign placement in Turkish is unsourced here.

## 5. Progressive disclosure for complex cards: summaries, accordions, bottom sheets, detail pages

### Takeaway
NN/g's guidance: accordions are good for giving the "big picture" of a long mobile page if they start collapsed and their content is short; bottom sheets are for short, contextual, transient tasks and must never be stacked; anything long or central to the main path deserves its own page. I found no quantitative evidence comparing long scrolling pages with drill-down.

### Cited Findings
- Accordions on mobile let users "get the big picture before focusing on details" and double as section headings, taking less room than jump links (Raluca Budiu, NN/g, 31 May 2015, fetched) — [NN/g Accordions on Mobile](https://www.nngroup.com/articles/mobile-accordions/)
- Failure modes: expanded content that jumps to the top of the screen makes users think a new page loaded and press Back; very long expanded sections force long scrolls to close or reach the next section; unfamiliar "Collapse" controls go unnoticed (no tested user recognised Zappos's); an accordion open by default hides the page structure (fetched) — [NN/g Accordions on Mobile](https://www.nngroup.com/articles/mobile-accordions/)
- Guidelines: keep accordions collapsed by default; do not scroll the page on expand (or make Back collapse the section); keep the header of an open section sticky so it can be closed from anywhere inside it (fetched) — [NN/g Accordions on Mobile](https://www.nngroup.com/articles/mobile-accordions/)
- The accordion article reports illustrative examples and one usability-test observation; it gives no sample sizes or quantitative results (fetched; caveat is mine) — [NN/g Accordions on Mobile](https://www.nngroup.com/articles/mobile-accordions/)
- Hidden content gets less attention than visible content even when accordions are used well (attributed to NN/g by a secondary site, unverified, search snippet) — [parallelhq.com](https://www.parallelhq.com/blog/what-accordion-website)
- "A modal bottom sheet blocks any interactions with the background content while it is visible"; nonmodal sheets let users keep working with the background; expandable sheets start nonmodal and become modal when expanded (Page Laubheimer, NN/g, 11 Jun 2023, fetched) — [NN/g Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- Use sheets for extra information or contextual controls, for interruptions or forks, and for short interactions; do not use them for content users always need, for long or complex content, or as a replacement for a page (example given: do not show a product-detail page in a sheet) (fetched) — [NN/g Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- Do not stack sheets; support the system Back button/gesture to dismiss; always provide a visible Close (X) button because users often miss the grab handle and swipes can conflict with system gestures (fetched) — [NN/g Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- The claim that bottom sheets improve thumb reachability is "largely incorrect" according to the same article (fetched) — [NN/g Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- UK government design guidance advises against nesting accordions (secondary, search snippet) — [cieden.com accordion guide](https://cieden.com/book/atoms/accordion/accordion-ui-design)

### Inferences
- (Opinion) Three-level rule for Tezgâh: (1) collapsed card row = identity + one status chip + one or two key numbers; (2) one inline expansion or one bottom sheet = the 4-8 values and 1-3 actions needed for the common task; (3) a full detail page = history, charts, full tables, settings. Never go deeper than one sheet over one page.
- (Opinion) Plot/building card collapsed: building name and level | status chip (Üretiyor / Durdu: hammadde yok / Depo dolu) | output per day | stock of the output product as a small bar. Expanded: the production lines as rows (input → output, rate, blocker), inventory, and the two most frequent actions.
- (Opinion) If a player owns many plots, do not let expanded cards make the page many screens long (the Wikipedia failure in NN/g's article): allow one card open at a time, keep its header sticky, and move anything longer than about one screen to the detail page.
- (Opinion) Use bottom sheets for buy/sell tickets, "assign product to line", loan take/repay and confirmations; use full pages for product detail with chart, building detail, the daily report and the company screen.
- (Opinion) Company screen (contracts, loans, tax): three collapsed accordion sections each showing its headline in the header itself ("Krediler · 2 aktif · ₺1,2 Mn borç · sonraki taksit 3 gün"), so the collapsed page already works as a summary.

### Gaps
- No controlled evidence found on long scrolling pages vs. drill-down pages for mobile (the brief asked for it). NN/g material is qualitative.
- Material Design 3 bottom-sheet measurements could not be retrieved (page returned only its title).
- The NN/g accordion article is from 2015; I did not find a newer NN/g mobile-specific update.

## 6. Visualising production chains and "what is blocking production"; status chips, empty states, alerts

### Takeaway
I found no source specifically on production-chain visualisation in mobile games; what is sourced is general status communication: use passive, contextual indicators for state, never leave an empty container unexplained, always attach the fix to the problem, and do not use toasts for errors.

### Cited Findings
- Indicators are contextual, conditional and passive visual cues (icons, typographic change, size, animation) that make an element stand out; validations are errors about the user's own input and must say how to fix the problem; notifications are about system events and can be passive (badge, nonmodal popover) or action-required (modal) (Kim Flaherty, NN/g, 17 Jan 2024, fetched) — [NN/g Indicators, Validations, Notifications](https://www.nngroup.com/articles/indicators-validations-notifications/)
- Choose by information type, urgency and whether the user must act; passive notifications are easy to miss, so they are risky for information the user needs to understand the system; do not use toasts for errors; notifications unrelated to the user's current goal are ignored or annoying (fetched) — [NN/g Indicators, Validations, Notifications](https://www.nngroup.com/articles/indicators-validations-notifications/)
- Empty states, guideline 1: never leave a container blank, because users cannot tell loading from failure from "no data"; do not show "no records" while still loading (Kate Kaplan, NN/g, 19 Sep 2021, fetched) — [NN/g Empty States](https://www.nngroup.com/articles/empty-state-interface-design/)
- Guideline 2: use the empty state to teach what the feature is, in context, instead of long first-use tutorials (example: "Star your favorites to list them here") (fetched) — [NN/g Empty States](https://www.nngroup.com/articles/empty-state-interface-design/)
- Guideline 3: give a direct pathway (a button that starts the task), not just a description; a message that says what to do without saying how is criticised (fetched) — [NN/g Empty States](https://www.nngroup.com/articles/empty-state-interface-design/)
- Group related items by shape, border and proximity, with colour as a reinforcing secondary cue (Page Laubheimer, NN/g, 2017, fetched) — [NN/g Dashboards: preattentive](https://www.nngroup.com/articles/dashboards-preattentive/)
- Add symbols (e.g. checkmarks) to colour-coded statuses so they survive colour blindness (Datawrapper, 2020, fetched) — [Datawrapper: colorblindness part 2](https://www.datawrapper.de/blog/colorblindness-part2)

### Inferences
- (Opinion) Show a production line as one horizontal strip that fits a phone width: [input icon ×qty] [input icon ×qty] → [building/machine] → [output icon ×qty/day]. Chains longer than about 3 stages should not be drawn as a graph on the phone; show one stage per row and let the row link to the upstream/downstream building.
- (Opinion) Blocked state is shown on the exact element that blocks: the missing input icon gets a warning badge and "0 / 40", the arrow after it is greyed/dashed, and the card's status chip names the cause in words. Each blocker chip is tappable and carries the fix: "Hammadde yok: Pamuk → Pazardan al", "Depo dolu → Sat / Depoyu büyüt", "Nakit yetersiz", "İşçi yok", "Makine yok".
- (Opinion) Status chip vocabulary: fixed, small set (about 4-5), each with icon + word + colour, never colour alone: Üretiyor (✓), Bekliyor (clock), Durdu (!), Boş (–). Keep chip position constant across cards so a column of chips can be scanned.
- (Opinion) Sort blocked buildings to the top of the list and show a count on the home screen ("3 tesis durdu"); this is a passive, contextual indicator in NN/g's terms and avoids push-style interruption. Use a modal only for events needing a decision (loan default, contract about to fail).
- (Opinion) Empty states with one sentence and one button: no plots ("Henüz arsan yok → Arsa al"), no listings for a product, no contracts, no loans, empty report on day one.

### Gaps
- No source found on production-chain or supply-chain visualisation for mobile games (e.g. teardowns of factory/tycoon games); this section's layout rules are entirely my inference.
- Material Design chip specifications were not retrieved.
- No evidence on how many distinct status states players reliably distinguish.

## 7. Dashboard guidance for the game's home/overview screen

### Takeaway
The classic rule (Few; NN/g) is that a dashboard is a single-screen, at-a-glance view focused on one monitoring task, built from position/length encodings (bars, lines, bullet charts) rather than gauges, pies or 3D. One practitioner source disputes that "one page" by itself guarantees glanceability.

### Cited Findings
- Stephen Few defines a dashboard as a "single-screen display of the most important information people need to do a job, presented in a way that allows them to monitor what's going on in an instant" (quoted in secondary sources; search snippet) — [UXmatters review of Information Dashboard Design](https://www.uxmatters.com/mt/archives/2007/04/book-review-information-dashboard-design.php)
- The first of Few's 13 common pitfalls is exceeding the boundaries of a single screen (scrolling or switching screens taxes short-term memory); others named in summaries include starting with too much complexity and introducing meaningless variety of chart types (search snippet of a secondary summary) — [The Data School: 13 dashboard design mistakes](https://www.thedataschool.co.uk/anh-vu/are-you-making-these-13-dashboard-design-mistakes/)
- Counter-view: a one-page dashboard does not by itself deliver an "at a glance" view; cramming everything on one page can be self-deceiving (Juice Analytics, search snippet, opinion piece) — [Juice Analytics](https://www.juiceanalytics.com/writing/breaking-free-one-page-dashboard-rule)
- A dashboard is a single-page, at-a-glance view meant for quick action with little interaction, not open-ended exploration; each should be "focused on a single task: communicating critical information"; operational dashboards (time-sensitive, changing data) differ from analytical ones (Page Laubheimer, NN/g, 18 Jun 2017, fetched) — [NN/g Dashboards: preattentive](https://www.nngroup.com/articles/dashboards-preattentive/)
- Prefer length and position encodings: sorted bars, line charts, bullet charts for value vs. target; avoid gauges and radial charts (space-hungry, angle-based), pies/donuts, treemaps and 3D (fetched) — [NN/g Dashboards: preattentive](https://www.nngroup.com/articles/dashboards-preattentive/)
- Keep to about 3-4 colours and colour only the most important values, muting the rest (Datawrapper, 2020, fetched) — [Datawrapper: colorblindness part 2](https://www.datawrapper.de/blog/colorblindness-part2)

### Inferences
- (Opinion) The home screen is an operational dashboard: answer "what changed since I last looked, and what needs me now?" in the first screenful, in this order: (1) cash and net worth with change since last visit/day; (2) "needs attention" list (stopped buildings, expiring contracts, loan instalment or tax due) with at most about 3 rows and a "show all"; (3) yesterday's profit/loss as one number plus a small 7-day bar strip; (4) shortcuts to market / plots / company.
- (Opinion) Treat Few's single-screen rule as "the first viewport must stand alone", not "no scrolling": everything below the fold on a phone is secondary by definition.
- (Opinion) No gauges or donuts for capacity or loan usage; use a thin horizontal bar with a target tick (bullet-chart idea) and the numbers written next to it ("₺1,2 Mn / ₺2 Mn").
- (Opinion) One accent colour for "needs action", neutral greys for everything else, direction colours only on change figures.

### Gaps
- Few's original "Common Pitfalls in Dashboard Design" PDF could not be parsed, so the full list of 13 pitfalls is not reproduced; only what secondary summaries state is cited.
- Material Design 3 and Apple HIG chart/dashboard guidance could not be retrieved.
- All dashboard literature found addresses business dashboards on desktop; I found nothing evidence-based on game overview screens or phone-sized dashboards specifically.
