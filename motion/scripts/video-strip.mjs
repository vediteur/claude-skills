// Grabs frames at the given seconds from a rendered MP4 and tiles them in one row.
// Uses Remotion's bundled ffmpeg (its build lacks the select/tile filters, so frames are grabbed one by one).
// Run from the project root. usage: node video-strip.mjs <video.mp4> <out.png> <sec> [sec...]
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';

const sharp = createRequire(path.resolve('package.json'))('sharp');

const [video, out, ...secs] = process.argv.slice(2);
const tmp = path.join(path.dirname(out), 'video-frames');
fs.rmSync(tmp, {recursive: true, force: true});
fs.mkdirSync(tmp, {recursive: true});

const files = secs.map((t, i) => {
  const file = path.join(tmp, `${String(i).padStart(2, '0')}_${t}s.png`);
  execFileSync('npx', ['remotion', 'ffmpeg', '-v', 'error', '-ss', t, '-i', video, '-frames:v', '1', file], {shell: true});
  return file;
});

const tw = 300, th = 533;
const tiles = await Promise.all(files.map(async (f, i) => ({input: await sharp(f).resize(tw, th).toBuffer(), left: i * (tw + 8), top: 0})));
await sharp({create: {width: files.length * (tw + 8) - 8, height: th, channels: 3, background: '#333'}})
  .composite(tiles)
  .png()
  .toFile(out);
console.log('wrote', out);
