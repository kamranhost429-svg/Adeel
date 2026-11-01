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

  function setPixel(buf, x, y, r, g, b) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = (Math.round(y) * width + Math.round(x)) * channels;
    buf[idx] = Math.round(r);
    buf[idx + 1] = Math.round(g);
    buf[idx + 2] = Math.round(b);
  }

  const out = Buffer.from(data);

  // Erase Get a Quote button from x = 36 to x = 192, y = 236 to y = 298
  for (let y = 236; y <= 298; y++) {
    const ty = (y - 236) / (298 - 236);
    for (let x = 36; x <= 192; x++) {
      const tx = (x - 36) / (192 - 36);

      const topP = getPixel(x, 232);
      const botP = getPixel(x, 302);
      const leftP = getPixel(30, y);
      const rightP = getPixel(195, y);

      const rTopBot = topP[0] * (1 - ty) + botP[0] * ty;
      const gTopBot = topP[1] * (1 - ty) + botP[1] * ty;
      const bTopBot = topP[2] * (1 - ty) + botP[2] * ty;

      const rLeftRight = leftP[0] * (1 - tx) + rightP[0] * tx;
      const gLeftRight = leftP[1] * (1 - tx) + rightP[1] * tx;
      const bLeftRight = leftP[2] * (1 - tx) + rightP[2] * tx;

      const r = (rTopBot + rLeftRight) / 2;
      const g = (gTopBot + gLeftRight) / 2;
      const b = (bTopBot + bLeftRight) / 2;

      setPixel(out, x, y, r, g, b);
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .extract({ left: 20, top: 215, width: 360, height: 95 })
    .toFile('.playwright-cli/pristine-erased-crop.png');

  console.log('Done');
}

run();
