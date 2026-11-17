# Revision 25 — dropdown closing animation

## Change

Added a 170ms closing fade/lift in public/revision25-menus.css. The menu remains natively open until the animation completes; its panel becomes inert while closing. Existing opening animation, zero trigger gap, positioning, colors and layout are unchanged.

public/menus.js now owns a cancellable close lifecycle. Native summary activation (pointer, Enter/Space, touch) uses it, as do Escape, outside clicks and switching menus. A quick reopen cancels the pending close and restores interaction. Reduced-motion preference closes immediately, including when the preference changes mid-animation.

The original app.js contains earlier listeners and render code that set dropdown.open=false directly. To keep this change bounded to menus.js, each of the three managed dropdown types gets an instance-level native open getter/setter bridge. Existing callers therefore enter the same close lifecycle. Final closure uses the saved native setter directly. No document click propagation is swallowed, so navigation and other page actions continue normally. Unrelated details elements retain native behavior.

## Actual browser verification

Tested localhost:4173/en/ with installed Chrome via Playwright, against the wired revision25 stylesheet and menus script. Desktop viewport 1440×1000; touch viewport 390×844. All 21 assertions passed, with zero page errors.

- Pointer opens the catalog; summary click keeps the panel open/inert during r25MenuLeave, visibly reduces opacity, then closes.
- Enter opens; both Space and Enter close through the animation.
- Escape restores focus to the controlling summary and closes.
- Outside pointer click animates despite the legacy app close listener.
- Measured trigger-to-panel gap remains exactly 0px; crossing into a link keeps the menu open.
- Opening Explore fades Catalog; Catalog finishes without closing Explore.
- Reopening after 30ms cancels the pending close; the popup remains open and interactive after the original deadline.
- Language and release-timezone summary closes animate.
- Desktop Vehicles link and mobile Weapons/items link still change routes and close the menu.
- Mobile tap opens and animates close.
- Reduced-motion closes immediately; enabling it while a menu is closing finishes immediately.

Machine-readable test results: qa-revision25/menu-interactions.json in the project workspace (outside the deployable repository).

Root owns stylesheet/script cache wiring, broader verification, packaging and publication.
