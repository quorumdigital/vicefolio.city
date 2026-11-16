# Vice Atlas — saved work checkpoint

Checkpoint date: November 12, 2026 (America/New_York).
Status: unfinished work saved by user request; NOT published.
Public site: https://vice-atlas-gta-vi.q68tmbfkyq.chatgpt.site
Project ID: appgprj_6af4e2e76ec08191894ebf5cae084fe1
Last known published source: 93e77d67f94ade1c8a7d8c8f5945134e8720147a (version 4).
Preserve public audience. Do not describe this checkpoint as a live update.

## Latest design instruction
Keep the chosen GTA-style font, but reserve the long decorative squiggle/flourish for the word “Vice.” Reduce flourishes elsewhere. This is recorded for implementation; it has not been applied in this checkpoint.
Use GTA-style primary titles and softer supporting type (Outfit). Keep the website's own sunset/neon visual identity, generous game artwork and interactive cards. The depth of wiki information is a reference, not a visual template: do not reproduce wiki layouts, infoboxes or dense article styling.

## Implemented locally since version 4
- dist/map-types.js: expanded grouped categories and category-specific SVG icons; Lucide license retained.
- dist/map-data.json: refined tags/categories and per-location reference-image metadata, real-world coordinates where present, original record IDs and source revision.
- dist/map-evidence.js: game/real-world comparison panels, image enlargement, Google Maps and State of Leonida links, readable map icon key and credits.
- dist/map-room.js and CSS: revised category sidebar, map reference panels, documented-record count wording and display crop hiding the illegible poster legend/credits panel without changing source imagery.
- dist/app.js: reference panels attached to catalog entries, home countdown hook and community route.
- dist/release-community.js and dist/features.css: themed regional release countdown and a local contribution-draft form with copy/download. No server submission and no Discord server exist.
- dist/index.html: new assets/scripts loaded and community navigation.

These are work-in-progress changes. Full browser regression and visual approval have NOT been completed. Previous README validation statements describe earlier versions, not this checkpoint.

## Remaining accepted scope
1. Finish accurate map icon review, category coverage, filter behavior and responsive QA. Fix any remaining generic result dots. Count labels must mean documented records, never the total number in the game. Empty categories do not prove a feature exists.
2. Keep native-resolution map tiles and proportional zoom; inspect the poster crop at every zoom and full-map view. Retain map licensing and attribution.
3. Enrich vehicle profiles with design/real-life influence, manufacturer/class/body/seats, evidence images, acquisition and observed locations, sourced trivia, handling/terrain discussion, and useful comparisons. Distinguish GTA VI findings from previous-game benchmarks. Do not invent measured VI top speeds or definitive fastest/slowest rankings.
4. Enrich weapons with description, real-life design influence, attachments, type/style, evidence images, ammunition/damage/accuracy when verified, acquisition and sightings, trivia, and comparisons. Unknown in-game names and values must remain unknown. User highlighted the ES9 and the unnamed Springfield Armory M1A-inspired rifle with an apparent Aimpoint CompM2-style optic.
5. Expand UFO/alien history into interesting, illustrated historical case files with real conditions/triggers. Separate earlier-game lore from confirmed VI evidence, community theories and rumors. Do not claim every earlier GTA had a functional UFO encounter without checking.
6. Add a soundtrack section with verified songs, appropriate release/disc artwork and official listening links; distinguish trailers, radio and score. No invented covers or unverified track list.
7. Add deeper Wanted Level, Relationship Status and Criminal Profile guides with evidence labels.
8. Expand Leonida world guide: real-world influence, counties, cities/towns, ecosystems, highways, trivia, large game imagery and map links. Catalan Bay was another user reference.
9. Verify the official release date AND regional unlock time before finishing countdown. Prior session research reported November 19, 2026 at local midnight; treat as requiring fresh source verification before publication.
10. Community contribution workflow is a local draft only. A real Discord server/invite still requires setup; never display a fake Join link or claim reports were submitted.
11. Generate any missing fixed-SVG title artwork, keep soft type for lesser content, and implement the Vice-only flourish preference.
12. Update counts, navigation, sources and README; complete desktop/mobile/runtime/asset/interaction QA; then publish only when ready and authorized by the subsequent task.

