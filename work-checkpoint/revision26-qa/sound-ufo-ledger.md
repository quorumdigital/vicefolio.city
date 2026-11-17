# Revision26 Soundtrack and X-Files verification

Local preview: http://127.0.0.1:4173/en/

Each bounded change was followed by a rendered screenshot and relevant interaction or layout check before proceeding. This is local verification, not a publication claim. Recheck if parent-owned shared styling changes again, then verify the published site.

## Item 61 — verified-local

- Removed only the music CTA arrow; waveform icon and readable label retained
- Gradient/border/depth retained
- Existing hero heading duration stays 1.4s
- Actual click reaches listening room

Evidence: `sound61-hero-desktop.png`, `sound61-hero-mobile.png`.

## Item 62 — verified-local

- Calendar removed from hero; hero artwork unobstructed
- 310px right-side content panel at 1440px; no overlap with Justice banner
- Mobile stacks below banner with readable single-column release rows
- Content/date/links retained; calendar scrolls normally with content

Evidence: `sound62-calendar-desktop.png`, `sound62-calendar-mobile.png`.

## Item 63 — resolved-optional

Retain the liked calendar without an extra December countdown; user offered countdown as optional alternative. No release-date changes introduced.


## Item 64 — verified-local

- Corrected generated sleeve visibly says only PUSHER above VI; no Original Score by Justice title remains in artwork
- Removed bottom Pusher overlay and disabled historical reinsertion in revision 24-music.js
- Desktop/mobile inline cover decodes at 1254×1254; actual artwork button opens corrected original PNG
- Justice feat. Gesaffelstein attribution and all 18 Music source links preserved
- Removed obsolete Official release artwork label; localized title-adaptation provenance is visibly available inside actual Credits Music disclosure

Evidence: `sound64-pusher-desktop.png`, `sound64-pusher-mobile.png`, `sound64-pusher-fullresolution.png`, `sound64-pusher-credits.png`.

## Item 65 — verified-local

- 2.4s directional drift from 64px left with a restrained vertical float
- Measured opacity/transform during real page-load motion; finishes fully visible and stationary
- Reduced motion disables animation and exposes copy immediately
- Lower archive reveal code untouched

Evidence: `ufo65-motion-start.png`, `ufo65-motion-middle.png`, `ufo65-motion-end.png`.

## Item 66 — verified-local

- Eyebrow, title image, paragraph and button share measured center 316.78px at 1440px
- Open Case Files has no arrow; styled button retained
- Actual button click reaches #ufo-files
- Mobile hero copy moves beneath artwork and remains centered/readable without overflow

Evidence: `ufo66-centered-desktop.png`, `ufo66-centered-mobile.png`.

## Item 67 — verified-local

- Removed the below-button original-illustration text
- Strange skies / Hidden encounters / Unsolved stories preserved
- Topics-to-button gap reduced to 10px
- Introductory paragraph above button retained
- Desktop/mobile visible group checked

Evidence: `ufo67-compact-desktop.png`, `ufo67-compact-mobile.png`.

## Item 68 — verified-local

- Displayed crop removes 165px top band containing GTA V logo
- Michael head/minigun and alien remain visible
- Native aspect ratio preserved; original asset retained
- Desktop/mobile crop inspected

Evidence: `ufo68-michael-crop-desktop.png`, `ufo68-michael-crop-mobile.png`.

## Item 69 — verified-local

- Long source figcaption removed from Michael picture
- Michael/alien image remains clean and uncropped by overlay text
- Original TechTudo/ScreenRant/Rockstar credit retained in expanded Credits imagery group
- Actual Credits disclosure opens and shows working original hrefs

Evidence: `ufo69-clean-michael-desktop.png`, `ufo69-clean-michael-mobile.png`, `ufo69-credits-desktop.png`.

## Item 70 — verified-local

- Desktop case height reduced from 820.75px to 466.75px
- Map image remains native 16:9 before left-half clipping; no stretching
- Relevant left map stays visible at 294×330.75px desktop and 284×319.5px mobile
- Added accessible full-resolution image opener and verified actual modal opens original map source

Evidence: `ufo70-breakwater-desktop.png`, `ufo70-breakwater-mobile.png`, `ufo70-map-fullresolution-desktop.png`.

## Item 71 — verified-local

- Compared 13 unchanged lower sections/cards with revision 26-sound-ufo disabled: text, images, grid columns and transition timings identical
- Actual GTA V filter returns 6 matching cases; GTA VI returns 1 matching case; All files restores 12
- Existing lower reveal implementation retained
- No page JavaScript errors during interactions

Evidence: `ufo71-preserved-archive-desktop.png`.

## Integration — verified-local-current-shared-styles

- Music: one calendar outside hero; original 1.4s title motion and waveform CTA retained; no horizontal overflow at 1440px
- X-Files:2.4s title motion, centered eyebrow, no below-button credit, no Michael figcaption; no horizontal overflow at 1440px

Evidence: `sound-integration-hero-desktop.png`, `ufo-integration-hero-desktop.png`.

## Files changed

- `public/revision26-sound-ufo.js`
- `public/revision26-sound-ufo.css`
- `public/revision24-music.js`: removed only the obsolete Pusher bottom-label insertion.

Pusher assets were supplied by the artwork agent. No source edits to dossiers.js and no publication.
