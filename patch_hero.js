import sharp from 'sharp';

async function processImage() {
  // Always load original backup image if available, or current
  const srcImage = 'public/images/original-hero.png';
  const { data, info } = await sharp(srcImage)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Original image info: ${width}x${height}, ${channels} channels`);

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

  // 1. Crop "View Portfolio" button from original image (x: 195..350, y: 236..286)
  const vpX = 195;
  const vpY = 236;
  const vpW = 155;
  const vpH = 50;
  const vpBuffer = Buffer.alloc(vpW * vpH * channels);

  for (let y = 0; y < vpH; y++) {
    for (let x = 0; x < vpW; x++) {
      const p = getPixel(vpX + x, vpY + y);
      const idx = (y * vpW + x) * channels;
      vpBuffer[idx] = p[0];
      vpBuffer[idx + 1] = p[1];
      vpBuffer[idx + 2] = p[2];
    }
  }

  // Sample clean background tile color from x=15..32, y=236..286 (to the left of Get a Quote)
  // and x=355..370, y=236..286 (to the right of View Portfolio)
  // For any point in button area (x: 35..355, y: 230..292):
  for (let y = 230; y <= 292; y++) {
    // Clean bottom tile pixel
    const botP = getPixel(35, 298);
    // Clean left tile pixel
    const leftP = getPixel(25, y);
    // Clean right tile pixel
    const rightP = getPixel(365, y);

    for (let x = 35; x <= 355; x++) {
      const alphaX = (x - 35) / (355 - 35); // 0 at left, 1 at right
      // Blend between left and right background pixels
      let r = leftP[0] * (1 - alphaX) + rightP[0] * alphaX;
      let g = leftP[1] * (1 - alphaX) + rightP[1] * alphaX;
      let b = leftP[2] * (1 - alphaX) + rightP[2] * alphaX;

      // Blend slightly with bottom tile color for smooth vertical gradient
      const alphaY = Math.max(0, (y - 230) / (292 - 230)); // 0 at top, 1 at bottom
      r = r * (1 - alphaY * 0.3) + botP[0] * (alphaY * 0.3);
      g = g * (1 - alphaY * 0.3) + botP[1] * (alphaY * 0.3);
      b = b * (1 - alphaY * 0.3) + botP[2] * (alphaY * 0.3);

      setPixel(x, y, Math.round(r), Math.round(g), Math.round(b));
    }
  }

  // 2. Paste "View Portfolio" button at x = 40, y = 236
  const dstX = 40;
  const dstY = 236;
  for (let y = 0; y < vpH; y++) {
    for (let x = 0; x < vpW; x++) {
      const idx = (y * vpW + x) * channels;
      setPixel(dstX + x, dstY + y, vpBuffer[idx], vpBuffer[idx + 1], vpBuffer[idx + 2]);
    }
  }

  await sharp(outBuffer, { raw: { width, height, channels } })
    .png()
    .toFile('public/images/hero-banner-exact.png');

  console.log('Clean patch generated successfully for hero-banner-exact.png');
}

processImage().catch(console.error);
