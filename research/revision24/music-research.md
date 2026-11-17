# Soundtrack revision 24 — checklist 21–24

Checked 14 November 2026. Implementation is limited to public/revision24-music.js and public/revision24-music.css. Playback, audio URLs, queue controls and original source objects are unchanged.

## Implemented

- 21: Lower-left hero copy and button; smaller title; reduced entrance travel with gentle 1.4-second stagger. The Explore music button keeps the existing listening-room scroll behavior, with keyboard focus and reduced-motion support.
- 22: Replaces the repeated stylized soundtrack-palms SVG with one natural landscape supplied through --r24-palm-image (fallback: existing official photo-22). Charcoal/blue-black treatment, asymmetrical real scenery and soft top/bottom masks; no artist image is used as a background. The one Justice portrait remains in its editorial panel.
- 23: Compact Music release calendar in unused upper-right hero space on desktop; below the copy at <=900px. Two dated entries distinguish the multi-artist album from Justice’s score. Dates use locale-aware day/month formatting and include 2026. All added interface/body copy is translated in en/es/pt-br/de/fr/it/ru.
- 24: Pusher gets a visible sleeve title label without changing its official release artwork. Sexy Magic and Bright Lights, Big City use object-fit:cover to fill the square sleeve without stretching; the artwork viewer retains its original full image. Tove Lo, Cardi B and Fuerza Regida retain their existing artwork after direct comparison with the current official campaign images.

## Verified music facts

1. Rockstar, The Music of Grand Theft Auto VI: https://www.rockstargames.com/VI/music
   - Read directly on 14 November 2026.
   - The Album: coming November 19; 34 original tracks.
   - Original Score by Justice: coming December 11; 30 tracks plus digital bonus tracks across formats.
   - Music page currently lists Blood In Your Eyes, Don’t Chart and Suzuki among the album singles; Pusher among the score singles.
2. Rockstar Newswire, Grand Theft Auto VI: Original Score by Justice (29 October 2026): https://www.rockstargames.com/newswire/article/39ak8a12395591/grand-theft-auto-vi-original-score-by-justice
   - Confirms December 11, the 30-track core score and digital bonus tracks.
   - Names Gaspard Augé and Xavier de Rosnay as Justice and describes the adaptive music.
3. Official artist page: https://justice.church/ and https://justice-church.myshopify.com/pages/gtavi
   - Confirms December 11 and the separate score release.
4. Apple Music pre-release listing: https://music.apple.com/us/album/grand-theft-auto-vi-original-score/6827706027
   - Explicitly dates the release December 11, 2026.
   - Lists 52 digital entries, which includes content beyond Rockstar’s stated 30-track core album. The UI intentionally uses Rockstar’s 30 tracks + digital bonuses wording instead of treating this as a conflict or claiming an exact bonus count.

## Artwork verification

Official campaign pages, followed to their published image links:

- Pusher: https://justice.lnk.to/pusher
  - Current image: https://linkstorage.linkfire.com/medialinks/images/8871bf18-34f8-4c1a-ae3d-d3b9d437b86d/artwork-440x440.jpg
  - Visual check: same VI / Original Score by Justice art as existing local assets/music/hd/pusher.jpg, despite a changed CDN identifier. It contains no printed Pusher title. No distinct official single cover with that title was verified. The site title is a separate HTML sleeve label, not an alteration represented as official artwork.
- Tove Lo, Blood In Your Eyes: https://gtavi-thealbum.lnk.to/bloodinyoureyes
  - https://linkstorage.linkfire.com/medialinks/images/cdda039b-98ee-459f-b107-9842d46bed6c/artwork-440x440.jpg
- Cardi B, Don’t Chart: https://gtavi-thealbum.lnk.to/dontchart
  - https://linkstorage.linkfire.com/medialinks/images/b685dc30-fe68-455d-86e9-b43a921546cd/artwork-440x440.jpg
- Fuerza Regida, Suzuki: https://gtavi-thealbum.lnk.to/suzuki
  - https://linkstorage.linkfire.com/medialinks/images/c84c8312-e122-4a4c-b537-540c7ca11099/artwork-440x440.jpg

All three images were retrieved successfully and compared side-by-side against the existing local covers. They are the same official The Album cover composition. No artist-specific replacement is invented. The Instagram Pusher post was unavailable to direct browser retrieval; a secondary repost/search result did not provide a stronger verified cover, so was not used as a replacement.

## Validation and limits

- New JavaScript parses through Node vm.Script; stylesheet parses through PostCSS.
- Handler is idempotent per rendered hero/banner and appends the sleeve title only once.
- No audio elements, player buttons or track-provider links are replaced.
- No new raster images added (zero additional image transfer weight).
- Root integration owns browser screenshots, multi-width/language checks and the shared palm image final choice.
