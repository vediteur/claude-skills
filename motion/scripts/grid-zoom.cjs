// Zooms into a region with a labelled pixel grid (thin lines every 10px, labels every 50px)
// so an outline can be traced in source-image coordinates.
// usage: node grid-zoom.cjs <image> <out.png> <left> <top> <width> <height> [scale=4]
const path = require('path');
// Packages resolve from the reel project in the current directory, wherever this skill is installed
const sharp = require('module').createRequire(path.resolve('package.json'))('sharp');

const [img, out, ...nums] = process.argv.slice(2);
const [x0, y0, w, h, s = 4] = nums.map(Number);
(async () => {
  let lines = '';
  for (let x = 0; x <= w; x += 10) {
    const major = (x0 + x) % 50 === 0;
    lines += `<line x1="${x * s}" y1="0" x2="${x * s}" y2="${h * s}" stroke="${major ? '#00f' : '#0ff'}" stroke-width="${major ? 2 : 0.6}"/>`;
    if (major) lines += `<text x="${x * s + 2}" y="14" font-size="14" fill="#00f">${x0 + x}</text>`;
  }
  for (let y = 0; y <= h; y += 10) {
    const major = (y0 + y) % 50 === 0;
    lines += `<line x1="0" y1="${y * s}" x2="${w * s}" y2="${y * s}" stroke="${major ? '#00f' : '#0ff'}" stroke-width="${major ? 2 : 0.6}"/>`;
    if (major) lines += `<text x="2" y="${y * s - 2}" font-size="14" fill="#00f">${y0 + y}</text>`;
  }
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w * s}" height="${h * s}">${lines}</svg>`);
  await sharp(img)
    .extract({left: x0, top: y0, width: w, height: h})
    .resize(w * s, h * s, {kernel: 'nearest'})
    .composite([{input: svg}])
    .png()
    .toFile(out);
  console.log('wrote', out);
})();
