# Revision 24 — catalog and map

Owned implementation: public/revision24-catalog-map.js, public/revision24-catalog-map.css, and scripts/revision24-browser-audit.cjs.

## Confirmed checklist coverage

- **7 — Map palette:** All previous pink category presentation colors are mapped to cyan, blue, teal, muted lime and warm amber. MAP_CATEGORIES retains its category names, grouping, icons and record identity. Its color tuple component is updated before app render, so marker, filter icon, result icon and icon-key colors agree. Existing rendered pin/category/result inline colors also receive the same mapping. Scoped rules cover clusters; selected/found pins; focused-location ring; selected, hover and keyboard states; checkboxes; map controls; location detail panels; scrollbars; attribution and search. Persistent data and storage keys are untouched.
- **8 — Map heading and layout:** .map-heading h1 and the browser title use the exact localized “Map of the state of Leonida.” The smaller eyebrow reads “ViceFolio / Leonida” (localized state name in Russian), avoiding duplicate visible copy. Page title ends in ViceFolio. Map coverage copy refers to ViceFolio, with all seven locales supplied. Topline, countdown and controls use a compact responsive grid; the expand/focus/filter/reset handlers remain the original handlers.
- **12 — Vehicle dossiers:** #dialog-content .r24-vehicle-dossier is applied only when the item gallery identifies a vehicle in ATLAS.catalog. Location/access and overview cards share surface, border, radius and padding. At a glance, performance, behind-the-details and history spacing are tightened. Only the two explicitly selected standalone p.evidence-note strings are removed, using 14 exact localized strings. Every other note, awaiting-release statement, fact, map button, compare button, reference and history item remains.
- **14 — Equipment:** On the items route, removes only #main .catalog-evidence and #main .catalog-compare-link. Existing dossier compare controls and comparison implementation remain. Hero retains the existing official HD Jason rifle image (assets/hd/photo-12.webp), with a quieter right-side gradient, right-aligned copy area and distinct Browse equipment CTA. Tabs, toolbar, metadata and category headings have smaller gaps. On mobile the image stays above the copy to preserve the subject and keep controls readable.
- **15 — Characters:** Changes are confined to .cinematic-people.r24-people-hero. Hero copy moves to the right of both faces on wide screens. At mobile widths it sits below the visible portrait area. Character cards and detail dialogs are untouched.

## Integration and checks

- Requires ViceRev24 core to load first, then this JS before app.js. CSS should load after prior revision CSS.
- Registry name: catalog-map. No new observers, timer loops, event listeners or render-function overrides.
- Every DOM change is conditional/idempotent. No HTML, shared source, build, Git or publishing changes were made.
- JavaScript parsed successfully with node:vm.Script.
- All 14 exact removal strings were read directly from the current English/localized source files.
- Hero images were visually reviewed at full resolution.
- Browser QA completed in headless Chrome against the integrated local preview: world, vehicles, items and people at 1440, 390 and 320px. No runtime JavaScript errors, document overflow or broken loaded images.
- All seven locales checked at 320px on world, vehicles (including the Cheetah detail dialog) and items: 21 passing route/locale combinations. Localized map titles and tab labels verified.
- Functional map checkbox toggling changes the enabled category count from 131 to 130, then restores it. Expand/exit works at every tested width. Equipment gear/services/weapons tabs work. Vehicle compare control, six data rows and awaiting-release text remain.
- Screenshot review prompted uniform text tabs, reduced search input padding and removal of the legacy At a glance toolbar margin; desktop and narrow refresh checks pass.
- Browser contexts use reduced motion. Existing unrelated pending regions asset requests produced initial aborted-request entries; no catalog/map asset failures were observed.
- Outputs: qa-revision24/catalog-map-results.json (12 width/route cases), catalog-map-refresh-results.json (post-refinement desktop), catalog-map-all-locales.json (21 locale/route cases), plus named screenshots.

## Scope and limitations

Global legacy “My Atlas” labels outside the map are not owned by this module. Map title conversion uses the shared protected text-title helper rather than an obsolete map-room SVG. The baseline exposes only one actual heading element in the map topline; parent approved using the full requested title for the h1 and browser title, with a shorter branded eyebrow.
