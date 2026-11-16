# Shared / Radio substantive audit — revision25

## Confirmed omissions in revision24

- The Radio Archive began at approximately document y3971 on1440px desktop, while the shared palm image ended at y1666 and its parent mask was fully transparent by y2066. Palms could not appear around the playlist.
- Radio Archive had no reveal class or transition despite the requested coordinated section entrances. The listening panel retained its older0.85s/1.05s timing.
- Primary cinematic buttons differed across pages:42–48px minimum heights,6–8px radii,13–14px type. Money intentionally had a stronger51px primary and a37px text-like secondary.
- Radio's bottom banner tint ended at#10131b against a darker#0b0b13 page, leaving a straight edge. Gallery and Community also retained a visible1px cinematic bottom rule.

## Changes in this module

- Replaced the finite shared palm layer with section-positioned scenes. Radio receives an explicit Archive scene; long Music and Gallery content receives further scenes as content extends. Only the outer edges of the existing Justice artwork are exposed, excluding both artists.
- Each offset palm edge has its own horizontal and vertical fade, avoiding visible rectangular image edges. The page-bottom mask blends into the existing footer.
- Added missing section entrances and slowed existing listening-panel motion. Existing shared/card observers are respected, avoiding a second animation on already-managed content. Reduced motion remains fully visible without transitions.
- Standardized normal cinematic actions to13px/500 type,44px minimum height,10px16px padding and8px radius. Money's requested primary/secondary hierarchy and home buttons are unchanged.
- Removed cinematic bottom rules. Radio, Gallery and Community now fade to their exact page surface, with the bottom fade above the lateral tint.

## Rendered verification

Real loading from localhost4173, using the wired HTML rather than injection:

- Exactly one atmosphere module loaded; no page errors observed.
- Desktop Radio:4 scenery scenes, including Archive; Archive enters and reaches opacity1.
- Music:7 scenery scenes across a7044px page. Gallery:2 scenes; Community:1.
- All normal hero controls matched the shared dimensions on Vehicles, Items, Characters, Regions, Music, Radio and Gallery. Money remained51px/37px.
- No horizontal overflow across the checked desktop routes or320px Radio/Music/Gallery/Community;390px Radio also checked.
- Reduced-motion Radio: Archive opacity1 and listening-panel transition duration0s.
- Radio/Gallery/Community hero bottom borders computed0px; visually checked the continuous fades and visible natural palm edges.

Screenshots in the workspace sibling qa-revision24 include audit25-radio-final-top.png, audit25-gallery-final-top.png, audit25-community-final-top.png, audit25-radio-fixed-archive.png and audit25-radio-fixed-390.png. The latter two precede the final independent edge-fade refinement, which changes masking only.

## Other assigned requirements reviewed

- Home3×3 navigation includes Discord; home region images have upper-right counts27/7/8/7/6/6.
- Approved wordmark SVG is retained and desktop width is128px. Exact agreement with unavailable drawn width guides was not independently established.
- Desktop navigation dropdown gap measured0px; opening animation exists. Revision24 closed immediately via open=false. The separate revision25 menu correction now supplies a cancellable closing fade and passed21 interaction assertions; see menu-closing-notes.md.
- Shared footer is compact/aligned and visually blends smoothly.
- Radio hero upper-left hierarchy, art alternation1/3/5left and2/4/6right, Archive heading/dropdown/introduction/credit and removal of the old History section are implemented.
- Take the dial has improved copy and a Jason/Lucia convertible image, but the image does not visibly depict headphone listening. Whether that satisfies the precise original requested listening visual remains a content/asset decision.

Files owned by this change: public/revision25-atmosphere.js and public/revision25-atmosphere.css.
