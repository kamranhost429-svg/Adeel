import sharp from 'sharp';

async function processImage() {
  const { data, info } = await sharp('public/images/hero-banner-exact.png.bak')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Bak image info: ${width}x${height}, ${channels} channels`);

  const outBuffer = Buffer.from(data);

  function getPixel(x, y) {
    const idx = (Math.floor(y) * width + Math.floor(x)) * channels;
    return [outBuffer[idx], outBuffer[idx + 1], outBuffer[idx + 2]];
  }

  function setPixel(x, y, r, g, b) {
    const idx = (Math.floor(y) * width + Math.floor(x)) * channels;
    outBuffer[idx] = r;
    outBuffer[idx + 1] = g;
    outBuffer[idx + 2] = b;
  }

  // Cover "Get a Quote" gold button (x: 38..192, y: 236..290)
  // Left clean sample x = 32
  // Right clean sample x = 196 (between the two buttons)
  for (let y = 232; y <= 292; y++) {
    const leftP = getPixel(32, y);
    const rightP = getPixel(196, y);

    for (let x = 38; x <= 192; x++) {
      const alpha = (x - 38) / (192 - 38);
      const r = Math.round(leftP[0] * (1 - alpha) + rightP[0] * alpha);
      const g = Math.round(leftP[1] * (1 - alpha) + rightP[1] * alpha);
      const b = Math.round(leftP[2] * (1 - alpha) + rightP[2] * alpha);

      setPixel(x, y, r, g, b);
    }
  }

  await sharp(outBuffer, { raw: { width, height, channels } })
    .png()
    .toFile('public/images/hero-banner-exact.png');

  console.log('Clean patch v2 generated successfully!');
}

processImage().catch(console.error);
