---
name: motion
description: Make a 9:16 Reels / Shorts / TikTok motion-graphic MP4 (kinetic Korean typography, flat SVG illustrations, a cut-out product photo, scene transitions) by coding it in Remotion (React). Use whenever the user asks for 모션그래픽, 릴스/쇼츠/틱톡용 영상, 제품 소개 영상, 상세페이지를 영상으로, 홍보 애니메이션, or types /motion — even if they only attach product images or a detail page and say "영상 만들어줘". Not for AI-generated live-action or photoreal video clips.
---

# Motion: product reels in Remotion

Output: `out/<slug>.mp4`, 1080×1920, 30 fps, H.264, 20–30 s, no audio. Talk to the user in Korean.

`<skill>` below means this skill's base directory, which is shown when the skill loads.

Requirements: Node.js 18+ and internet access. Internet is needed for npm, for Google Fonts at render time, and for Remotion's Chrome Headless Shell download on the first render. Remotion is free for individuals and companies with up to 3 employees; larger for-profit companies need a Remotion Company License (remotion.pro). If the user is clearly working for a larger company, mention this once.

## Reel project

All reels live in one Remotion project:

- `src/lib.tsx` holds the shared toolkit (see the table below). Keep it brand-neutral.
- `src/reels/<slug>/` holds one reel: `Reel.tsx` (timeline + `REEL_DURATION`), `scenes.tsx`, `illustrations.tsx`, and `theme.tsx` (palette + product wrapper).
- `src/Root.tsx` registers one `<Composition>` per reel. The ID is PascalCase + `Reel`.
- `assets/<slug>/` holds the source images and `cutout.json`. It is not bundled.
- `public/<slug>/` holds the files the reel loads with `staticFile()`.

**Find or create it.** If the current folder already has `src/lib.tsx` and `remotion` in `package.json`, use it. If the folder is empty, copy `<skill>/assets/template/` into it, including `.gitignore`, and run `npm install`. Otherwise, ask the user where the reel project should live. When you add the first reel, remove the `Placeholder` composition from `Root.tsx`.

**Worked example.** `<skill>/references/example-geotjeori/` holds a complete 24 s reel (새미네부엌 겉절이양념). Its imports assume it sits at `src/reels/geotjeori/`. Read it before writing a new reel and copy its structure. Don't copy its look one to one; each brand gets its own palette and gags.

The scripts live in `<skill>/scripts/`. Run them from the reel project root: they load `sharp` and `@remotion/*` from the project's `node_modules`.

## Steps

1. **Collect the inputs.** Copy the attached images (the `source:` path shown in the message) into `assets/<slug>/`. `slug` is short lowercase ASCII. If there is no product photo, ask for one. Drawing the product yourself would misrepresent what is sold.

