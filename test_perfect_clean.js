import sharp from 'sharp';

async function run() {
  const { data, info } = await sharp('public/images/hero-banner-exact.png.bak')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  function getPixel(buf, x, y) {
    const cx = Math.max(0, Math.min(width - 1, Math.round(x)));
    const cy = Math.max(0, Math.min(height - 1, Math.round(y)));
    const idx = (cy * width + cx) * channels;
    return [buf[idx], buf[idx + 1], buf[idx + 2]];
  }

  function setPixel(buf, x, y, r, g, b) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = (Math.round(y) * width + Math.round(x)) * channels;
    buf[idx] = Math.round(r);
    buf[idx + 1] = Math.round(g);
    buf[idx + 2] = Math.round(b);
  }

  // --- Perfect Inpainting function ---
  // In `hero-banner-exact.png.bak`, between x=28 and x=196, y=236 and y=298:
  // Clean reference above: y = 232..235 (x from 28 to 196)
  // Clean reference below: y = 299..302 (x from 28 to 196)
  // Clean reference left: x = 28..32 (y from 236 to 298)
  // Clean reference right: x = 194..198 (y from 236 to 298)
  
  // Option 1: Just cleanly erase Get a Quote (x: 32..196, y: 235..298)
  const buf1 = Buffer.from(data);
  for (let y = 236; y <= 298; y++) {
    const ty = (y - 236) / (298 - 236);
    for (let x = 32; x <= 194; x++) {
      const topP = getPixel(data, x, 233);
      const botP = getPixel(data, x, 301);
      const leftP = getPixel(data, 28, y);
      const rightP = getPixel(data, 196, y);

      // Bilinear interpolation
      const cTopBot = [
        topP[0] * (1 - ty) + botP[0] * ty,
        topP[1] * (1 - ty) + botP[1] * ty,
        topP[2] * (1 - ty) + botP[2] * ty,
      ];
      const tx = (x - 32) / (194 - 32);
      const cLeftRight = [
        leftP[0] * (1 - tx) + rightP[0] * tx,
        leftP[1] * (1 - tx) + rightP[1] * tx,
        leftP[2] * (1 - tx) + rightP[2] * tx,
      ];

      const r = (cTopBot[0] + cLeftRight[0]) / 2;
      const g = (cTopBot[1] + cLeftRight[1]) / 2;
      const b = (cTopBot[2] + cLeftRight[2]) / 2;

      setPixel(buf1, x, y, r, g, b);
    }
  }

  await sharp(buf1, { raw: { width, height, channels } })
    .extract({ left: 20, top: 215, width: 360, height: 95 })
    .toFile('.playwright-cli/opt1-erase-only.png');

  // Option 2: Erase Get a Quote AND move View Portfolio to left margin (x = 36)
  const buf2 = Buffer.from(data);
  // Crop View Portfolio from original (x: 198..355, y: 238..294)
  const vpW = 158;
  const vpH = 56;
  const vpCrop = Buffer.alloc(vpW * vpH * channels);
  for (let y = 0; y < vpH; y++) {
    for (let x = 0; x < vpW; x++) {
      const p = getPixel(data, 198 + x, 238 + y);
      const idx = (y * vpW + x) * channels;
      vpCrop[idx] = p[0];
      vpCrop[idx + 1] = p[1];
      vpCrop[idx + 2] = p[2];
    }
  }

  // Inpaint the entire button zone (x: 32..360, y: 236..298)
  for (let y = 236; y <= 298; y++) {
    const ty = (y - 236) / (298 - 236);
    for (let x = 32; x <= 360; x++) {
      const topP = getPixel(data, x, 233);
      const botP = getPixel(data, x, 301);
      const r = topP[0] * (1 - ty) + botP[0] * ty;
      const g = topP[1] * (1 - ty) + botP[1] * ty;
      const b = topP[2] * (1 - ty) + botP[2] * ty;
      setPixel(buf2, x, y, r, g, b);
    }
  }

  // Paste View Portfolio at x = 36, y = 238
  for (let y = 0; y < vpH; y++) {
    for (let x = 0; x < vpW; x++) {
      const idx = (y * vpW + x) * channels;
      setPixel(buf2, 36 + x, 238 + y, vpCrop[idx], vpCrop[idx + 1], vpCrop[idx + 2]);
    }
  }

  await sharp(buf2, { raw: { width, height, channels } })
    .extract({ left: 20, top: 215, width: 360, height: 95 })
    .toFile('.playwright-cli/opt2-move-vp-left.png');

  console.log('Options generated');
}

run();
