# Regions and media compliance re-audit — November 14, 2026

This re-audit compares original requested outcomes with published v24 and the corrected local preview. Absence of console errors is not treated as proof that a visual request was fulfilled.

## Confirmed misses corrected

| Request | Published v24 evidence | Correction and verification |
| --- | --- | --- |
| Region jump links place numbered small title immediately below fixed header | Desktop Port Gellhorn: header bottom86px; eyebrow top160.5px. A74.5px gap remained because the outer chapter was targeted. | Target the eyebrow with a20px offset. All six regions measured19.5–20.5px at390px and1440px with reduced motion. Normal-motion tests also land below header. A reveal transform initially caused a-3.5px gap and was removed from measurement; smooth scrolling remains. |
| Only exact tagged photographs get a map action | Five of six initial photos linked to representative landmarks without a known photograph pin: Keys113→Rusty Anchor; Grassrivers66→Visitor Center; Gellhorn65→Starlet Motel; Ambrosia126→Police Department; Kalaga135→Canyon. | Hide map action and remove href for untagged photos, retaining HD controls. Keysphoto116 restores exactL447 action; returning to113 hides it. ClickingL447 opens Underwater Research Station, Mariana County, with community-placement caveat and Aquarius Research Station comparison. |
| Soundtrack title/introduction/CTA occupy lower-left hero | Hero y86–696; CTA ended497px, leaving199px below. align-items:flex-end on a column flex container did not change vertical placement. | Desktop justify-content:flex-end and no inherited25px horizontal copy margin. CTA bottomgap is48px; text starts79px from left instead of104px at1440px. At901px bottomgap remains48px, with no title/calendar overlap. Mobile calendar remains below copy. |

Changed files: public/revision24-regions.js/css and public/revision24-music.css. Syntax check passed.

Visually inspected corrected renders: qa-revision25/audit-regions-media/music-fixed-1440-hero.png and regions-fixed-390-anchor.png. Measurements: confirmed-fixes-results.json and motion-and-map-results.json in the same QA directory.

## Qualified confirmations and remaining findings

- Regions upper-right composition, combined three-clause copy, restrained buttons and Leonida Keys imagery are present. Relative The State Of/Leonida spacing was not changed by v24; it uniformly scaled the original graphic. Root owns the v25 graphic correction.
- Region backgrounds are photo-specific, blurred/dimmed and visibly tint the sections. Wildlife notes and UFO files links remain. Four editorial blocks are consolidated into Real-Life Connections, leading with Catalan Bay. County and road prose is retained. The old Florida through a fictional lens body and GTABase source were condensed into a new comparison introduction, not preserved verbatim.
- Two side-by-side comparisons are labeled visual parallels rather than confirmed exact matches. Real images are1400×450 Providence Canyon and1108×831 Everglades, with credits and source links. Pairs remain side by side on mobile, cropped square. This is not a comparison for all six regions.
- Music calendar is legible upper-right on desktop and below copy on mobile. This re-audit checked presentation; factual sourcing remains the previous revision24 provenance work.
- Pusher retains official score art with a separate semantic Pusher overlay; this is not newly found single-specific art. Other questioned covers were retained following the earlier source comparison. Bright Lights, Big City and Sexy Magic use cover cropping, not stretching.
- X-Files contains an actual Grass Roots: Michael fighting-aliens screenshot and an actual reported souvenir-map photo for Breakwater. The latter is labeled a reported clue, not a confirmed encounter. Both were visually inspected.
- Gallery title/kicker/introduction sit inside its hero photo. Gallery, Soundtrack and Community use Justice-image palm edges without duplicating the musicians.
- Palm-background qualification: shared layer uses narrow faded edge strips (13vw desktop/20vw mobile; opacity.16/.12). It is visible on Community, but covers only an early vertical band rather than all long Soundtrack/Gallery content. A claim that page-wide naturally varied palm atmosphere is fully complete is not supported. Shared background edits are outside this agent's ownership.

Hash-navigation screenshots taken immediately can show lazy-image placeholders. Corrected hero checks waited for heading art to decode; earlier blank comparison captures were not counted as confirmed broken images.
