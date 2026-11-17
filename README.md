# Vice Atlas

Independent GTA VI field guide with parallel English (/en/), Spanish (/es/), Brazilian Portuguese (/pt-br/), German (/de/), French (/fr/) and Italian (/it/) editions. The public/ directory contains the shared frontend and assets. A Vinext Worker serves optional ChatGPT sign-in and private D1-backed progress. Run npm run dev for local development; npm run build creates dist/server and dist/client for Sites publication.

## Current content
Research snapshot: November 13, 2026.
- 21 vehicle dossiers, 13 weapons/gear entries, 7 shops/activities, 8 character profiles.
- Expanded design-influence, identity, acquisition, terrain/use and performance-evidence sections; side-by-side vehicle and firearm comparisons.
- 16 player guides, 12 UFO/alien case files, 10 Leonida editorial sections, 138 official screenshots.
- 11 music releases/trailer tracks with cover artwork and listening links, plus 6 official radio previews.
- Regional launch countdown using Rockstar Support’s November 19, 2026 local-midnight schedule.
- Community report drafts with copy/download and shared browser-local drafts. No report submission service or Discord server is configured.

## Languages and continuity
All six editions have separate data and editorial bundles. They use the same components, stable record IDs and browser-storage keys. The language switch preserves the route and selected map marker. Notes, saved entries, found markers and contribution drafts persist across languages on the same browser and origin. UI phrases use the curated dictionary in scripts/ui-<locale>.json, not an external translation service. Proper names and source publication titles remain unchanged.

## Map
The map contains 3,401 GTADB landmark records and 41 linked catalog records: 3,442 records, 3,315 positioned. The M1A-style rifle dossier is searchable without invented coordinates. Category counts represent documented records, never game-wide totals. Empty categories are a planning taxonomy, not confirmation of a feature.

There are 130 categories, specific vector icons, grouped filters, per-location notes, saved/found progress, shared-marker links and game/real-world comparison photographs where the source collection provides them. Colors identify categories, while a checkmark independently indicates found status. The palette draws on State of Leonida’s category semantics; that map also supports user and record-level overrides, so color is not a universal confidence or rarity scale.

The 8,830 local Yanis V17 tiles cover native levels 0–5. Pixel-density-aware zoom stays within available source detail and maintains square proportions. This is finite-resolution raster artwork, not an infinite-resolution vector map. Map data and reference photos are attributed to GTADB contributors under CC BY 4.0, revision 6acc1b555ed68255078b850f5d4a984610fa1910. State of Leonida also uses GTADB, so agreement is not independent corroboration.

## Evidence and design
Confirmed benefits, screenshot sightings, community identifications and historical game information remain distinct. Unpublished GTA VI top speeds, damage, accuracy and repeatable spawns are not invented or borrowed silently from GTA Online. Terrain guidance is explicitly a design-based inference. UFO history does not imply a confirmed GTA VI encounter.

Sources are collected in the Sources & Credits section. Asset origins are recorded in asset-sources.json. The welcome artwork is Rockstar’s Jason and Lucia Rooftop. No music files are hosted. Fixed Pricedown outlines supply title and primary-button artwork; glyphs are rendered individually to remove contextual bottom extensions and preserve Spanish and Portuguese accent clearance. The font program is not distributed. Outfit is the supporting type.

## Revision 12
- The State of Leonida hero, raised introduction and matching warm-white headlines.
- Four visible navigation choices with native Catalog/Explore dropdowns; no redundant header search or hamburger. Guest Sign in, account-only header saves.
- Italian content, UI, heading artwork and route, with English, Spanish, Portuguese (Brazil), German, French, Italian ordering.
- Linked-coordinate records focus at maximum native detail with one highlighted pin. Unpinned records hide unrelated markers and show either an approximate named search area or an explicit pending-position state. No fabricated exact spawns.
- 36 guest and 18 account-responsive checks, dropdown keyboard/click checks, 13 Italian route checks, four backend tests and cross-language save/selection checks. Details: research/revision-12-audit.json.

