# Revision 24 Regions QA

Local Chrome/Playwright validation, 2026-11-14.

- Tested English at 1440, 390 and 320 pixels; Spanish, Brazilian Portuguese, German, French, Italian and Russian at 390 pixels.
- All six chapter jumps worked at all three widths (18 checks), preserving focused headings and a 22px clearance below the fixed header.
- All six gallery next controls advanced both image and selected thumbnail. All six regional map actions selected the expected marker: L456, L325, L625, L304, L832, L1341.
- Selecting photo 116 changed the action to /en/#world?pin=L447; clicking opened Underwater Research Station with Mariana County description and Aquarius Research Station comparison.
- Both comparison pairs load the intended game and real photographs. Credits and primary source links are visible.
- No JavaScript errors or broken images. Account-storage API 404 is a limitation of this local static preview.
- Scoped component header reset verified after initial QA found unintended sticky headers and mobile overflow. Final document scrollWidth equals the viewport for every tested width/locale. Gallery filmstrip descendants beyond the viewport are intentionally clipped inside their own scroller.
- Music calendar scoped header reset verified: static 26px header at 1440 and 390, no horizontal page overflow.

Evidence: regions-qa.json contains functional checks before the header correction; regions-qa-fixed.json contains complete post-correction layout results. regions-fixed-*.png show localized hero/comparison views. The final decoded photographs are regions-390-bay-decoded.png and regions-390-everglades-decoded.png.

Final Catalan Bay sizing correction verified after decode: image now 343.22 × 214.5px at viewport 390 (16:10), formerly 343.22 × 900px. Final screenshot confirms the full note and CTA fit together. All owned code changes frozen.
