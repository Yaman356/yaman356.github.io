# Accessibility, visual design system and technical UI performance for an HTML/CSS/JS mobile game (web + Capacitor WebView), 2025-2026

Research date: 2026-11-14. Context: "Tezgâh", Turkish mobile-first trading/production sim; plain HTML/CSS UI re-rendered ~4x per second by vanilla JS; PixiJS 8 WebGL isometric map; light and dark themes.

Reading guide: "Cited Findings" are statements read from the linked source during this research session. "Inferences" are my own application of those findings to Tezgâh (opinion, not evidence). Items I know from general background but did not open in this session are placed under "Gaps" or explicitly flagged "not verified this session", with a pointer URL for the report writer to check.

---

## 1. Game accessibility guidelines for a text- and menu-heavy sim (GAG, XAG, WCAG 2.2 AA, screen readers, live regions)

### Takeaway
For a menu-heavy sim the binding numbers are: text contrast 4.5:1 (3:1 for large text, UI components and disabled text), touch targets at least 24x24 CSS px (WCAG AA floor) and realistically 44-48, text that survives 200% scaling without two-axis scrolling, and never colour as the only signal. A UI that re-renders 4x per second must not be a live region as a whole; use one or two small pre-existing `role="status"` regions for discrete events only.

### Cited Findings

**WCAG 2.2 (W3C Recommendation, 12 December 2024)**
- WCAG 2.2 is a W3C Recommendation dated 12 December 2024 (REC-WCAG22-20241212); it extends 2.1 and does not deprecate 2.0/2.1 — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 1.4.1 Use of Color (A): colour cannot be the only means of conveying information, indicating an action, prompting a response or distinguishing an element — [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aaa)
- 1.4.3 Contrast (Minimum) (AA): text at least 4.5:1; large text at least 3:1; incidental text and logotypes exempt — [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aaa)
- "Large scale" text is defined as at least 18 point, or 14 point bold — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 1.4.4 Resize Text (AA): text resizable up to 200% without assistive technology and without loss of content or function — [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aaa)
- 1.4.10 Reflow (AA): no two-dimensional scrolling at 320 CSS px width; maps, video and data tables are exceptions — [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aaa)
- 1.4.11 Non-text Contrast (AA): UI components and meaningful graphics need at least 3:1 against adjacent colours — [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aaa)
- 1.4.12 Text Spacing (AA): no loss of content when users set line height to 1.5x font size, paragraph spacing 2x, letter spacing 0.12x, word spacing 0.16x — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 1.3.4 Orientation (AA): content cannot be locked to one orientation unless essential — [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aaa)
- 2.2.1 Timing Adjustable (A): each time limit set by content must be able to be turned off, adjusted or extended, unless an exception applies — [WCAG 2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aaa)
- 2.2.2 Pause, Stop, Hide (A): moving/blinking/scrolling content that starts automatically and lasts more than five seconds alongside other content needs pause/stop/hide; auto-updating content that starts automatically alongside other content needs pause, stop, hide or a frequency control, unless essential — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 2.3.1 (A): nothing flashes more than three times in any one-second period — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 2.3.3 Animation from Interactions (AAA): motion animation triggered by interaction can be disabled unless essential — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 2.4.7 Focus Visible (AA): keyboard focus indicator is visible. 2.4.11 Focus Not Obscured (Minimum) (AA, new in 2.2): a focused component is not entirely hidden by author-created content (relevant to sticky bottom nav, banners, toasts). 2.4.13 Focus Appearance (AAA): indicator at least a 2 CSS px perimeter with 3:1 change contrast — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 2.5.8 Target Size (Minimum) (AA): targets at least 24 by 24 CSS px, with exceptions for spacing (non-intersecting 24 px circles), equivalent control, inline targets, user-agent controls, essential — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 2.5.5 Target Size (Enhanced) (AAA): at least 44 by 44 CSS px — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 2.5.7 Dragging Movements (AA): any drag operation must be achievable with a single pointer without dragging, unless essential. 2.5.1 Pointer Gestures (A): multipoint/path gestures (pinch, swipe) need a single-pointer alternative — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 2.5.2 Pointer Cancellation (A): do not execute on the down-event; complete on up-event with ability to abort/undo — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 3.2.2 On Input (A): changing a setting of a UI component (e.g. a `<select>`) must not automatically cause a change of context unless the user was told beforehand. 3.3.1 Error Identification (A): the item in error is identified and described in text — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 4.1.3 Status Messages (AA): status messages can be programmatically determined through role or properties so assistive tech can present them without moving focus — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- 1.3.5 Identify Input Purpose (AA) and 1.4.13 Content on Hover or Focus (AA: dismissible, hoverable, persistent) — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**Platform touch-target figures (secondary sources only)**
- Secondary sources consistently report Apple's minimum tappable area as 44x44 pt and Material's as 48x48 dp (visual icon may be 24 dp with padding), with Material advising 8 dp or more between targets — [NZ Govt web a11y guidance](https://govtnz.github.io/web-a11y-guidance/ka/accessible-ux-best-practices/mobile-apps/mobile-app-a11y-by-feature-type/touch-and-pointer-target-sizing.html); [Shopify tap target guidance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/increase-tap-target-size). Not confirmed against the Apple HIG or m3.material.io pages in this session.

**Game Accessibility Guidelines (gameaccessibilityguidelines.com)**. Basic and Intermediate items most relevant to a text/menu sim, wording as on the full list — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)
- Basic, Motor: "Ensure interactive elements / virtual controls are large and well spaced, particularly on small or touch screens"; "Include toggle/slider for any haptics"; "Include an option to adjust the game speed"; "Ensure controls are as simple as possible, or provide a simpler alternative".
- Basic, Cognitive: "Use simple clear language"; "Use simple clear text formatting"; "Use an easily readable default font size"; "Include interactive tutorials"; "Allow players to progress through text prompts at their own pace"; "Avoid flickering images and repetitive patterns"; "Allow the game to be started without the need to navigate through multiple levels of menus".
- Basic, Vision: "Provide high contrast between text/UI and background"; "Ensure no essential information is conveyed by a fixed colour alone".
- Basic, Hearing: "Ensure no essential information is conveyed by sounds alone"; "Provide separate volume controls or mutes for effects, speech and background / music".
- Basic, General: "Ensure that all settings are saved/remembered"; "Provide details of accessibility features in-game"; "Solicit accessibility feedback".
- Intermediate: "Ensure screenreader support for mobile devices"; "Allow interfaces to be resized"; "Provide an option to adjust contrast"; "Provide a choice of text colour, low/high contrast choice as a minimum"; "Give a clear indication that interactive elements are interactive"; "Highlight important words"; "Indicate / allow reminder of current objectives during gameplay"; "Include contextual in-game help / guidance / tips"; "Provide an option to turn off / hide background movement"; "Avoid / provide alternatives to requiring buttons to be held down"; "Make interactive elements that require accuracy ... stationary"; "Provide an autosave feature"; multi-touch/drag/swipe must not be required (optional alternative only).

