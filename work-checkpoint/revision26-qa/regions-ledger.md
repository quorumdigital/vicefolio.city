# Revision26 Regions verification ledger

Implemented by Regions owner. Local browser verification completed against the currently integrated preview. Final shared-style/background integration and published-site recheck remain required. No publication performed.

## Files changed
- public/revision26-regions.js
- public/revision26-regions.css
- public/revision24-regions.js: only anchor scroll behavior smooth -> instant
- public/exploration.js: only direct region init scroll behavior smooth -> instant
- No dossiers.js changes: relocated photo credits are supplied by the scoped r26 module on Credits.

## Verified request details
| Item | Details checked | Evidence |
|---|---|---|
|47|Root-provided English state-integrated-en-v26.svg appears in Regions; i-dot replacement matches Home shared asset; enlarged script remains intact. Other six localized assets preserved.|regions-hero-desktop.png; regions-locales-check.json|
|48|Title enlarged from572px to680px at1919 viewport and moved upward into upper-right sky; no clipping; desktop/laptop/tablet/phone checked.|regions-hero-desktop.png; regions-hero-1280.png; regions-hero-768.png; regions-hero-phone.png|
|49|Supporting copy/action group separately positioned lower-right over water; small island and entire airplane unobscured on desktop/laptop. Phone copy clear of visible wing; smallest German labels adjusted to stay side by side.|regions-hero-desktop.png; regions-hero-1280.png; regions-hero-de-phone.png|
|50|Explore primary is Vice City pink with border/depth/hover; Map room remains secondary; both arrows removed; hero Explore real click instant-jumps correctly.|regions-hero-desktop.png; regions-interaction-check.json|
|52|All6 real region clicks sampled over6 frames desktop and3 frames phone: unchanged scrollY from first sample, focus assigned, eyebrow at header+20px. Hero Explore tested. Direct Ambrosia URL also stable and visible; original deep-link target offset retained.|regions-jump-check.json; regions-interaction-check.json|
|53|Field-note/UFO actions and Catalan Bay map action now clear bordered pink surfaces with hover/focus and44px minimum height; all region CTAs arrowless. Real UFO/map clicks reach correct destinations. Existing unknown-photo map links stay hidden.|regions-buttons.png; regions-locales-check.json; regions-interaction-check.json|
|54|Real-Life Connections now pink, no longer cream; supporting eyebrows blue/body neutral.|regions-connections-pink.png|
|58|Source-only plain-arrow rows removed from comparison endings, context notes and Connections header. Useful map actions retained as buttons.|regions-ending.png; regions-interaction-check.json|
|59|Full game/photo attribution plus Providence Canyon/Georgia DNR, Everglades/NPS, GTADB and CC BY4 links retained in localized Region photography Credits accordion. Existing world research sources remain in Credits. Useful location captions and concise visual-parallel caveat preserved.|regions-credits.png; regions-credits-phone.png; regions-interaction-check.json|
|60|Final content-to-footer gap reduced to68px desktop; duplicate footnote, attribution paragraphs and source rows removed without blank spacer. Footer and final comparison intact.|regions-ending.png|

## Responsive and interaction notes
- 1919x1080,1280x900,768x1024,390x844,320x740 checked.
- Existing1vw horizontal overflow at1280/768 came from old blurred region-chapter pseudo-background extending6vw outside90vw content. Disabled that superseded background; rechecked overflow0. New root shared palm atmosphere remains separate.
- EN,ES,PT-BR,DE,FR,IT,RU desktop checked; no overflow or CTA arrow suffixes. DE320 long-label layout visually fixed and checked; ES320 Credits checked.
- Reduced-motion title visible with animation:none and transform:none.
- JavaScript parse checks passed for all3 modified script files.

## Remaining integration gates
- Recheck shared palette/button styles after root finalizes them.
- Recheck unified palm backdrop through Regions ending and Credits.
- Final deployed verification belongs to root; do not infer publication from local screenshots.

## Shared integration recheck
- Read-only check after root shared JS/button/wordmark integration: no regressions found.
- Desktop1919 and phone390: hero placement preserved, primary still pink, secondary distinguishable, Connections pink, CTA arrows absent, no horizontal overflow or page errors.
- All6 actual region clicks on both devices remain instant across5 sampled animation frames, with focus preserved and header+20px landing.
- Regions ending still has0 duplicate/source rows and compact68px desktop/60px phone footer gap.
- Credits accordion retains all5 correct source/license URLs and full attribution; readable desktop/phone presentation verified.
- Evidence: regions-shared-check.json and regions-shared-*.png.
- Unified background asset was still pending at this check; that integration and publication remain open.

## Palm background and title palette integration recheck
- Read-only desktop1919 and phone390 check: unified palm atmosphere clearly visible below the opening hero and through the final comparison/credits; text remains readable. Hero scene, lettering geometry, separate lower copy/buttons, plane/island clearance and compact ending preserved. No horizontal overflow on Regions or Credits.
- Credits still retains all5 source/license links and full attribution; desktop/phone screenshots visually inspected.
- Background integration passes. New shared-arrow regression discovered during this wider view: all12 `.region-gallery button[data-gallery-step]` have empty innerHTML and appear as empty bordered squares. Root notified; this interaction presentation remains open pending root repair.
- Evidence: regions-palms-check.json and regions-palms-*.png. No source edits or publication during this check.

## Carousel integration repair verification
- Root shared repair verified through actual Next image and Previous image clicks on desktop1919 and phone390. Image advances photo-113 -> photo-114 and returns to photo-113.
- All12 carousel step buttons now have visible localized labels, no arrows/empty squares. Screenshots inspected: clear bordered controls and readable labels.
- Overflow0 on desktop1919, phone390 and narrow German320; German labels wrap into a clean second control row without clipping.
- Evidence: regions-carousel-fixed-check.json and regions-carousel-fixed-{desktop,phone,de320}.png. Prior empty-button finding is resolved.
- All local Regions/Credits integration gates now pass. Final deployed verification remains root responsibility.
