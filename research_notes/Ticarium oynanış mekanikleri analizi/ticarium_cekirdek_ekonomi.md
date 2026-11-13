# Ticarium: Business Tycoon — core economy / supply-chain mechanics

> **Method note (read first).** In this session every direct page fetch failed with DNS errors (yuyutogames.helpshift.com, faq.ticarium.com, www.ticarium.com, alakasiz.com, saygec.com, forum.donanimhaber.com, yandex.com.tr, korsanfan.com, androidout.com, gameloop.com, apkpure.com, apkgk.com, cafebazaar.ir, soft112.com). **Everything below comes from search-engine result snippets/summaries of those pages, not from reading the full pages.** Snippets are often truncated, so numbers are quoted only where the snippet showed them; where a snippet was garbled or cut off this is said explicitly. Nothing was verified in the game client. Dates of help-centre articles are mostly unknown; the old FAQ (faq.ticarium.com) and the Helpshift help centre carry largely the same articles, several of which predate the 2025 "v2.5.0" overhaul.
>
> Reliability tiers used below: **[OFFICIAL]** = developer help centre / FAQ / store listing / patch notes; **[COMMUNITY]** = forum posts, tactic blogs, Q&A aggregators (often 2022-2024); **[REVIEW]** = player store review.

## 1. How does a player start (company name, HQ city, grant, free greengrocer) and what does the first hour look like?

### Takeaway
The player starts with a small greengrocer (manav) and a non-repayable start grant, then expands through shop licences; the grant amount is disputed between sources ($75,000 vs $10,000) and no source seen describes the current (2026) onboarding step by step. Company-name / HQ-city selection could not be confirmed from any source.