## Reference sites requested by the user
- https://www.ign.com/maps/grand-theft-auto-4/liberty-city — map organization, category icons, details, checklists and notes.
- https://map.stateofleonida.net/ — map fact-checking reference and per-location game/real-world imagery. It credits the GTADB database, so agreement is not independent corroboration.
- https://map.stateofleonida.net/?marker=L3399 — user-highlighted location evidence example.
- https://www.gtabase.com/gta-6/map/ — map and category comparisons.
- https://gta.wiki/w/Grand_Theft_Auto_VI
- https://gta.wiki/w/State_of_Leonida
- https://gta.wiki/w/Catalan_Bay
- https://gta.wiki/w/Dominator_(1967)
- https://gta.wiki/w/ES9
- https://gta.wiki/w/Unnamed_GTA_VI_Springfield_Armory_M1A-inspired_rifle
- https://www.reddit.com/r/identifythisfont/comments/i157a0/gta_vice_city_font_name/ — font discussion referenced by the user.

## Research leads retained from the interrupted session
These notes preserve prior findings for resumption; they are not a new verification pass or finished publishable research.
- Source reported official regional launch times: https://support.rockstargames.com/articles/29jV3Cv2cCgvwM1XgtMO5o/grand-theft-auto-vi-regional-pre-load-and-release-times-on-playstation-5-and-xbox-series-x-or-s
- GTABase map snapshot reportedly listed 106 locations in 24 categories, including 2 Ammu-Nation records; our 3 gun-shop records likewise are not an entire-game total.
- GTABase prohibits substantial copying of its database; do not bulk-import its full vehicle index.
- Historical Schafter benchmark is not Schafter V12. News helicopter donor identification is uncertain; an open-bed Rancher pickup should not inherit Suburban SUV specifications. Delmar cargo-ship player control is unconfirmed.
- The 1967 Dominator was described as a Vapid two-door, two-seat muscle convertible with first-generation Ford Mustang influence; keep community identification distinct from Rockstar confirmation.
- Duke 556 30/60-round figures may be carried over from GTA Online. Do not label them VI-confirmed without a direct source.
- A reported printed-map UFO illustration near Breakwater Quarry would not establish a live encounter or spawn. Verify the report and clearly label its evidence level if used.
- Licensed IGN interview lead: https://www.bestbuy.com/gamers/gamers-articles/pcmcat1791490206931 — verify before paraphrasing police trackers, fences, personal vehicles or weapon storage.
- GTA Wiki footer license was observed as CC BY-NC-SA 3.0. Use original summaries and primary evidence where possible; preserve attribution and respect image-specific licensing.

## Map implementation / source provenance
- Existing map has 3,401 GTADB landmark records plus 40 linked catalog records (3,441 total); 3,315 positioned records.
- GTADB source revision: 6acc1b555ed68255078b850f5d4a984610fa1910. Data/map attribution retained in implementation.
- 8,830 local JPEG tiles at native zoom levels 0–5. Tile sizing accounts for display pixel density; do not extend zoom past source detail or distort aspect ratio.
- Reference photos use immutable remote GTADB URLs. They are not all official Rockstar images or Google Maps captures. Label provenance accurately.
- Current source data, earlier QA results/screenshots and the gameplay extract are preserved under work-checkpoint/evidence. Their filenames may include “final”; they reflect earlier checks, not approval of the current changes.
- Font program is not distributed; fixed SVG outlines are in dist. The existing local font-work/pricedown.otf is not copied into the repository. See lettering-license-notes.txt.

## Recovery / next session
The research agents stopped without writing the planned vehicle, weapon, UFO, soundtrack, map and world research JSON deliverables. Do not assume those artifacts exist or that background research is running.
Open this same Site/project and checkout, inspect the saved version and this file, and resume the incomplete items above. Source and static assets are checkpointed; no new public deployment is requested by this save-only task.