## Earlier validation
- JavaScript syntax checks passed for every top-level script.
- 26 desktop language/route checks passed with correct page language, no horizontal overflow, no runtime errors and no failed local asset responses during the route sweep.
- 16 phone language/route checks passed without horizontal overflow at 390px.
- The map language switch preserved selected marker L266, location notes, saved status and found status.
- Spanish category search and catalog filters worked; saved catalog items survived language switching.
- Side-by-side vehicle selection and Spanish firearm comparison rendering passed.
- Spanish report download and cross-language draft restoration passed.
- Earlier source-resolution, tile-density, gallery and progress-export checks are retained in work-checkpoint/evidence; the new language checks are separately named bilingual-*.

## Maintenance
Edit all three language bundles together. Regenerate title outlines with scripts/render-lettering.cjs, passing a locally licensed font path and the canvas package path. The external font is deliberately absent from source. Keep evidence URLs in content data, update the central credits, retain canonical IDs and option values, and rerun checks for affected routes.


## Revision 7 — map, money and regional exploration

- Map room is the primary homepage action; the new bilingual money guide is secondary.
- The official Jason and Lucia pursuit screenshot replaces the previous cover.
- Six regional galleries include 61 official 3840-pixel images, thumbnail navigation, arrows, touch gestures and enlarged viewing; reduced motion is respected.
- All 21 existing vehicle profiles and eight weapon profiles have fuller influence and visual-detail research. Published reference specifications remain clearly distinguished from tested VI performance.
- Seven earning methods, a practical planning section and a user-input profit calculator are available at #money.
- Detail dialogs now provide language controls, retaining the current entry.
- Review coverage and access limits are recorded in research/revision-7-audit.json.


## Revision 8 — balanced hierarchy and complete HD browsing

- Shared page, section and card title scales; secondary labels remain legible on desktop and phone in both languages.
- Official rooftop artwork, prominent Leonida script sign and synchronized hero/home/map countdowns.
- All138 official gallery screenshots have3840px images and onsite arrow, keyboard and swipe navigation.
- Access-first catalog cards, dossiers and comparisons; verified mission place/giver/edition and friendly release checklist for exact triggers.
- Isolated native-detail map focus, persistent label, compact detail panel, recenter and nearby controls.
- Six additional money briefings and a five-category expense calculator.
- Validation:14 scripts;26 desktop and26 phone language/route checks without overflow, runtime errors or missing local assets;138 HD assets verified.
- See research/revision-8-audit.json and research/market-language-research-2026-11-13.json for evidence and limits.

## Revision 9 — Brazilian Portuguese

- Complete Portuguese catalog, dossiers, guides, Leonida narratives, music, UFO cases and interface at /pt-br/.
- Three-language menus preserve the current map pin, open dossier/gallery and shared browser progress.
- Portuguese title artwork, dates, number formatting and Brazilian countdown timezones.
- Header layout now fits phones, tablets and smaller laptops in all three languages.
- Validation:17 scripts,14 desktop routes,14 phone routes,41 dossiers, localized search/filter/calculator and cross-language continuity.
- Market research distinguishes regional demand signals from unverified country player and preorder totals; Russian remains a later candidate.

## Optional account saves
Public browsing remains open. ChatGPT sign-in is provided by Sites; there is no separate password database. /api/atlas/progress authorizes every read and write against the authenticated site-scoped user ID. D1 stores only saved IDs, notes, found/saved map markers and a report draft. Updates use optimistic revisions and a three-way client merge for independent edits from multiple devices. Same-origin writes require a custom header. Guests retain browser saves, and JSON backup export/import works without an account. Sign-out restores the guest collection. Cloud-save deletion is explicit and leaves the local copy available.

Apply the schema-only migration in drizzle/ for local preview using the starter D1 workflow. Sites applies hosted migrations during publication. Do not include local .wrangler data or account-test fixtures in a release.

Run node --test tests/account-progress.test.mjs for auth, isolation, validation, conflict and merge checks. Browser QA used the Sites local sign-in fixture; the hosted ChatGPT authorization flow remains platform-managed.
