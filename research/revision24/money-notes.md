# Money Guide — confirmed revision 24 items 9, 10 and 13

Implemented in public/revision24-money.js and public/revision24-money.css. Load JavaScript after revision24-core.js and all original page modules, before app.js; load the stylesheet after the original stylesheets. This is an idempotent post-render enhancement registered as ViceRev24.register('money', enhance).

## Item 9 — hero and protection composition

- .cinematic-money becomes .r24-money-hero and receives the former lower artwork, assets/hd/photo-46.webp. The source was visually inspected: Jason and Lucia carry bags through a firelit warehouse. No new or altered image was produced.
- The page h1 combines Keep the take with Getting paid is only half of it. in a deliberate two-level composition. All new strings, including image alternative text, have explicit en, es, pt-br, de, fr, it and ru entries.
- An ordered .r24-money-flow emphasizes Escape / Sell the loot / Deposit the cash. The hero paragraph reuses the existing localized cashSafety.sellBody text rather than adding claims.
- The original [data-scene-scroll="money-opportunities"] button remains functional, with the localized Explore earning routes label and a new warm primary treatment.
- The existing #world?scope=money-fences anchor moves from the lower feature into the hero as the smaller .r24-money-map action. It has a compact localized Find buyers on the map label.
- The lower .money-protect-scene is removed. Its #money-protection ID moves to the hero so existing [data-money-selling] controls continue to open the rules tab and scroll to a valid anchor.
- At 760px and below, the complete 16:9 source art sits above the copy rather than behind it. The desktop composition reserves the right side for Jason and the money bag.

## Item 10 — shared panels and earning route entry

- The existing .money-chapter-nav is moved immediately after .cash-safety. All cash-safety children are retained as live DOM nodes; no inputs or listeners are recreated.
- .cash-safety remains outside every [data-money-pane] and visible for all three tabs. The original tabs still control only the existing content panes.
- The original localized hero introduction moves to #money-opportunities .section-heading. Its title becomes the localized Explore earning routes.
- Tab arrow keys, Home and End move focus and activate the existing buttons. Selected tabs receive tabindex=0; others -1. Mouse activation updates tabindex after the original delegated handlers run.
- Baseline observation: the current cash-safety contains the Carry Limit note and carried/banked balances, but no interactive carry calculator exists in money-guide.js or other current page modules. The enhancement preserves the full block, so any separately attached controls remain intact.

## Item 13 — opportunity presentation

- .money-opportunity keeps all original [data-money-method] buttons and .money-map-link URLs.
- .opportunity-title h3 uses the existing localized method title, enlarged to 28–39px with responsive wrapping.
- Summary copy is enlarged to 15–17px with 1.75 line height.
- Each .opportunity-copy gets a dim, blurred atmosphere from its own existing card image through --r24-opportunity-art. No new content images or facts are introduced.
- Approach actions use warm peach borders and a restrained glow on hover; map actions use a secondary blue treatment. Focus-visible states and reduced-motion overrides are present.
- Desktop cards continue alternating image sides; narrow layouts put the image before the text.

## Verification completed

- JavaScript parses via node:vm Script.
- Locale completeness check: all 11 new copy keys exist and are nonempty for all seven locales.
- Source art inspected directly.
- Static ownership check: only the two new public files and this note were authored by the Money Guide agent.

## Integration/browser verification for root

Check 320px, tablet and desktop rendering; all seven locales; three tab states with the shared cash panel still visible; ArrowLeft/ArrowRight/Home/End; earning-route scroll from another tab; open/close a method dialog; final-step selling action; map scope navigation. Confirm that shared applyHeadingArt() skips .r24-title (title-system.js already does) so later dialog localization cannot reintroduce word art into the new section title.

## Integrated browser QA

Headless Chrome completed 66 checks against http://127.0.0.1:4173: English at 1440, 390 and 320px; Spanish, Brazilian Portuguese, German, French, Italian and Russian at 390px. No JavaScript errors, failed local requests, broken visible images, horizontal overflow or dialog overflow were found. Tabs expose only the intended content panes while the cash panel remains visible before the tabs. Keyboard End/Home activation, method dialogs, the selling return action, the earning-route scroll action and the buyers map scope all pass.

QA found and fixed one integration defect: locale.js prefixes anchor hrefs before the enhancement runs, so the transferred map CTA now matches the href suffix rather than an exact unprefixed hash. Screenshots and detailed results are in workspace qa-revision24/money-*.png and money-results.json.
