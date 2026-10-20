// Cuts a product out of a photo along a hand-traced SVG outline, upscales it, and writes a transparent PNG.
// usage: node cutout.cjs <config.json>
// config: {
//   "src": "assets/<slug>/pack.png",          source photo (any background)
//   "out": "public/<slug>/product.png",       transparent PNG for the reel
//   "crop": {"left": 0, "top": 0, "width": 0, "height": 0},   bounding box in source pixels
//   "scale": 4,                               upscale factor (lanczos3 + light sharpen)
//   "outline": "M ... Z"                      SVG path in source-image coordinates
// }
const fs = require('fs');
const path = require('path');
// Packages resolve from the reel project in the current directory, wherever this skill is installed
const sharp = require('module').createRequire(path.resolve('package.json'))('sharp');

const cfg = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const {crop, scale: S = 4} = cfg;
(async () => {
  const w = crop.width * S, h = crop.height * S;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${crop.left} ${crop.top} ${crop.width} ${crop.height}">` +
      `<path d="${cfg.outline}" fill="#fff"/></svg>`,
  );
  await sharp(cfg.src)
    .extract(crop)
    .resize(w, h, {kernel: 'lanczos3'})
    .sharpen({sigma: 1.2})
    .composite([{input: mask, blend: 'dest-in'}])
    .png()
    .toFile(cfg.out);
  console.log(`wrote ${cfg.out} ${w}x${h} aspect=${(w / h).toFixed(3)}`);
})();
