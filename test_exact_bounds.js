import sharp from 'sharp';

async function run() {
  const { data, info } = await sharp('/tmp/Adeel-repo/public/images/hero-banner-exact.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  function getPixel(x, y) {
    const cx = Math.max(0, Math.min(width - 1, Math.round(x)));
    const cy = Math.max(0, Math.min(height - 1, Math.round(y)));
    const idx = (cy * width + cx) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  const out = Buffer.from(data);

  function setPixel(x, y, r, g, b) {
    const idx = (Math.round(y) * width + Math.round(x)) * channels;
    out[idx] = Math.round(r);
    out[idx + 1] = Math.round(g);
    out[idx + 2] = Math.round(b);
  }

  const xMin = 36, xMax = 182;
  const yMin = 239, yMax = 293;

  for (let y = yMin; y <= yMax; y++) {
    const ty = (y - yMin) / (yMax - yMin);
    for (let x = xMin; x <= xMax; x++) {
      const tx = (x - xMin) / (xMax - xMin);

      const topP = getPixel(x, yMin - 1);
      const botP = getPixel(x, yMax + 1);
      const leftP = getPixel(xMin - 1, y);
      const rightP = getPixel(xMax + 1, y);

      const rTB = topP[0] * (1 - ty) + botP[0] * ty;
      const gTB = topP[1] * (1 - ty) + botP[1] * ty;
      const bTB = topP[2] * (1 - ty) + botP[2] * ty;

      const rLR = leftP[0] * (1 - tx) + rightP[0] * tx;
      const gLR = leftP[1] * (1 - tx) + rightP[1] * tx;
      const bLR = leftP[2] * (1 - tx) + rightP[2] * tx;

      setPixel(x, y, (rTB + rLR) / 2, (gTB + gLR) / 2, (bTB + bLR) / 2);
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .extract({ left: 20, top: 215, width: 360, height: 95 })
    .toFile('.playwright-cli/test-exact-bounds-crop.png');

  console.log('Generated test-exact-bounds-crop.png');
}

run();
