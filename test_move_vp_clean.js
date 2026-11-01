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

  function setPixel(buf, x, y, r, g, b) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = (Math.round(y) * width + Math.round(x)) * channels;
    buf[idx] = Math.round(r);
    buf[idx + 1] = Math.round(g);
    buf[idx + 2] = Math.round(b);
  }

  // 1. First erase Get a Quote cleanly
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
      setPixel(out, x, y, (rTB + rLR) / 2, (gTB + gLR) / 2, (bTB + bLR) / 2);
    }
  }

  // 2. Crop View Portfolio button (x: 191..355, y: 236..296)
  const vpX = 191, vpY = 236, vpW = 164, vpH = 60;
  const vpCrop = Buffer.alloc(vpW * vpH * channels);
  for (let y = 0; y < vpH; y++) {
    for (let x = 0; x < vpW; x++) {
      const p = getPixel(vpX + x, vpY + y);
      const idx = (y * vpW + x) * channels;
      vpCrop[idx] = p[0];
      vpCrop[idx + 1] = p[1];
      vpCrop[idx + 2] = p[2];
    }
  }

  // 3. Erase View Portfolio original position cleanly (x: 188..358, y: 236..296)
  for (let y = 236; y <= 296; y++) {
    const ty = (y - 236) / (296 - 236);
    for (let x = 188; x <= 358; x++) {
      const tx = (x - 188) / (358 - 188);
      const topP = getPixel(x, 233);
      const botP = getPixel(x, 299);
      const leftP = getPixel(185, y);
      const rightP = getPixel(362, y);

      const rTB = topP[0] * (1 - ty) + botP[0] * ty;
      const gTB = topP[1] * (1 - ty) + botP[1] * ty;
      const bTB = topP[2] * (1 - ty) + botP[2] * ty;

      const rLR = leftP[0] * (1 - tx) + rightP[0] * tx;
      const gLR = leftP[1] * (1 - tx) + rightP[1] * tx;
      const bLR = leftP[2] * (1 - tx) + rightP[2] * tx;

      setPixel(out, x, y, (rTB + rLR) / 2, (gTB + gLR) / 2, (bTB + bLR) / 2);
    }
  }

  // 4. Paste View Portfolio at left margin (x = 38, y = 236)
  for (let y = 0; y < vpH; y++) {
    for (let x = 0; x < vpW; x++) {
      const idx = (y * vpW + x) * channels;
      setPixel(out, 38 + x, 236 + y, vpCrop[idx], vpCrop[idx + 1], vpCrop[idx + 2]);
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .extract({ left: 20, top: 215, width: 360, height: 95 })
    .toFile('.playwright-cli/test-move-vp-clean.png');

  console.log('Generated test-move-vp-clean.png');
}

run();