### Cited Findings
- [COMMUNITY, dated ~2022] A forum intro post that reproduces the official promo text says the game gives a non-repayable **$75,000 grant** to open the first business, and that the game starts with a greengrocer; shop count is then increased by buying the Shop Business Licence — [korsanfan.com](https://www.korsanfan.com/konu/ticarium.10767/); same $75,000 figure repeated in [DonanımHaber thread](https://forum.donanimhaber.com/online-mobil-ticaret-oyunu-ticaret-simulator--152272506)
- [COMMUNITY] A Yandex YaCevap answer says the first trade is done with a **$10,000 grant** — [YaCevap](https://yandex.com.tr/yacevap/c/oyun/q/ticarium-oyunu-nasil-oynanir-3834587191); **contradicts** the $75,000 figure above. Neither is confirmed for the 2026 build.
- [COMMUNITY] A YouTube progression series is titled "Ticarium nasıl hızlı gelişirim? (75K değer) #1", i.e. the series starts at a company value of 75K, which is consistent with a $75,000 start — [YouTube](https://www.youtube.com/watch?v=bJNZmQ-rXeI)
- [COMMUNITY, 2024] A tactics blog says you start with a greengrocer, then recommends opening **three supermarkets in a row** as a solid early income, and buying the **Production Licence as early as possible** to cut costs; it also calls pharmacies among the highest-profit shops — [alakasiz.com "Ticarium Taktikleri 2024"](https://alakasiz.com/ticarium-taktikleri/)
- [COMMUNITY, 2026 title] A newer forum guide recommends starting with farming and small shops to accumulate capital, then moving profits into more profitable production facilities — [saygec.com](https://saygec.com/konu/ticarium-taktikleri-2026-hizli-para-kasma-ve-buyume.10084/)
- [OFFICIAL, developer reply on Google Play] The Logistics Warehouse is **hidden at first to help new players and activates as the company grows** — [Google Play listing](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- [OFFICIAL] If R&D is not yet opened, the player still sees sellers in the product supplier list offering products **up to quality 10** — [faq.ticarium.com "ARGE ne işe yarar?"](https://faq.ticarium.com/tr/content/17)
- [REVIEW] Players say the early game is hard to grasp and ask for a built-in tutorial — [Google Play listing](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- [OFFICIAL] The "Updates We Are Working On" page lists daily special missions among planned additions — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/)

### Inferences
- The likely early loop is: greengrocer -> stock shelves from the supplier list (quality <= 10 goods before R&D) -> set prices -> wait for sales -> open more shops -> Production Licence tier 1 (garden) -> own production. This is assembled from separate sources, not stated end-to-end anywhere.
- Because the warehouse is hidden for new players, early shop stocking probably happens straight from the shop's product purchase screen rather than via a warehouse. Not confirmed.
- $75,000 is better supported (promo text + two forums + YouTube title) than $10,000, but both are old.

### Gaps
- Company-name and HQ-city selection at registration: no source found. Whether an HQ city exists at all in the current build is unconfirmed (cities do exist for delivery contracts, see section 4).
- Whether the first greengrocer is free, or bought with the grant: not stated in any snippet.
- Current tutorial steps, first-hour timers, starting Ticarium Coin / Diamond balance: not found.
- Company level or value at which the Logistics Warehouse unlocks: not found.

## 2. How do shops work: types, product lists, stocking, pricing, sales over time, employees, levels, city effects?

### Takeaway
Shops are typed retail outlets with a fixed product list and shelf capacity; the player buys stock from a supplier/seller list (the game's own "Ticarium agency" plus other players via the Logistics Warehouse market), sets a per-product price up to a maximum, and goods sell off over time at a rate modified by weekly market demand, shop level, shop manager and promotions. Exact price formulas, sales rates and employee mechanics were not retrievable.

### Cited Findings
**Shop types and products**
- [COMMUNITY, ~2022] Shop order as listed in a forum intro: Manav (greengrocer), Süpermarket, Kasap (butcher), Kırtasiye (stationery), Unlu Mamuller (bakery), Balıkçı (fishmonger), Nalbur (hardware), Giyim (clothing), Kozmetik (cosmetics), Ayakkabı (shoes), Eczane (pharmacy), Oyuncak (toys), Tekel Bayi (liquor/tobacco), Mobilya (furniture), Kuyumcu (jeweller), Oto Yedek Parça (auto parts), Petrol Ofisi (fuel station) — [korsanfan.com](https://www.korsanfan.com/konu/ticarium.10767/). Old list; newer types exist (below).
- [OFFICIAL] The "Legend 3x Products" article lists example products per shop type: greengrocer — strawberry, avocado; jeweller — gold bracelet, silver bracelet; **Technology Store** — TicPhone, smart watch; **Luxury Jewelry Shop** — diamond necklace, diamond rings — [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/210-legend-3x-products/), [faq.ticarium.com](https://faq.ticarium.com/tr/content/71)
- [OFFICIAL] The official "Wiki Helper" has a per-product table of Sales Points and Production Points (XP); visible rows: Copper Pipe 2 sales / 4 production, Gasoline Engine 50 / 90, Dishwasher 75 / 150, Desktop PC 200 / 400 — [ticarium.com/helper](https://ticarium.com/helper/?lang=en&page=ProductExperiencePoints)
- [OFFICIAL] Restaurants are a separate outlet type: orders arrive in an "Orders" list, are started manually, and run against a customer-satisfaction timer; warehouse goods are converted to restaurant materials with "Get Materials". Shelf capacity +1,000 units per level at 50 Ticarium Coin per level; first order rejection costs 5 Ticarium Coin per day, rising to a fixed 50 — [Helpshift Restaurant Tutorial](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/213-restaurant-tutorial/), [faq.ticarium.com](https://faq.ticarium.com/tr/content/84) (article predates the Diamond economy; currency may have changed)

**Stocking**
- [OFFICIAL] Products are bought through a product seller/supplier list with sorting and filtering; a 2026 patch fixed the purchase quantity not updating after sorting/filtering, renewed the product purchase screen and updated the logistics warehouse detail area — [App Store TR notes](https://apps.apple.com/tr/app/ticarium-business-tycoon/id1620118127?l=tr) (version not identified)
- [OFFICIAL] To get products into the Logistics Warehouse: open the product's **Market tab** (tap the product image or the "i" button), choose a quantity and buy — [faq.ticarium.com](https://faq.ticarium.com/en/content/55)
- [OFFICIAL] Stock cap: by buying a product in the Logistics Warehouse you can hold up to **3x the total shelf capacity of your shops** for that product — [Helpshift Logistics Warehouse](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/110-logistics-warehouse/)
- [REVIEW] A Google Play reviewer refers to "Ticarium agency products" as a seller option distinct from other players' listings (see section 7) — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- [OFFICIAL, 2026] The purchase confirmation screen now shows the product quality that will result in the warehouse after the purchase — [Google Play what's-new, 12 Jun 2026](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_GB)

**Pricing**
- [REVIEW/OFFICIAL] Prices are set per product in each shop; the store description frames shops as "stock inventory and set prices to maximise profit" — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_GB)
- [OFFICIAL] A maximum price exists per product. Legend players can raise shop prices of flagged (💸) products: **2x when the product's R&D level is 25-50 %, 3x at 50 % or more** — [Helpshift Legend 3x Products](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/210-legend-3x-products/)
- [OFFICIAL] Innovation Center "Maximum Price" upgrade: **+0.5 % max price per level, up to 20 levels** (= +10 %) — [Helpshift TR Innovation Center](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/)

**Sales over time**
- [OFFICIAL] "Market condition" shows that week's shop sales demand on a five-step scale: very bad, bad, normal, good, very good — [Helpshift TR Genel Oynanış](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/section/104-general-game-play/)
- [OFFICIAL, v2.5.0] Shops show per-minute profit and revenue; "Possible sales amount" was renamed "Sales amount" — [Helpshift v2.5.0 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
- [OFFICIAL, v2.13.6, Apr 2026] Shop shelves show a countdown timer to the next sale — [soft112 changelog](https://ticarium-business-tycoon.soft112.com/)
- [OFFICIAL] Innovation Center "Sales Amount" is one of three per-product upgrade tracks (max 20 levels); the per-level percentage was not visible — [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/)
- [OFFICIAL, v2.5.0] Shop TV and radio promotion fees are paid with a **Promo Card** instead of Ticarium Coin — [Helpshift v2.5.0 notes](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)

**Shop levels, staff, limits**
- [OFFICIAL, "Become a Legend" article] Shops can be upgraded to **level 10**; each level above 6 adds **15 % sales** relative to the base sales level. A **Shop Manager increases sales speed by 30 %**. A further shop perk involving "10 %" and a 15-day renewal appeared garbled in the snippet and cannot be stated reliably — [faq.ticarium.com Become A Legend](https://faq.ticarium.com/en/content/53). It is unclear whether levels 7-10 and the manager are Legend-only.
- [OFFICIAL, older] Standard shop-count limit **30**, raisable to **40** by buying licence limits — [faq.ticarium.com Become A Legend](https://faq.ticarium.com/en/content/53); **superseded/contradicted** by v2.5.0 notes stating "Shop, Field, Livestock, Industry and Mine licence limits have been removed" and that the Management Centers system was activated — [Helpshift v2.5.0](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
- [OFFICIAL] A help article "What happens when you raise the store level?" exists but its body was not retrievable — [Helpshift EN index](https://yuyutogames.helpshift.com/hc/en/3-ticarium/)

### Inferences
- Sales are tick-based (a visible countdown to the next sale) rather than continuous, with quantity per tick ("Sales amount") scaled by market condition, shop level, manager and Innovation Center upgrades.
- The "Ticarium agency" behaves as an NPC wholesaler in the same seller list as players; this rests on a single review plus the official statement that unlicensed/pre-R&D players see sellers of quality <= 10 goods.
- Since Management Centers replaced licence limits in v2.5.0, the old 30/40 shop cap is probably no longer the live rule.

### Gaps
- Shop purchase cost per type, level unlock per type, upgrade costs and timers: not found.
- The price-vs-sales-speed relationship (does a higher price slow sales, or is price simply capped?): not found.
- Employee system for shops beyond "Shop Manager": no article found.
- City / location / population effects on shop sales: no source found; cannot confirm they exist.
- Agency price level relative to player prices: not found.
- How Management Centers work and what they cost: not found.

## 3. How do production facilities and mines work?

### Takeaway
Production is gated by a four-tier Production Licence (garden, livestock, industry, mining) and runs on production lines with star levels whose output scales with R&D quality, facility level, Legend status and Innovation Center upgrades; output goes to the Logistics Warehouse and from there to own shops, other players or the government. Recipes, timers and capacities were not retrievable.

### Cited Findings
- [OFFICIAL] **Production Licence** has four levels unlocking facility categories in order — Garden (Bahçe), Livestock (Hayvancılık), Industry (Sanayi), Mine (Maden) — costing **$1,250,000 / $5,000,000 / $20,000,000 / $80,000,000** — [faq.ticarium.com "Üretim Lisansı ne işe yarar?"](https://faq.ticarium.com/tr/content/88); same figures in the [DonanımHaber thread](https://forum.donanimhaber.com/online-mobil-ticaret-oyunu-ticaret-simulator--152272506). Article date unknown.
- [OFFICIAL] Licence list: Production, Shop Business, Field Business, Livestock, Industrial Business, Mine Business, plus several side-job licences; licences unlock features or raise limits — [faq.ticarium.com](https://faq.ticarium.com/en/content/76)
- [OFFICIAL] A Production Licence is required before the "sell" button appears in the Logistics Warehouse — [Helpshift Logistics Warehouse](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/110-logistics-warehouse/)
- [OFFICIAL, older] Standard limit for mines is **15**, raisable to **50** by buying licence limits; fields, livestock and industrial facilities also go to 50 with licences — [faq.ticarium.com Become A Legend](https://faq.ticarium.com/en/content/53); licence limits were **removed in v2.5.0** — [Helpshift v2.5.0](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
- [OFFICIAL] Production lines have stars (levels). Production-line upgrades for fields, livestock and industrial facilities can rise by 10 levels for every 10 quality researched; facility caps can rise to 5 under certain conditions (snippet wording imprecise) — [faq.ticarium.com Become A Legend](https://faq.ticarium.com/en/content/53)
- [OFFICIAL] Legend level 1 gives **+50 % production** in fields, livestock, industrial and mining facilities — [faq.ticarium.com Become A Legend](https://faq.ticarium.com/en/content/53)
- [OFFICIAL] Innovation Center "Production Amount": **+1.25 % per level, max 20 levels** (= +25 %) per product — [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/)
- [COMMUNITY, ~2022] Every 25 R&D levels on a product gives an extra 25 % production for that product — [korsanfan.com](https://www.korsanfan.com/konu/ticarium.10767/). Old and unverified.
- [OFFICIAL, v2.5.0] Production lines display the quality that will be produced; the mine page shows **mine reserve** information; land discovery and land purchase screens were updated — [Helpshift v2.5.0](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
- [OFFICIAL] Help centre has a "Lands & Mines" section with articles "What is land discovery?" and "What is a mine?"; bodies not retrievable — [Helpshift TR index](https://yuyutogames.helpshift.com/hc/tr/)
- [OFFICIAL] Store description: factories turn raw materials into products; mines extract resources to be turned into high-profit goods; land is purchased and developed — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- [OFFICIAL, 2026 App Store notes, around v2.15-2.16] Products that need no raw materials can be **quick-sold to the government with a profit margin** once production finishes; v2.16.0 added new products and new production facilities — [App Store](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
- [OFFICIAL, v2.18.0, Aug 2026] "Production speed-up bot checks" appear less often, i.e. a production speed-up action exists and is bot-checked — [App Store](https://apps.apple.com/tt/app/ticarium-business-tycoon/id1620118127)
- [OFFICIAL] Production gives more XP than selling the same product (e.g. Desktop PC 400 production vs 200 sales) — [ticarium.com/helper](https://ticarium.com/helper/?lang=en&page=ProductExperiencePoints)
- [COMMUNITY] Mines are opened with capital in the millions — [YaCevap](https://yandex.com.tr/yacevap/c/oyun/q/ticarium-oyunu-nasil-oynanir-3834587191)

### Inferences
- Mines sit on purchased land found through "land discovery" and have a finite or tracked reserve. The reserve display is confirmed; depletion behaviour is not.
- Raw-material-free products (crops, livestock, ores) are the natural start of the chain, and since 2026 can bypass the player market via the government quick-sale.
- Total production multipliers stack from at least four sources: R&D quality/line stars, facility level, Legend (+50 %), Innovation Center (+25 % at max).

### Gaps
- Recipes (inputs to outputs), production timers, batch sizes, line counts per facility, facility purchase and upgrade costs: not found. The Wiki Helper at ticarium.com/helper probably has these tables but could not be opened.
- Bodies of "What is the stars (levels) on the production line?" and "What happens when you raise the level of production facilities?": not retrievable.
- Mine reserve sizes, depletion, land discovery cost and time: not found.
- Whether output can be sent directly to shops or must pass through the warehouse: not stated.
- Separate prices for Field / Livestock / Industrial / Mine Business licences: not found.

## 4. How do logistics centres, warehouses, trucks and delivery contracts work?

### Takeaway
The Logistics Warehouse is both the player's inventory and the player-to-player market (with a reserve setting, a daily sales cap tied to company value, and two sales taxes); trucks, trailers, drivers and a garage exist only for the government-contract system added in August 2024 and expanded in August 2025. No evidence was found that trucks are needed to move goods between the player's own facilities and shops.

### Cited Findings
**Logistics Warehouse**
- [OFFICIAL] Hidden for new players; unlocks as the company grows — [Google Play developer reply](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- [OFFICIAL] Buying: via the product's Market tab — [faq.ticarium.com](https://faq.ticarium.com/en/content/55). Stock cap 3x total shop shelf capacity — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/110-logistics-warehouse/)
- [OFFICIAL] Selling requires a Production Licence. Each player can sell only **5 % of company value per day** through the warehouse, and the rate varies with company level (level table not visible) — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/110-logistics-warehouse/). Daily sales limit information was added to the warehouse UI in v2.8.0 — [App Store notes](https://apps.apple.com/ca/app/ticarium-tycoon-strategy/id1620118127)
- [OFFICIAL] **Reserve amount**: the quantity to keep when a product is opened for sale; only stock above the reserve is listed for sale — [faq.ticarium.com "Rezerv miktar nedir?"](https://faq.ticarium.com/tr/content/22)
- [OFFICIAL] **Non-Manufactured Product Tax** applies to warehouse sales of goods the seller did not produce (rate cut off in snippet). **Poor Quality Product Tax** applies from a company value of **$1 billion** when advanced companies sell low-quality goods (rate and quality threshold cut off) — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/110-logistics-warehouse/)
- [OFFICIAL, 15 Mar 2026] Warehouse level upgrades got 10x and 25x bulk-upgrade options, so the warehouse has many levels — [soft112 changelog](https://ticarium-business-tycoon.soft112.com/)

**Trucks, drivers, government contracts**
- [OFFICIAL, v2.2.0, 9 Aug 2024] Government contracts system added: take product contracts opened by government institutions and transport the goods to the contract city with trucks/trailers you own. Hire drivers, train them for new licence classes, manage salary, retirement and dismissal. Buy vehicles and trailers into a garage; higher garage level allows more vehicles; vehicle levelling, maintenance, trailer coupling, driver assignment; used-vehicle market for selling — [Helpshift v2.2.0](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/223-v2-2-0-update-notes-09-08-2024-gmt-3/)
- [OFFICIAL] Vehicles have speed, maintenance life, capacity and load-type attributes; trailers differ in capacity and features; each trailer type needs a different driving-licence class; driver licence and experience affect delivery — [faq.ticarium.com contracting update intro](https://faq.ticarium.com/en/content/115)
- [OFFICIAL, v2.2.11, 29 Aug 2024] Confirmation prompt when dispatching with missing load; licence type shown for trailers — [Helpshift v2.2.11](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/229-v2-2-11-update-notes-29-08-2024/)
- [OFFICIAL] "V2.8.0 Update Notes (06.08.2025)" is billed as a contracts update with major changes to the Contracts system; body not retrievable — [Helpshift Updates](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/116-updates/). The App Store snippet dated 2.8.0 as "Jun 8", which is probably a day/month swap of the same 06.08.2025 date.
- [OFFICIAL] Planned "Maintenance speed-up card" alongside R&D and Build speed-up cards — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/)

### Inferences
- "Logistics" in Ticarium means two separate systems: (a) the warehouse/market, which is abstract and instantaneous, and (b) the truck fleet, which is a contract-delivery side game with its own progression (garage level, vehicle level, driver licences).
- The daily cap and the two taxes are anti-arbitrage and anti-dumping controls on the player market, pushing players to sell what they produce at decent quality.

### Gaps
- Tax rates, the daily-cap table by company level, warehouse capacity per level and upgrade costs: cut off in snippets.
- Vehicle and trailer prices, capacities, travel times, contract rewards and penalties, driver salaries: not found.
- Content of the v2.8.0 contracts overhaul: not found.
- Whether player-to-player sales involve any delivery delay: not found.

## 5. How does R&D / product quality work and what does quality affect?

### Takeaway
R&D raises per-product quality on a 0-100 scale; quality determines what can be bought and produced, production-line level caps, eligibility for higher shop prices (Legend 2x/3x), exposure to the poor-quality sales tax, and access to the late-game Innovation Center. The R&D team was replaced by "R&D limit cards" in May 2026, so pre-2026 descriptions of R&D staffing are obsolete.

### Cited Findings
- [OFFICIAL] The main purpose of R&D is to raise the quality of products you make; without R&D you can still see sellers offering products up to quality 10 — [faq.ticarium.com](https://faq.ticarium.com/tr/content/17)
- [COMMUNITY, ~2022] R&D department level caps the quality you can work with: about 10 % without/at the start, **50 % at level 1, 80 % at level 2, 100 % at level 3** (the snippet's wording about the first tier was internally inconsistent) — [korsanfan.com](https://www.korsanfan.com/konu/ticarium.10767/). Unverified for the current build.
- [OFFICIAL] The Innovation Center requires a **level 3 R&D centre**, costs **$250 million** and takes **10 days** to build, needs maintenance **every 15 days**, and upgrades products that reached **quality 100**: Production Amount (+1.25 %/level), Sales Amount, Maximum Price (+0.5 %/level), each up to level 20. With all slots open, 4 researches run at once and a product's 3 attributes can be developed in parallel; "Innovation Speed-up" cards shorten research — [Helpshift TR Innovation Center](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/) (article ID suggests late Nov 2025)
- [OFFICIAL] Quality gates Legend pricing: 25-50 % gives 2x, 50 %+ gives 3x on flagged products — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/210-legend-3x-products/)
- [OFFICIAL] Production-line levels are tied to quality researched (10 line levels per 10 quality) — [faq.ticarium.com Become A Legend](https://faq.ticarium.com/en/content/53)
- [OFFICIAL] Selling low quality from a company worth $1 billion or more incurs the Poor Quality Product Tax — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/110-logistics-warehouse/)
- [OFFICIAL, v2.14.1, 22 May 2026] **R&D team removed and replaced with the R&D limit card**; R&D screen redesigned. v2.15.0 made developments started with an R&D limit card more prominent — [soft112 changelog](https://ticarium-business-tycoon.soft112.com/), [apkpure.net 2.15.0](https://apkpure.net/ticarium-business-tycoon/com.ticarium/download)
- [OFFICIAL] An R&D Speed-Up Card reduces research times — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/)
- [OFFICIAL] Cooperatives have their own R&D Office: level 2 costs $2.5 billion + 9,000 Ticarium Coin and 72 hours; level 3 costs $5 billion + 13,500 Ticarium Coin and 96 hours — [faq.ticarium.com Kooperatif Ofisleri](https://faq.ticarium.com/tr/content/65) (cooperative office, not the personal R&D department; pre-Diamond currency)
- [OFFICIAL] Warehouse stock has a quality value that changes when new purchases are added (the purchase screen previews the resulting quality) — [Google Play what's-new](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_GB)

### Inferences
- Warehouse quality per product is probably a blended average of stock and incoming purchases, since the game previews "the quality that will be generated in the warehouse after purchase". The averaging rule is not stated.
- Quality does not appear, in any snippet seen, to directly change shop sales speed; its confirmed effects are on price ceilings (Legend), production capacity, taxes and Innovation Center access. A direct quality-to-demand effect may exist but is undocumented here.

### Gaps
- How R&D limit cards are obtained, what limit they set, and research costs and timers per quality point: not found.
- "R&D Department Level Fees" article body: not retrievable.
- Whether shop customers respond to quality (sales rate or allowed price) for non-Legend players: not found.

## 6. What gates progression (level, money, premium currency, time) and what are the main money sinks?

### Takeaway
Progression is gated mainly by cash and company value (licences, facilities, R&D, Innovation Center), by real-time timers (construction, research, maintenance cycles) and by premium currency and cards; the XP level is endless and mostly yields rewards and ranking. The premium economy moved from Ticarium Coin to Diamonds (date unconfirmed), so older Coin prices may be stale.

### Cited Findings
- [OFFICIAL] The level system is endless; its main purpose is rewards and the level ranking. XP comes from production and shop sales, with per-product point values — [faq.ticarium.com](https://faq.ticarium.com/en/content/20), [ticarium.com/helper](https://ticarium.com/helper/?lang=en&page=ProductExperiencePoints). Level rewards are collected under "My Company & Bank" — [faq.ticarium.com](https://faq.ticarium.com/tr/content/37)
- [OFFICIAL] Company value is a gating variable: daily warehouse sales cap (5 % of company value), Poor Quality tax from $1 billion, warehouse unlock "as the company grows" — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/110-logistics-warehouse/)
- [OFFICIAL] Cash gates: Production Licence $1.25M / $5M / $20M / $80M; Innovation Center $250M + 10 days + level 3 R&D — [faq.ticarium.com](https://faq.ticarium.com/tr/content/88), [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/)
- [OFFICIAL] "Become a Legend" is a 5-level prestige system (level 2 requires level 1). Choosing it **resets purchased licence limits**; level 1 gives +50 % production, and Legend unlocks 2x/3x pricing on flagged products — [faq.ticarium.com](https://faq.ticarium.com/en/content/53)
- [OFFICIAL] Economy revamp: **Diamonds** become the premium currency, bought directly or in packs with real money; Coins are obtained by converting Diamonds; all store packages moved to Diamonds; three speed-up cards (R&D, Build, Maintenance) — [Helpshift "Updates We Are Working On"](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/256-updates-we-are-working-on/) (undated page, written partly in present tense; ship date not confirmed)
- [OFFICIAL] Card items: Promo Card (shop TV/radio promotion), R&D limit card, Innovation Speed-up card — [Helpshift v2.5.0](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/), [soft112](https://ticarium-business-tycoon.soft112.com/), [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/)
- [OFFICIAL] Recurring upkeep: Innovation Center maintenance every 15 days; vehicle maintenance; driver salaries — [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/), [Helpshift v2.2.0](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/223-v2-2-0-update-notes-09-08-2024-gmt-3/)
- [OFFICIAL, v2.19.1, Sep 2026] The Tax Office and tax system were revamped and the bank term-deposit system was updated — [App Store](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127)
- [REVIEW] The bank has checking and savings accounts, and savings earn daily interest — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- [COMMUNITY] Ticarium Coin is earned from levelling up, daily missions, watching ads and side jobs — [saygec.com](https://saygec.com/konu/ticarium-taktikleri-2026-hizli-para-kasma-ve-buyume.10084/) via search summary; side jobs have their own licences and creation limits — [Helpshift Side Jobs](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/271-what-are-the-limits-for-creating-side-jobs/)
- [COMMUNITY] Money cheats and "fast money" methods can get an account suspended — [DonanımHaber](https://forum.donanimhaber.com/online-mobil-ticaret-oyunu-ticaret-simulator--152272506)

### Inferences
- Main money sinks, in rough order of when they appear: shop purchases and upgrades, restocking, Production Licence tiers, facilities and land, R&D, warehouse levels, vehicles and drivers, taxes, Innovation Center and its upkeep.
- XP level seems to be a weak gate compared with cash and company value; no snippet showed a feature locked to a specific XP level.

### Gaps
- Any explicit level requirements for shop or facility types: none found.
- Diamond prices, Diamond-to-Coin rate, and whether Ticarium Coin still exists as a separate wallet in November 2026: not found.
- Details of the September 2026 tax revamp (rates, what is taxed): not found.
- Legend entry requirements and the perks of Legend levels 2-5: not found.

## 7. What changed in recent updates (2025-2026), including the warehouse purchase-ordering complaint?

### Takeaway
2025 brought a UI and economy overhaul (v2.5.0: licence limits removed, Management Centers, Promo Cards), a contracts overhaul (v2.8.0, 6 Aug 2025) and the Innovation Center; 2026 brought warehouse bulk upgrades, shelf sale countdowns, replacement of the R&D team by limit cards (v2.14.1, May), new products and facilities (v2.16), government quick-sale, and a tax/bank revamp (v2.19.1, Sep). The agency-ordering complaint is real but appears older than 2026.

### Cited Findings
- [REVIEW] Google Play review: refilling warehouses became more expensive; the reviewer then noticed the top option in the list "was no longer the Ticarium agency products" but other players' listings, does not want to buy from other players, and asks for the agency to be the top choice again; a second reviewer repeats this and says it made them play less. One listing snapshot dates the review "521 days ago" (snapshot date unknown, so roughly early-to-mid 2025 at the latest). No developer reply to this specific review was found — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_US)
- [REVIEW, v2.13.6, 26 Apr 2026] A user says sorting criteria when searching for goods in the warehouse are insufficient and asks for price-performance / margin sorting; also notes the developer updates quickly — [apkgk.com](https://apkgk.com/tr/com.ticarium)
- [OFFICIAL, 2026, version unclear] Fixed purchase quantity not updating after sorting/filtering in the seller list; product purchase screen renewed; logistics warehouse detail area updated — [App Store TR](https://apps.apple.com/tr/app/ticarium-business-tycoon/id1620118127?l=tr)
- [OFFICIAL] v2.5.0 (2025, exact date not seen): new interface; per-minute shop profit/revenue; Promo Card replaces Coin for promotions; licence limits removed; Management Centers; mine reserve info; production quality preview; land screens updated — [Helpshift](https://yuyutogames.helpshift.com/hc/en/3-ticarium/faq/250-v2-5-0-update-notes/)
- [OFFICIAL] v2.8.0 (06.08.2025): contracts update; general chat, gift showcase, reporting changes; daily sales limit info in warehouse — [Helpshift Updates](https://yuyutogames.helpshift.com/hc/en/3-ticarium/section/116-updates/), [App Store](https://apps.apple.com/ca/app/ticarium-tycoon-strategy/id1620118127)
- [OFFICIAL] Innovation Center help article created around late Nov 2025 — [Helpshift TR](https://yuyutogames.helpshift.com/hc/tr/3-ticarium/faq/277-innovation-center-1763723921/)
- [OFFICIAL] 15 Mar 2026: 10x and 25x warehouse level upgrade options. v2.13.6 (Apr 2026): countdown to next sale on shelves. v2.14.1 (22 May 2026): R&D team replaced by R&D limit card. v2.15.0: limit-card developments highlighted, quality preview on purchase — [soft112](https://ticarium-business-tycoon.soft112.com/), [apkpure.net](https://apkpure.net/ticarium-business-tycoon/com.ticarium/download)
- [OFFICIAL] v2.16.0: new products and production facilities; government quick-sale for raw-material-free products. v2.17.x (15-22 Jul 2026): cooperative and global chat features, UI refresh. v2.18.0 (10-11 Aug 2026): icon updates, fewer production speed-up bot checks. v2.19.0 (27 Aug): Halloween event ("Ghost/haunted warehouse" key collection, an event and not a warehouse change). v2.19.1 (2 Sep): Tax Office and tax system revamp, term-deposit update — [App Store](https://apps.apple.com/gh/app/ticarium-business-tycoon/id1620118127), [apkpure](https://apkpure.com/ticarium-business-tycoon/com.ticarium/download), [ticarium.com news](https://www.ticarium.com/?lang=en)
- [OFFICIAL] Google Play listing last updated 20 Oct 2026 — [Google Play](https://play.google.com/store/apps/details?id=com.ticarium&hl=en_SG)

### Inferences
- The "agency no longer on top" change most likely reflects a re-sort of the seller list (by price or quality) that placed player listings above the NPC agency; because cheaper or better player stock was not always what the list defaulted to, players experienced it as a cost increase. The actual sort rule and the patch that introduced it are not documented in anything found.
- Version dating across sources is inconsistent (2.16.0 shown as both 12 Jun and 8 Jul 2026; App Store snippets omit years), so the sequence is more reliable than the exact dates.

### Gaps
- Which version changed the seller-list ordering, and the current default sort in November 2026: not found.
- Any release notes after v2.19.1 (September - November 2026): not found.
- Full bodies of v2.5.0, v2.8.0 and "Updates We Are Working On" notes; release date of the Diamond economy: not retrievable.
- Discord, Reddit and Technopat content: no relevant results surfaced. YouTube guides found were titles only, the most detailed being about four years old.
