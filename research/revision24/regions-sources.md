# Regions — revision 24 implementation and sources

Reviewed 2026-11-14. Module implementation supplied by the regions agent, written and validated through the radio agent after its tool transport failed.

## Sources and selected comparisons

- Official six-region source: https://www.rockstargames.com/VI/only-in-leonida .
- Game canyon: existing photo-135, Mount Kalaga National Park 04, Rockstar Games. Real counterpart: Georgia Department of Natural Resources, Providence Canyon, https://gastateparks.org/Providencecanyon . Exact image: https://gastateparks.org/sites/default/files/parks/locationslideshow/ProvidenceCanyon.jpg . Preserved 1400×450 original panorama, WebP quality 76, 192,216 bytes.
- Game wetland: existing photo-131, Grassrivers 04, Rockstar Games. Real counterpart: NPS Nine Mile Pond at water level, https://www.nps.gov/ever/index.htm . Exact image: https://www.nps.gov/common/uploads/structured_data/3C854681-1DD8-B71B-0BA4F6D9379336DF.jpg . NPS Photo. Preserved 1108×831, WebP quality 76, 96,536 bytes. Chosen after visual inspection over the initially proposed aerial Sawgrass-to-Florida-Bay photograph, because its low viewpoint, water, reeds and horizon are closer to the game composition. Not upscaled.
- Both comparisons are editorial visual parallels, not Rockstar-confirmed one-to-one inspirations. Labels state In GTA VI / In real life with credits and full-image/source links. Different framing and time of day are visible; the prose describes landscape comparisons rather than exact recreations.
- Bay lead reuses existing photo-22 and source data. Source spelling is Catalan Bay (map L1500), whereas the confirmed request/checklist called it Catlin Bay. Preserve source spelling. County/road material and its source records reuse existing seven-locale EXTRA_DATA.
- Community geography: https://github.com/rolux/gtadb.org (GTADB.ORG & contributors, CC BY 4.0).

## Exact map targets verified

All seven IDs were checked in public/map-data.json and have finite xy coordinates: L456 Vice City Sign; L325 The Rusty Anchor; L625 Grassrivers Visitor Center; L304 Starlet Motel; L832 Ambrosia Police Department; L1341 Canyon; L1500 Catalan Bay. Existing VICE_PHOTO_LOCATIONS mappings override the default region landmark when the selected screenshot has a known pin.

## Implementation details and validation

- Upper-right hero, combined intro, removed redundant state-field-guide kicker.
- Region jumps compute the actual fixed-header offset, move focus, preserve locale path, and land at the numbered chapter.
- Regional art backgrounds use dim blur/fades and slower intersection reveals with reduced-motion fallback.
- Four lower blocks consolidated into Real-Life Connections; Catalan Bay leads, county/road notes and comparison/source/community material retained.
- Wildlife notes preserved, UFO wording replaced through locale-safe href$ selector.
- Existing gallery-position node moved to a compact cyan upper-right image badge. The original gallery update queries it within its gallery, so count updates remain connected.
- Mobile map actions can wrap; extra editorial header elements reset global sticky header styles.
- JavaScript parses via node:vm.Script. CSS parses via repository PostCSS. Seven-value locale arrays supplied for all new keys; exact image references exist.
- Only two WebPs remain in public/assets/revision24-regions. Original downloads and rejected JPEG candidates (L625 mismatched subject, L2473 grainy/3D, L530 low resolution, and unused duplicates) were removed after verifying each absolute path stayed inside that owned directory.
- Parent integration agent owns final browser QA.

Integration interaction QA: all 18 tested region jumps and six exact-pin map actions passed. Seven-locale lower content/image checks passed before the scoped semantic-header reset; final mobile overflow retest pending at this checkpoint.

Final QA update: region links, semantic-header resets, and overflow passed across tested widths/locales. The decoded bay-image check identified a fixed HTML height winning over aspect-ratio; a scoped height:auto rule was added so the 4:3 desktop / 16:10 mobile frame controls its height.