**Xbox Accessibility Guidelines (Microsoft Learn; pages show ms.date 2026-11-13)**
- XAG 101 minimum default text size for mobile/Xbox Game Streaming: 18 px at 100 DPI, 36 px at 200 DPI, 72 px at 400 DPI, scaling linearly; a 5.5-inch 1080p screen is roughly 400 DPI. PC: 18 px at 1080p. Measured as body height (ascender to descender) — [XAG 101](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/101)
- XAG 101: players should be able to resize text up to 200% of the minimum without loss of content; scrolling in one direction is acceptable, two-direction scrolling is not; icons/glyphs scale with text; "Platform-provided screen magnification tools aren't an appropriate mitigation for small text size" — [XAG 101](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/101)
- XAG 101 spacing when not user-configurable: line width at most 80 characters; line spacing at least 1.5; paragraph spacing at least 2x line spacing; letter spacing at least 0.12x font size; word spacing at least 0.16x. Include at least one sans-serif option; "Ensure that all fonts include complete character sets for all supported languages"; sentence case rather than all caps for lines of text (one/two-word labels exempt); left-aligned, not centred or justified — [XAG 101](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/101)
- XAG 102 contrast: standard text and important visual elements 4.5:1; large-scale text/elements 3:1 (mobile "large" = 36 px at 100 DPI); text on inactive/disabled elements 3:1; placeholder and input text 4.5:1; a high-contrast mode should reach 7:1 for all UI elements; measure against the lowest-contrast area of non-solid backgrounds; read the platform contrast setting at launch where available; no text inside images except logotypes — [XAG 102](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102)
- XAG 102: "Avoid relying on color alone to communicate information"; red/green for important elements is flagged as a problem for some colour-blind players (XAG 103 covers additional channels) — [XAG 102](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102)
- XAG 102 notes that very high contrast can be hard for some players with cognitive/reading disabilities, so configurable contrast is preferred over a single maximum — [XAG 102](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102)

