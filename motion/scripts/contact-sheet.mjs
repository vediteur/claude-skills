// Renders selected frames of a composition and tiles them into one image for quick review.
// Run from the project root. usage: node contact-sheet.mjs <CompositionId> <out.png> <frame> [frame...]
// Full-size frames are kept next to the sheet in <out dir>/frames/.
import path from 'node:path';
import fs from 'node:fs';
import {createRequire} from 'node:module';

// Packages resolve from the reel project in the current directory, wherever this skill is installed
const req = createRequire(path.resolve('package.json'));
const sharp = req('sharp');
const {bundle} = req('@remotion/bundler');
const {openBrowser, renderStill, selectComposition} = req('@remotion/renderer');

const [id, out, ...frames] = process.argv.slice(2);
const tmp = path.join(path.dirname(out), 'frames');
fs.rmSync(tmp, {recursive: true, force: true});
fs.mkdirSync(tmp, {recursive: true});

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browser = await openBrowser('chrome');
const composition = await selectComposition({serveUrl, id, puppeteerInstance: browser});

const files = [];
for (const frame of frames.map(Number)) {
  const file = path.join(tmp, `f${String(frame).padStart(3, '0')}.png`);
  await renderStill({composition, serveUrl, frame, output: file, puppeteerInstance: browser});
  files.push(file);
}
await browser.close({silent: true});

const tw = 360, th = 640, cols = Math.min(files.length, 5);
const rows = Math.ceil(files.length / cols);
const tiles = await Promise.all(
  files.map(async (f, i) => ({
    input: await sharp(f).resize(tw, th).toBuffer(),
    left: (i % cols) * (tw + 10),
    top: Math.floor(i / cols) * (th + 10),
  })),
);
await sharp({create: {width: cols * (tw + 10) - 10, height: rows * (th + 10) - 10, channels: 3, background: '#333'}})
  .composite(tiles)
  .png()
  .toFile(out);
console.log('wrote', out, 'frames in', tmp);