2. **Read the copy.** Detail-page images are often tiny (the example's was 147 px wide). Run `node <skill>/scripts/read-detail.cjs <detail image> <scratch dir>` and Read each segment. Collect the headline claims, features, how-to steps, use cases or pairings, and variations. Use only copy you can actually read. If a claim is uncertain (origin, ingredients, health, numbers), leave it out and tell the user. This is advertising, so a misread claim is worse than a missing one.

3. **Storyboard.** Show the user a short Korean table (scene, seconds, on-screen copy, motion), then continue without waiting unless they asked to review first. The default arc follows. Adapt it to the product.
   1. Hook, 0–3 s: a pain-point question or bold claim with a visual gag (the example uses "아직도 절이세요?" and a "절임 NO!" stamp slam).
   2. Product reveal: the product springs in over a sunburst, with the key line and a name banner.
   3. Three key features as cards.
   4. How-to or proof: steps, a timer, numbers.
   5. Use cases or pairings as a grid of illustrations.
   6. End card: the product, a brand lockup, and a one-line payoff. Hold it for at least 2 s.

4. **Cut out the product.** Product photos usually have an opaque white background and often other products in the shot.
   1. Run `node <skill>/scripts/grid-zoom.cjs <img> <out.png> <left> <top> <w> <h>` and Read the result.
   2. Trace the outline as an SVG path in source-pixel coordinates, inset about 1 px from the edge.
   3. Write `assets/<slug>/cutout.json` (the format is in the `cutout.cjs` header) and run `node <skill>/scripts/cutout.cjs assets/<slug>/cutout.json`.
   4. Check the result composited on a dark background and tighten the path where a fringe shows. The `Product` component's white sticker outline hides about 1 px of leftover fringe.

   If the product in the source is under about 400 px tall, it will look soft at hero size, so tell the user a higher-res pack shot would help.

5. **Build the reel.** Create `src/reels/<slug>/`, add its `<Composition>` to `Root.tsx`, and run `npx tsc -p .`.

6. **Review stills before rendering.** Run `node <skill>/scripts/contact-sheet.mjs <Id> preview/sheet.png <frames…>`. Pick each scene's settled state plus one mid-transition frame per cut. Read the sheet, then Read two or three full-size frames from `preview/frames/`. Look for:
   - text clipped, overlapping, or under the product (the example's first outro hid its marquee band behind the jar)
   - anything important outside the safe zone
   - empty scenes during a transition, or elements peeking in from the edges too early
   - illustrations that don't read as what they are

   Fix the problems and re-run.

7. **Render.** Run `npx remotion render <Id> out/<slug>.mp4` in the background (about 1–2 min for 24 s). Then:
   - Verify the file: `npx remotion ffprobe -v error -show_entries stream=width,height,r_frame_rate,nb_frames -show_entries format=duration -of compact out/<slug>.mp4`
   - Look at the real output: `node <skill>/scripts/video-strip.mjs out/<slug>.mp4 preview/video.png 2 5 9 15 19 23` and Read it.
   - Deliver the MP4. Use a file-sending tool (e.g. SendUserFile) if you have one; otherwise give the path.

8. **Report.** Tell the user which copy you left out or could not verify, whether the product source was low-res, and that the video is silent (Reels users add trending audio in-app). Also tell them how to edit: `npx remotion studio` for a live preview, and which file holds what.

## Design rules

- **Canvas and safe zone.** The canvas is 1080×1920. Keep text and the product within y 250–1550 and x 70–1010. Reels UI (caption, buttons) covers the bottom and the right edge.
- **Pacing.** Stagger elements within a scene about 6 frames apart. After the last text in a scene settles, hold for at least 60 frames so it can be read. Overlap scenes by `TRANSITION` frames so a cut never shows an empty frame.
- **Type.**
  - Headlines use `Txt` (Jua) with a sticker stroke and drop. A white stroke works on light backgrounds; the dark brand color works on saturated ones.
  - Body copy uses Noto Sans KR 700/900. Handwritten accents use Nanum Pen Script.
  - Minimum sizes are 84 px for headlines and 40 px for body text. On a phone, anything smaller is unreadable.
- **Color.** Sample 5–8 colors from the brand material into `theme.tsx`. Alternate light and saturated backgrounds between scenes so each cut is felt.
- **Motion.**
  - Everything enters on a `pop` spring.
  - Nothing sits still: add idle `Math.sin(frame / n)` bob or rotation to products, plates and floaters.
  - Scene cuts use `Enter` (circle / up / left). Vary them.
  - Punctuate impacts with a short camera shake (see the stamp in the example's `Hook`).
- **Illustrations.**
  - Draw flat SVG with one dark outline color.
  - For a clean outer outline on a cluster of shapes, draw every shape thick in the outline color first, then draw the fills on top (see `Cabbage`).
  - Use `rand(i)` for scatter, never `Math.random()`. Frames render in parallel tabs, so random values would flicker.
- **Brand.** Use the real product cutout. Never redraw the package or a logo. Writing the brand name as text is fine.

## `src/lib.tsx` toolkit

| Export | Use |
|---|---|
| `W`, `H`, `FPS` | 1080, 1920, 30 |
| `fonts.display / body / hand` | Jua / Noto Sans KR / Nanum Pen Script font families |
| `pop(frame, delay, cfg?)` | Spring from 0 to ~1 with overshoot. Use it for scale-ins and slide offsets `(1 - p) * dist`. |
| `ease(frame, [a, b], [from, to], easing?)` | Clamped interpolate for linear moves and progress values |
| `Txt` | A text block with an optional `stroke`/`strokeW`/`drop` sticker outline |
| `Product` | A cutout PNG with a white sticker outline and drop shadow. `shine` 0→1 sweeps a highlight. Wrap it per reel in `theme.tsx`. |
| `GridPaper`, `Sunburst` | Backgrounds: notebook grid, rotating rays |
| `Sparkle` | A twinkling 4-point star |
| `Enter` | Scene entrance (`circle` with an origin, `up`, `left`) |
| `at(x, y, transform?, style?)` | Absolute positioning by center |

## Gotchas

- Pass extra transforms as the 3rd argument of `at()`. Setting `style.transform` yourself drops the centering.
- Remotion's bundled ffmpeg lacks the `select` and `tile` filters, which is why `video-strip.mjs` grabs frames one by one.
- All `@remotion/*` packages are pinned to the same exact version (4.0.533). Add new ones with that exact version (`npm i --save-exact @remotion/x@4.0.533`), because mixed versions break rendering.
- The `preview/` folder is scratch output. It is safe to delete.