**ARIA live regions (MDN)**
- Normally only `aria-live="polite"` is used; `assertive` "should only be used for time-sensitive/critical notifications" because it interrupts — [MDN ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- `role="status"` and `role="log"` are implicit polite live regions (add redundant `aria-live="polite"` for compatibility); `role="alert"` is assertive, and adding both `role="alert"` and `aria-live="assertive"` causes double speaking in VoiceOver on iOS — [MDN ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- The live region must exist before its content changes: "The most reliable way to ensure that live regions are registered is to include them in the initial markup"; if created by JS, defer the content update (e.g. `setTimeout`) — [MDN ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- `aria-atomic="true"` makes the whole region be read on each update (without it "17:33" to "17:34" announces only "34"); `aria-relevant` defaults to `additions text`; live-region content is announced as plain text (button/link semantics inside are lost) — [MDN ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- MDN gives no throttling rule or maximum update frequency; its clock example updates once per minute — [MDN ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)

**Screen readers in WebViews**
- `content-visibility: auto` keeps off-screen content in the DOM and accessibility tree (still searchable and navigable) — [web.dev content-visibility](https://web.dev/articles/content-visibility)

### Inferences
- A 4 Hz `innerHTML` re-render is the single largest screen-reader risk: replacing a subtree destroys the element that currently has accessibility focus, so TalkBack/VoiceOver focus jumps or resets, and any live region inside is re-announced repeatedly. Rule: update text nodes/attributes in place, never replace the focused node, and keep live regions outside the re-rendered tree.
- Live-region design for Tezgâh (opinion): one persistent `<div role="status" aria-live="polite" aria-atomic="true">` in the initial HTML for discrete events ("Sipariş tamamlandı", "Üretim bitti"); one `role="alert"` for errors/blocking failures; never mark money, timers, progress bars or price tickers as live. Countdown/price values should be readable on demand (focusable, with a full-sentence `aria-label`), not announced.
- 2.2.2 applies to auto-updating prices/tickers: the game simulation is arguably "essential", but a pause control (game pause) plus a "reduce updates" setting satisfies the spirit of both WCAG 2.2.2 and GAG "adjust the game speed".
- The PixiJS canvas is invisible to assistive tech. Everything actionable on the map needs an equivalent HTML list/menu path (which also satisfies 2.5.7/2.5.1 for pan/pinch/drag).
- Practical target rule: visual control may be smaller, but hit area at least 44x44 CSS px with at least 8 px between adjacent targets; 24x24 is only the legal floor. `<select>` and form controls inside list rows are the most likely violators.
- Status colours (profit/loss, stock OK/low, market up/down) need a second channel: arrow or sign (+/−), icon shape, or text label; red/green alone fails 1.4.1 and XAG 102.
- Respect `prefers-reduced-motion` for count-up numbers, coin fly animations and map camera easing, and expose the same toggle in settings (GAG: settings saved; "turn off / hide background movement").
- XAG's 18 px at 100 DPI is a physical-size rule; in CSS px terms on phones (CSS px is roughly 160 DPI-equivalent) it does not translate one-to-one. Treat 16 CSS px as body default and use XAG as the reason not to go below roughly 12-13 CSS px for anything essential (opinion; no source gives an exact CSS px equivalent).

### Gaps
- I found no authoritative, current (2025-2026) documentation on TalkBack/VoiceOver behaviour specifically inside Android System WebView / WKWebView under Capacitor (e.g. live-region reliability, focus loss on DOM replacement). The statement that DOM replacement resets screen-reader focus is from general experience, not a cited source; it should be tested on devices.
- Apple HIG and Material 3 touch-target pages were not opened directly (m3.material.io is JS-rendered and returned no content); 44 pt / 48 dp / 8 dp come from secondary sources.
- XAG 103 (additional channels), XAG 106 (screen narration), XAG 107 (input), XAG 112 (UI navigation), XAG 117 (motion) were not read.
- `Document.ariaNotify()` is listed by MDN as related but its support in WebViews was not checked.
- `prefers-reduced-motion`, `prefers-contrast` and `forced-colors` media query support inside WebViews was not verified this session (pointer: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

---

## 2. Typography for mobile UI (sizes, line height, Turkish characters, tabular numerals, user font scaling in WebViews)

### Takeaway
Use rem-based sizes with 16 px body default and an 11 pt/px absolute floor, line height 1.5 for running text, a font with a complete Turkish set, and locale-aware casing (`lang="tr"`, `toLocaleUpperCase('tr-TR')`). Android WebView scales px text by the system font scale automatically while iOS WKWebView ignores Dynamic Type unless the root font is set to an Apple text style, so the layout must tolerate larger text on both.

### Cited Findings
- Apple's official typography table lists iOS/iPadOS default text size 17 pt and minimum 11 pt (search-result summary of the HIG typography page; several blogs wrongly call 17 pt a minimum) — [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography.md)
- Material Design 3 type scale: body large 16 sp, label small 11 sp, as reported by third-party ports; official m3 page not retrieved — [Android Compose Material3 Typography reference](https://developer.android.com/reference/kotlin/androidx/compose/material3/Typography)
- Line spacing at least 1.5 within paragraphs, paragraph spacing at least 2x, line width at most 80 characters, left-aligned, sentence case for lines of text — [XAG 101](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/101)
- "Ensure that all fonts include complete character sets for all supported languages" — [XAG 101](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/101)
- Android WebView: font scaling is always enabled and automatically scales any font size defined in `px` by the system font-scale preference; a `px` cap inside `min()`/`max()` is scaled too (14 px cap at 1.5 scale becomes 21 px) — [Ionic dynamic font scaling](https://ionicframework.com/docs/layout/dynamic-font-scaling)
- Chrome for Android (the browser, not WebView) ignores the system font scale by default; an experimental "Accessibility Page Zoom" flag exists — [Ionic dynamic font scaling](https://ionicframework.com/docs/layout/dynamic-font-scaling)
- iOS: Ionic implements Dynamic Type by setting the root element font to Apple's body text style (default 17 px), Apple devices only; advice: use `rem` not `px`, avoid `em` for text (compounds), do not set a fixed root font size, change fixed `width`/`height` to `min-width`/`min-height`, let long text wrap instead of truncating — [Ionic dynamic font scaling](https://ionicframework.com/docs/layout/dynamic-font-scaling)
- Opt-out on Android is `webSettings.setTextZoom(100)`; a Capacitor plugin (`@capawesome/capacitor-text-zoom`) reads/sets WebView zoom (1.0 = 100%), value not persisted across restarts — [Ionic forum thread](https://forum.ionicframework.com/t/disable-system-font-scaling-for-ionic-apps-on-android/244568); [Capawesome text-zoom](https://capawesome.io/docs/sdks/capacitor/text-zoom/)
- A CSS `env(preferred-text-scale)` proposal exists at the CSSWG (explainer) to expose the OS text scale to pages — [CSSWG explainer](https://drafts.csswg.org/css-env-1/explainers/env-preferred-text-scale.md)
- Turkish casing: default `toUpperCase()` maps "i" to "I" while the Turkish result is "İ"; `toLocaleUpperCase("tr-TR")` / `toLocaleLowerCase("tr-TR")` give correct results (e.g. "İstanbul" to "İSTANBUL") — [GitHub: tr-TR toLocaleLowerCase/UpperCase](https://www.github.com/aalpgiray/tr-TR-toLocaleLowerCase-and-toLocaleUpperCase); [Onur Gumus, "Turkey test"](https://onurgumus.github.io/2021/01/23/Does-your-code-pass-the-Turkey-test.html)

### Inferences
- Suggested type scale (opinion, derived from HIG 11 pt floor, M3 16/11, XAG): body 1rem (16 px), secondary 0.875rem (14 px), captions/badges no smaller than 0.75rem (12 px) and never below 11 px; numbers that drive decisions (money, price, stock) at body size or larger. Line height 1.4-1.5 for paragraphs, about 1.2-1.3 acceptable for single-line labels and dense list rows.
- Do not disable Android text zoom (`setTextZoom(100)`) as a quick fix for broken layouts; that removes the only user font scaling path on Android and conflicts with WCAG 1.4.4 and XAG 101. Instead test at system font scale 1.3x and 2.0x (Android 14+ allows up to 200%) and fix with `min-height`, wrapping and flexible grids. If the layout cannot survive, clamp rather than disable, and offer an in-game text-size setting (GAG "Allow interfaces to be resized").
- Because Android scales px automatically and iOS does not scale at all, an in-game "Yazı boyutu" setting (e.g. 90/100/115/130%) implemented by changing the root `font-size` with rem-based sizing gives parity on both platforms and on the web build.
- Set `<html lang="tr">` so CSS `text-transform: uppercase` and hyphenation use Turkish rules; avoid `text-transform` on user/company names if the page language may later be English while names stay Turkish (wrap with `lang="tr"`).
- Prefer avoiding ALL CAPS labels altogether: avoids the İ/I problem, follows XAG sentence-case guidance and shortens expanded strings.
- Use `font-variant-numeric: tabular-nums` on all values that tick (money, timers, stock counts, price tables) so digits do not shift width 4 times per second; also right-align numeric columns.
- Font choice (opinion): the system UI stack (`system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif`) costs zero bytes and SF/Roboto/Noto fully cover Turkish (İ ı Ğ ğ Ş ş Ç ç Ö ö Ü ü) plus the circumflex letters used in the game's own name (â, î, û). If a brand webfont is bundled, verify it contains U+0130, U+0131, U+011E/F, U+015E/F (S with cedilla, not S with comma below U+0218/9, which is Romanian) and â/î/û, and that it has tabular figures; bundle it locally in the Capacitor app (offline), subset to Latin + Latin Extended-A.

### Gaps
- No source was opened this session for `font-variant-numeric: tabular-nums`, `lang`-sensitive `text-transform`, or specific font coverage of Turkish glyphs; these are standard web-platform behaviours but should be treated as unverified here (pointers: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric , https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform).
- The `font: -apple-system-body` technique for Dynamic Type in WKWebView was seen only in search-result summaries (Japanese slide deck, Ionic implementation), not in Apple or WebKit primary documentation.
- Official Material 3 type-scale table and its line-height values were not retrieved (m3.material.io returned no body content).
- No source found for an evidence-based minimum CSS px size on phones; the 11/12 px floor is convention plus the HIG table.

---

## 3. Dark mode best practices and colour palette guidance for status colours

### Takeaway
Dark theme should use a dark grey base (Material's #121212) rather than pure black, express elevation by lighter surfaces instead of shadows, use desaturated/lighter tonal variants of brand and status colours, and keep text at 87% / 60% / 38% white for high / medium / disabled emphasis. Every status colour needs to pass 4.5:1 as text (3:1 as icon/graphic) in both themes and must be paired with a non-colour cue.

### Cited Findings
- Material dark theme base surface is #121212 (dark grey, not pure black); elevated surfaces get lighter via semi-transparent white overlays because dark shadows do not read on dark backgrounds — [Google codelab: Design a dark theme with Material](https://codelabs.developers.google.com/codelabs/design-material-darktheme)
- Material's elevation overlay table runs from 0% white at 0 dp, 5% at 1 dp, up to 16% at 24 dp (search-result summary of the M2 dark-theme page) — [Material Design 2 dark theme](https://m2.material.io/design/color/dark-theme)
- Text on dark surfaces: white at 87% opacity for high emphasis, 60% for medium, 38% for disabled; keep pure #FFFFFF off high-emphasis text because bright white can bleed/"vibrate" — [Google codelab](https://codelabs.developers.google.com/codelabs/design-material-darktheme)
- Use lighter tonal variants of brand colours in dark themes, not the saturated light-theme values; saturated colours "vibrate" against dark backgrounds and are harder to read; use a limited accent palette (mostly monochromatic UI, accent used sparingly) — [Google codelab](https://codelabs.developers.google.com/codelabs/design-material-darktheme)
- Material's baseline dark theme uses the 200 tone of the primary colour, which passes WCAG AA 4.5:1 for normal text at all elevation surfaces (search-result summary) — [Material Design 2 dark theme](https://m2.material.io/design/color/dark-theme)
- Contrast targets apply equally in both themes: 4.5:1 standard text, 3:1 large text and UI/graphics, 3:1 disabled text (XAG), 7:1 in a high-contrast mode — [XAG 102](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102)
- Read the platform contrast setting at launch where available and enable the game's high-contrast mode accordingly — [XAG 102](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/102)
- Capacitor Keyboard plugin can set iOS keyboard style `DARK`/`LIGHT`/`DEFAULT` (follows device appearance if unset) — [Capacitor Keyboard](https://capacitorjs.com/docs/apis/keyboard)

### Inferences
- Note a conflict between sources: Material's 38% white disabled text on #121212 is below 3:1, while XAG 102 asks 3:1 for inactive-element text (WCAG itself exempts disabled controls). Opinion: in a game where "locked/unaffordable" items carry information, follow XAG (at least 3:1) and add a lock icon or reason text.
- Design tokens (opinion): define semantic CSS custom properties per theme (`--surface-0..3`, `--text-hi/med/dis`, `--status-pos/neg/warn/info`, `--status-*-bg`) and switch with `[data-theme]` plus `prefers-color-scheme`; use `color-scheme: light dark` so native `<select>`, scrollbars and form controls follow the theme.
- Status palette: choose separate light-theme and dark-theme values per status. Light theme needs darker hues (roughly tone 30-40) to reach 4.5:1 on white; dark theme needs lighter, desaturated hues (roughly tone 70-80 / Material "200"). Check each against every surface level it appears on, since elevated dark surfaces are lighter.
- Profit/loss in Turkish finance UIs is conventionally green/red; keep it but add sign and arrow (▲ +12 / ▼ −8) and consider a blue/orange alternative palette as a colour-blind option (XAG suggests letting players choose colours of key elements).
- The PixiJS map should also get a dark-theme treatment (dimmed tint or night palette) so that opening the map in dark mode does not produce a brightness jump; HTML overlays on the map need a solid or semi-opaque backing since XAG measures contrast at the worst point of a non-solid background.
- Avoid pure black (#000) large surfaces for another practical reason (opinion): OLED smearing during scroll and harsher halation; #121212-ish keeps elevation steps visible.

### Gaps
- The official M2 dark-theme page and M3 colour-roles page did not render through the fetch tool; elevation percentages and "tone 200" come from a search summary and the Google codelab. The widely quoted "15.8:1 between white text and the highest-elevation surface" figure could not be verified and should not be cited.
- No primary source was retrieved for colour-blind-safe status palettes (e.g. Okabe-Ito) or for prevalence figures of colour vision deficiency.
- Apple HIG dark mode guidance (base vs elevated materials, semantic colours) was not read.
- No source checked on how `prefers-color-scheme` propagates into Android WebView/WKWebView under Capacitor (historically needed WebView "force dark"/algorithmic darkening settings on Android); needs device testing.

---

## 4. Performance of frequently re-rendered DOM UIs on low-end Android WebViews

### Takeaway
The budget is about 16 ms per frame and under 200 ms from tap to next paint (INP "good"); a 4 Hz full `innerHTML` re-render threatens both by forcing style/layout over the whole subtree and by destroying focused inputs. Patch only changed text/attributes, batch reads before writes, contain re-rendered panels with CSS containment / `content-visibility`, and stop all loops when the app is hidden.

### Cited Findings
- INP thresholds: good at or below 200 ms, needs improvement above 200 up to 500 ms, poor above 500 ms, assessed at the 75th percentile of page loads, segmented by mobile/desktop. INP covers click, tap and keyboard interactions (not scroll/hover), and reports the worst interaction ignoring one outlier per 50 interactions (page last updated 2 Sep 2025) — [web.dev INP](https://web.dev/articles/inp)
- Each interaction's latency = input delay (waiting for the main thread) + processing duration (event handlers) + presentation delay (until next frame painted); long tasks cause input delay — [web.dev INP](https://web.dev/articles/inp)
- There is a 16 ms budget per animation frame; the article shows an example where layout alone took over 28 ms on a 1,618-element tree; layout is normally scoped to the whole document, so larger DOMs generally cost more (updated 7 May 2025) — [web.dev: avoid large, complex layouts and layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)
- Forced synchronous layout: reading a layout property such as `offsetHeight` right after changing styles forces early style+layout; doing it in a loop is layout thrashing. Rule: batch all reads first, then all writes; previous-frame values are available without forcing layout — [web.dev layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)
- `content-visibility: auto` lets the browser skip layout and paint of off-screen elements; it applies layout, style and paint containment, plus size containment while off-screen; use `contain-intrinsic-size` (e.g. `auto 300px`, where `auto` remembers the last rendered size) to reserve space — [web.dev content-visibility](https://web.dev/articles/content-visibility)
- Measured example: initial rendering time dropped from 232 ms to 30 ms (about 7x) on a chunked page with `content-visibility: auto`; `content-visibility: hidden` keeps cached rendering state for views hidden and shown again (Facebook reported up to 250 ms navigation improvement returning to cached views) — [web.dev content-visibility](https://web.dev/articles/content-visibility)
- Support: Chrome 85, Edge 85, Firefox 125, Safari 18; Baseline "newly available" since 15 September 2025 — [web.dev content-visibility](https://web.dev/articles/content-visibility)
- Calling DOM APIs that force rendering on skipped subtrees undermines the benefit; reducing rendering work can improve INP by freeing the main thread — [web.dev content-visibility](https://web.dev/articles/content-visibility)
- Hidden/background pages: Chrome runs each timer at most once per second in background tabs, and "intensive throttling" (Chrome 88+) limits chained timers to about once per minute after the page has been hidden for some minutes; Chrome's experiment reported battery life extended by almost 2 hours (28%) with 36 background tabs — [Chrome: timer throttling in Chrome 88](https://developer.chrome.com/blog/timer-throttling-in-chrome-88)
- Capacitor fires `pause`/`resume` and `appStateChange` (Android: Activity onPause/onResume/onStop; iOS: resign/become active; web: `visibilitychange`) — [Capacitor App API](https://capacitorjs.com/docs/apis/app)

### Inferences
- Recommended render architecture for Tezgâh (opinion, consistent with the cited mechanics):
  1. Separate simulation tick from rendering. Keep the 250 ms logic tick on a timer, but write to the DOM inside a `requestAnimationFrame` callback so writes are aligned to a frame and automatically stop when the view is hidden.
  2. Dirty-check before writing: cache the last rendered string per node and only set `textContent`/attributes when the value changed. At 4 Hz most values (names, labels, most stock numbers) do not change, so this removes most style/layout work.
  3. Build list rows once and key them by entity id (`data-id` + a Map of row elements); add/remove/reorder rows on structural change only. Avoid replacing `innerHTML` of containers that hold `<input>`, `<select>`, open dropdowns, scrolled lists or focused buttons, because replacement loses focus, caret position, IME composition, an open native select picker and scroll position, and can swallow a tap that began on the old node (pointerdown on the old element, pointerup on the new one produces no click).
  4. If a full re-render is kept for some panels, skip it while `document.activeElement` is inside the panel or while a pointer is down, and prefer a DOM-morphing approach (diff new HTML against live DOM) over wholesale replacement.
  5. Render only the visible tab/screen; hidden tabs get `content-visibility: hidden` or are not rendered at all.
  6. Put `contain: layout paint style` (or `contain: content`) on cards and panels that update, so a number change inside a card cannot trigger layout of the whole document; use `content-visibility: auto` + `contain-intrinsic-size: auto <row height>` on long list rows (market lists, inventory).
  7. Fixed-width numerics (`tabular-nums`, `min-width` in `ch`) prevent a changing value from changing the layout of its row.
  8. Animate only `transform` and `opacity`; never animate `height`/`top`/`width` for progress bars (use `transform: scaleX`).
  9. On `pause`/`visibilitychange` hidden: stop the render loop and the Pixi ticker, and compute offline progress from timestamps on resume instead of relying on timers continuing (timers are throttled to 1/s or 1/min; the branch name "offline-progress" suggests this exists already).
- Battery: a 4 Hz DOM update plus a continuously rendering WebGL canvas keeps both CPU and GPU awake. Opinion: render the Pixi map on demand (only when the camera moves or an animation is active), cap it at 30 fps when idle, and stop it entirely when an opaque HTML screen covers the map.
- 60 fps target applies to scrolling and to map panning, not to data refresh; a 4 Hz (or even 2 Hz) data refresh is perceptually fine for a sim as long as taps respond within the INP budget. Tap feedback (pressed state) must be immediate CSS (`:active`), not dependent on the next render tick.
- Test target (opinion): a 2-3 GB RAM Android Go-class phone with an older WebView, using Chrome DevTools remote debugging (`chrome://inspect`) Performance panel; watch for "Recalculate Style"/"Layout" blocks every 250 ms and for long tasks over 50 ms.

### Gaps
- No benchmark source was found comparing `innerHTML` replacement vs keyed patching specifically at 4 Hz on low-end Android WebViews; the recommendation is based on the general layout-cost evidence above, not a measured study.
- `requestAnimationFrame` being paused in hidden pages/backgrounded WebViews and the exact timer behaviour of a backgrounded Capacitor Activity (WebView timers may be fully paused by the OS/`onPause`) were not verified from a primary source this session (pointer: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).
- No source retrieved on PixiJS 8 specific guidance (render-on-demand, `ticker.maxFPS`, resolution/`devicePixelRatio` capping, WebGL context loss on Android when backgrounded).
- No data found on the distribution of Android System WebView versions in Turkey; WebView auto-updates via Play Store on Android 5+, but some low-end/Huawei devices lag, which matters for `content-visibility` (Chromium 85+), `dvh` (Chromium 108+) and the safe-area fix (Chromium 140+).
- web.dev's "optimize INP" sub-guides (yielding with `scheduler.yield()`, DOM size limits such as Lighthouse's ~1,400-node warning) were not opened.

---

## 5. Capacitor / WebView specifics

### Takeaway
On Android the main hazards are edge-to-edge insets (WebView versions below 140 report wrong `env(safe-area-inset-*)` values; Capacitor 8's SystemBars plugin works around it and injects `--safe-area-inset-*` variables), automatic system font scaling of px text, and the hardware back button (registering a `backButton` listener disables default behaviour, so the app must implement back/close/exit itself). On iOS the main hazards are the keyboard resize mode, the notch/home indicator, and Dynamic Type not applying by default.

### Cited Findings

**Safe areas, notches, edge-to-edge**
- Capacitor 8 ships a core `SystemBars` API for edge-to-edge layouts (legacy Status Bar plugin remains for older use cases). `insetsHandling` (Android only): `css` (default in v8), `native` (recommended; default from Capacitor 9), `disable` — [Capacitor SystemBars](https://capacitorjs.com/docs/apis/system-bars)
- "A bug in Android WebView versions below 140" means `env(safe-area-inset-*)` lacks correct values. With `native`: on WebView below 140 the WebView is padded and `env()` insets are 0; on 140+ the WebView follows the `viewport-fit` meta tag. `css` does the same and additionally injects `--safe-area-inset-*` CSS variables with correct values — [Capacitor SystemBars](https://capacitorjs.com/docs/apis/system-bars)
- With `viewport-fit=cover` the WebView becomes edge-to-edge and `env(safe-area-inset-*)` holds correct values to use as padding; `initialViewportFitValueHint: cover` (Android) reduces layout jumps; consider `EdgeToEdge.enable(this)` in `BridgeActivity.onCreate` (automatic from Capacitor 9) — [Capacitor SystemBars](https://capacitorjs.com/docs/apis/system-bars)
- Community guidance: read the injected variable first and fall back to `env()`, i.e. `padding-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))`; older third-party safe-area/edge-to-edge plugins can conflict with the built-in handling and should be removed; Capacitor 8 removed `android.adjustMarginsForEdgeToEdge` — [Capawesome edge-to-edge and safe areas guide](https://capawesome.io/blog/capacitor-edge-to-edge-and-safe-areas-guide/); [capacitor-community/safe-area](https://github.com/capacitor-community/safe-area)
- Forum reports: StatusBar `overlaysWebView` is buggy on Android 15 edge-to-edge; top/bottom UI overlap seen on Samsung S22/S23 with Android 15 — [Ionic forum](https://forum.ionicframework.com/t/top-and-bottom-ui-overlapping-on-android-15-samsung-s22-s23-devices/249536)

**Keyboard**
- Keyboard plugin `resize` (iOS only): `native` (default; resizes the whole WebView), `body`, `ionic`, `none`. `resizeOnFullScreen` (Android only) works around an Android bug where the keyboard does not resize the WebView when the app is full screen (status bar overlaid). `autoBackdropColor` (iOS, since 8.0.4) tints the area behind the keyboard — [Capacitor Keyboard](https://capacitorjs.com/docs/apis/keyboard)
- Events `keyboardWillShow`/`keyboardDidShow` provide `keyboardHeight`; on Android "will" and "did" fire almost simultaneously. `setAccessoryBarVisible` (iPhone only), `setScroll` (iOS only), `show()` (Android only), `hide()` — [Capacitor Keyboard](https://capacitorjs.com/docs/apis/keyboard)

**Back button and lifecycle**
- "Listening for this event will disable the default back button behaviour"; handler receives `canGoBack` (false on the first history entry); `App.exitApp()` "should only be used in conjunction with the backButton handler for Android"; `App.minimizeApp()` is Android-only; `disableBackButtonHandler` config and `toggleBackButtonHandler` (Android, since 7.1.0) — [Capacitor App API](https://capacitorjs.com/docs/apis/app)

**Haptics**
- `Haptics.impact({style})` with `ImpactStyle.Light/Medium/Heavy` (default Heavy); `Haptics.notification({type})` with `Success/Warning/Error`; `Haptics.vibrate({duration})` default 300 ms; `selectionStart/Changed/End`; on devices without Taptic Engine or vibrator the calls resolve without doing anything — [Capacitor Haptics](https://capacitorjs.com/docs/apis/haptics)
- "Include toggle/slider for any haptics" is a Basic game accessibility guideline — [GAG full list](https://gameaccessibilityguidelines.com/full-list/)

**Viewport height**
- `vh` does not change with the dynamic browser UI, so `100vh` elements bleed out of the viewport on mobile; `svh` (small, stable), `lvh` (large, equals legacy `100vh`) and `dvh` (tracks toolbar state) fix this — [web.dev viewport units](https://web.dev/blog/viewport-units)

**System font scaling**
- Android WebView auto-scales px font sizes by the system font scale; iOS needs the root font set to an Apple text style; see section 2 — [Ionic dynamic font scaling](https://ionicframework.com/docs/layout/dynamic-font-scaling)

### Inferences
- Layout shell (opinion): `html, body { height: 100% }` with the app root at `height: 100dvh` (fallback `100vh` first), internal scrolling panels with `overflow-y: auto`, and header/bottom-nav padded with `var(--safe-area-inset-*, env(safe-area-inset-*, 0px))`. In the web build `dvh` matters (URL bar); inside Capacitor the WebView has no browser chrome, so `100%`/`100dvh` equals the WebView height, but the keyboard changes it on Android.
- Bottom tab bar and keyboard: when an input is focused, hide the bottom nav and any banner so they do not sit on top of the keyboard-shrunk viewport, and call `element.scrollIntoView({block: 'center'})` on `keyboardDidShow`. Prefer steppers, sliders, "max"/quick-amount chips over free numeric typing for quantities and prices; use `inputmode="numeric"`/`"decimal"` and `enterkeyhint="done"`.
- Android back button contract (opinion): priority order is close open modal/sheet/select overlay, then go back one in-app screen, then from the root screen show an exit confirmation or `minimizeApp()` (minimising is friendlier for an idle/offline-progress game than `exitApp()`). Implement this as a single UI stack so the web build can mirror it with `history.pushState`/`popstate`.
- Haptics mapping (opinion): `impact Light` on primary button tap and tab switch, `notification Success` on a completed sale/production, `notification Error` on blocked actions; never on the 4 Hz tick; provide a settings toggle; treat as supplementary to visual feedback.
- Overscroll/pull-to-refresh and tap delay (standard CSS, not verified this session): `overscroll-behavior: none` on `html, body` (stops Chrome pull-to-refresh in the web build and scroll chaining from sheets), `touch-action: manipulation` on interactive elements (removes double-tap-zoom delay), `touch-action: none` on the Pixi canvas, `-webkit-tap-highlight-color: transparent` with a custom `:active` state, `user-select: none` on chrome but not on text the player may want to copy. Do not use `user-scalable=no` as the fix for tap delay; it blocks pinch zoom for low-vision users in the web build.
- Splash/loading: keep the native splash until the first HTML frame is rendered, then hide it from JS; show an HTML skeleton of the main screen before Pixi finishes loading textures, since WebGL init is the slowest part on low-end devices. Bundle all assets and fonts in the app so the game starts offline; for the web build, a service worker with a precache gives the same behaviour. Show a small persistent "çevrimdışı" indicator rather than blocking dialogs when server features are unavailable.
- Test matrix (opinion): Android 15/16 with gesture nav and with 3-button nav, a WebView below 140 and one at or above 140, a punch-hole device in landscape if landscape is allowed, iPhone with Dynamic Island, and iPhone SE-size (320-375 CSS px width; WCAG reflow is defined at 320).

### Gaps
- Capacitor docs pages for Splash Screen, Network, and the general Android/iOS configuration guides were not opened; splash/offline items above are opinion.
- `overscroll-behavior`, `touch-action: manipulation` and the 300 ms tap delay were not verified from MDN/web.dev this session (pointers: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior , https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action). iOS WKWebView rubber-band bounce behaviour and whether `overscroll-behavior` suppresses it on current iOS versions needs device testing.
- Android predictive back gesture (Android 13+) interaction with Capacitor's `backButton` listener was not researched.
- Exact Capacitor version in use by the project is unknown; the SystemBars notes above apply to Capacitor 8 (v7 and earlier use StatusBar plus `adjustMarginsForEdgeToEdge`). The claim that WebView below 140 returns wrong inset values comes from Capacitor docs; the underlying Chromium issue was not located.
- iOS keyboard `resize: native` vs `none`/`body` trade-offs for a fixed bottom nav were not found in a primary source.

---

## 6. Localisation: Turkish text, suffixes, plural rules, formats, preparing for English

### Takeaway
Turkish has only two CLDR cardinal plural categories (`one`, `other`) and a single ordinal category, but its agglutinative, vowel-harmonic suffixes make string concatenation with numbers and names error-prone: suffixes after digits and proper names take an apostrophe and change form with the last sound. Design strings so variables are not inflected, use `Intl` APIs for numbers/dates/plurals, and leave room for expansion in both directions.

### Cited Findings
- CLDR plural rules, Turkish: cardinal `one` (n = 1, including 1,0) and `other` (0, 2-16, 100, 1000, decimals such as 0,9 and 1,1); ordinal: only `other` (example "15. sağdan dönün."); range rules not available — [Unicode CLDR language plural rules](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html)
- CLDR plural rules, English: cardinal `one` (i = 1 and v = 0) and `other`; ordinal `one` (1st, 21st), `two` (2nd, 22nd), `few` (3rd, 23rd), `other` (4th...) — [Unicode CLDR language plural rules](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html)
- Turkish number format: "." as thousands separator and "," as decimal separator — [Onur Gumus, "Turkey test"](https://onurgumus.github.io/2021/01/23/Does-your-code-pass-the-Turkey-test.html)
- Turkish Language Association (TDK) rules as reported by secondary sources: suffixes after numerals are separated by an apostrophe (1985'te, 8'inci, 2'nci, 7,65'lik, 657'yle); case/possessive suffixes on personal and place names take an apostrophe, but derivational suffixes and the plural suffix do not (Türklük, Avrupalı); suffixes on institution/company/workplace names are NOT separated by apostrophe (rule change reported in 2016); abbreviations take an apostrophe (TBMM'nin) unless they end with a full stop — [Bianet on TDK rule](https://bianet.org/haber/tdk-kurum-isimlerinde-kesme-isareti-kullanimini-kaldirdi-179087); [SBU punctuation guide (PDF)](https://pdb.sbu.edu.tr/uploads/28a6a9a5-4519-eefc-23ac-3a0814c98a77/noktalama_saretler_ve_yazm_kurallar.pdf)
- Secondary sources conflict on whether institution abbreviations/names take the apostrophe; official TDK text should be checked — [Karar on TDK abbreviation rules](https://www.karar.com/hayat-haberleri/kisaltmalar-nasil-yazilir-kisaltma-ekleri-nasil-okunur-kurum-adlari-2036653)
- Text expansion: W3C i18n cites IBM figures: English source strings of up to 10 characters expand on average 200-300% when translated into European languages; relative expansion is lower for longer paragraphs — [W3C "Text size in translation"](https://www.w3.org/International/articles/article-text-size/index.en)
- Casing: `toLocaleUpperCase('tr-TR')` is required for i to İ and ı to I — [GitHub: tr-TR casing](https://www.github.com/aalpgiray/tr-TR-toLocaleLowerCase-and-toLocaleUpperCase)
- Layout guidance that supports localisation: let long text wrap rather than truncate, use `min-width`/`min-height` instead of fixed sizes — [Ionic dynamic font scaling](https://ionicframework.com/docs/layout/dynamic-font-scaling)

### Inferences
- Turkish grammar note for string design (general knowledge of the language): after a numeral the noun stays singular ("3 fabrika", not "3 fabrikalar"), so most Turkish count strings need no plural branching at all, while the English version will ("1 factory" / "3 factories"). Use `Intl.PluralRules` / ICU MessageFormat keys from the start (`{count, plural, one {# factory} other {# factories}}`) even though the Turkish variants are identical; do not build English plurals later by appending "s".
- Suffixes after variables are the main Turkish trap. The suffix depends on the final vowel and final consonant of the spoken form of what precedes it: "5'e", "6'ya", "3'e", "9'a", "10'a", "40'a", "100'e"; "Ankara'ya", "İzmir'e", "Bursa'dan", "Sinop'tan"; "%20'si", "%5'i". Options, best first (opinion):
  1. Rephrase so the variable is not inflected: label-value pattern ("Hedef: İzmir", "Miktar: 5", "Fiyat: 120 ₺", "Alıcı: Ahmet") instead of sentences ("İzmir'e 5 ton gönder").
  2. Put the suffix on a fixed noun after the variable: "5 adet ürünü", "İzmir şehrine", "{name} şirketine" (company names take no apostrophe under the reported TDK rule anyway).
  3. Only if sentences are required, write a suffix helper (vowel harmony + buffer consonant + consonant assimilation, with a table for how digits/number words end) and unit-test it; keep it Turkish-only behind the i18n layer.
- Turkish and English lengths differ per string in both directions: Turkish single words can be long (e.g. "Üretim kapasitesini artır" vs "Upgrade"), while Turkish button verbs are often short ("Sat", "Al", "Üret"). Since the game is designed Turkish-first, short Turkish labels will expand in English ("Sat" to "Sell", "Al" to "Buy", "Üret" to "Produce", "Depo" to "Warehouse"). Rule: no fixed-width buttons or tabs; allow 2-line wrapping in buttons; design tab bar for at least +100% on labels of 10 characters or fewer (W3C/IBM: 200-300% for very short strings); test with pseudo-localisation (e.g. expand every string by 40% and wrap with brackets).
- Formats: use `Intl.NumberFormat('tr-TR')` and `Intl.DateTimeFormat('tr-TR')` rather than hand-written formatting. Expected Turkish conventions: 1.234.567,89; dates dd.MM.yyyy; 24-hour time; percent sign before the number (%20) versus English 20%; currency symbol after the amount with a space in common usage (1.250 ₺), which `Intl` handles. Use compact notation for large sim values (`notation: 'compact'`: Turkish "1,2 Mn", "3,4 B" for thousand, "Mr" for billion), and note the false-friend risk that Turkish "B" means bin (thousand) while English "B" means billion; show full values on tap.
- Preparing for English: externalise all strings into a keyed dictionary now (no Turkish literals in render functions), never concatenate sentence fragments, use named placeholders, keep locale-specific casing/sorting in helpers (`localeCompare(…, 'tr')` for sorting so ç, ğ, ı, ö, ş, ü order correctly), store dates/numbers as raw values and format at render, avoid text in images/sprites (also an XAG 102 rule), and set `lang` on the root dynamically. Icons with text labels survive expansion better than text-only buttons.
- Proper names inside the game world (Turkish city names, the title "Tezgâh" with circumflex) should remain Turkish in the English build; make sure the chosen font and any uppercase transformation handle them under `lang="tr"` spans.

### Gaps
- The official TDK spelling guide (tdk.gov.tr "Yazım Kuralları: Kesme İşareti") was not opened directly; apostrophe rules above are from news and university summaries, with one noted conflict.
- No Turkish-specific expansion/contraction ratio (EN to TR or TR to EN) was found from an authoritative source; only the general W3C/IBM table for English into European languages, of which only the first row was retrieved.
- `Intl.NumberFormat('tr-TR')` outputs (percent placement, compact abbreviations "B", "Mn", "Mr", currency placement) were not executed/verified this session; they should be checked in the target WebView versions since CLDR data differs by engine version.
- No source found on game-industry practice for handling Turkish suffixes in templated strings.

---

## 7. Mobile ad placement (banner / rewarded) under Google AdMob policies

### Takeaway
AdMob's guidance for a UI-dense game points toward avoiding persistent banners next to navigation and on constantly interacted screens, and toward rewarded ads as the main format: strictly opt-in, with a clear disclosure of action and reward, no penalty for declining, and in-app non-transferable rewards only.

### Cited Findings

**Banner ads (AdMob "Discouraged banner implementations")**
- "Close proximity of banner ads to other elements within an app is one of the biggest causes of accidental clicks." — [AdMob Help: banner ad guidance](https://support.google.com/admob/answer/6128877?hl=en)
- Banners should not be placed next to interactive navigation (e.g. a next button or custom menu bar), nor beside interactive content (e.g. a chat text box, gallery images), nor on gameplay screens where users are constantly interacting with the app — [AdMob Help: banner ad guidance](https://support.google.com/admob/answer/6128877?hl=en)
- Applies to all banner sizes (examples use 320x50). Not following the guidelines "may lead to invalid activity and/or may result in Google disabling ad serving to your app"; some discouraged placements are not policy violations in themselves but Google may still act on resulting invalid activity — [AdMob Help: banner ad guidance](https://support.google.com/admob/answer/6128877?hl=en)

**Rewarded ads (AdMob rewarded ads policy)**
- Rewarded ads (other than rewarded interstitial) "must only be served after a user affirmatively and unambiguously opts in"; rewarded interstitials instead need an intro screen with a visible, usable "no" option and enough time to choose it; declining or skipping must not disrupt normal use of the app — [AdMob Help: rewarded ads policy](https://support.google.com/admob/answer/7313578?hl=en)
- Before each ad there must be a "clear, accurate and conspicuous disclosure of the action(s) required and reward(s) offered"; bundled ads must disclose how many are required; icons alone are acceptable only if clearly understandable — [AdMob Help: rewarded ads policy](https://support.google.com/admob/answer/7313578?hl=en)
- "Direct monetary items may not be offered as rewards under any circumstance"; rewards must be redeemable only within the publisher's app and be non-transferable; random rewards allowed only if the chance is disclosed, all outcomes (including no reward) are accessible, and the chance is greater than 0 — [AdMob Help: rewarded ads policy](https://support.google.com/admob/answer/7313578?hl=en)
- Users must not be obliged to interact with (click) the ad; the prompt may contain text/icons only to describe the reward, not to steer the choice; publishers must deliver the promised reward and must not imply Google verifies or endorses rewards — [AdMob Help: rewarded ads policy](https://support.google.com/admob/answer/7313578?hl=en)

### Inferences
- Tezgâh is almost entirely "screens where users are constantly interacting" (lists, forms, a bottom tab bar). A persistent anchored bottom banner directly above or below the tab bar is precisely the "next to a custom menu bar" pattern AdMob discourages. Opinion: skip persistent banners; if a banner is used, restrict it to low-interaction screens (offline-earnings summary, season results, statistics) and separate it from any tappable element with a non-interactive spacer and a visible "Reklam" label area.
- If a native banner overlay is used in Capacitor, it is drawn above the WebView: reserve its height in the layout (CSS variable set from the plugin's size-changed event) plus the safe-area inset, so it never covers the bottom nav, a focused input or a toast (also WCAG 2.4.11 Focus Not Obscured), and hide it while the keyboard is open.
- Rewarded-ad UI pattern (opinion, mapped to the policy): a clearly labelled button with a video icon and explicit text such as "Reklam izle: +2 saat üretim" (action + reward), a confirmation step or dedicated card (opt-in), an equally visible way to decline, the reward granted only on the SDK's reward callback, and no nagging pop-ups after declining. Suitable rewards: doubling offline earnings, speed-ups, in-game currency (in-app, non-transferable). Not allowed: anything convertible to real money or transferable to other players; note the design doc mentions trading/cooperatives, so ad-earned currency that can be transferred between players may conflict with the "non-transferable" requirement and should be reviewed.
- Accessibility interplay: rewarded-only speed-ups create pressure on players who cannot comfortably watch video ads; keep core progression achievable without them and make the rewarded button reachable by screen readers with a full label.
- Ads cost main-thread and network time in the WebView process; load rewarded ads in advance during idle moments and never trigger an ad load inside a tap handler that also re-renders UI (INP).

### Gaps
- AdMob gives no numeric minimum distance (px/dp) between a banner and interactive elements on the pages read; any specific spacing figure in the final report would be opinion.
- Pages not opened: AdMob interstitial guidance (placement between natural breaks, no interstitial on app launch/exit), Google Play Families/ads policy, Play "disruptive ads"/Better Ads Experiences rules for apps, consent requirements (EU UMP/GDPR, Turkish KVKK, Apple ATT). These matter before shipping ads.
- Publication/last-updated dates of the two AdMob help pages were not visible in the retrieved content.
- No research done on the Capacitor AdMob plugin (`@capacitor-community/admob`) API (banner positioning, margin, size-changed events) or on ad behaviour in the plain web build (AdMob is app-only; the web build would need AdSense/H5 Games Ads, with different policies).
