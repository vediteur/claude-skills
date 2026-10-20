// Slices a tall detail-page image into upscaled segments so small copy becomes readable.
// usage: node read-detail.cjs <image> <outDir> [segmentHeight=250] [scale=5]
const fs = require('fs');
const path = require('path');
// Packages resolve from the reel project in the current directory, wherever this skill is installed
const sharp = require('module').createRequire(path.resolve('package.json'))('sharp');

const [img, outDir, segH = '250', scale = '5'] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(outDir, {recursive: true});
  const meta = await sharp(img).metadata();
  const h = Number(segH), s = Number(scale);
  const files = [];
  for (let y = 0, i = 0; y < meta.height; y += h, i++) {
    const hh = Math.min(h, meta.height - y);
    const file = path.join(outDir, `seg${String(i).padStart(2, '0')}.png`);
    await sharp(img)
      .extract({left: 0, top: y, width: meta.width, height: hh})
      .resize(meta.width * s, hh * s, {kernel: 'lanczos3'})
      .png()
      .toFile(file);
    files.push(file);
  }
  console.log(`${meta.width}x${meta.height} ->`, files.join(' '));
})();
