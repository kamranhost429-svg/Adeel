import sharp from 'sharp';

async function test() {
  const { data, info } = await sharp('public/images/original-hero.png')
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
    buf[idx] = r;
    buf[idx + 1] = g;
    buf[idx + 2] = b;
  }

  // --- Clean Inpainting Method ---
  // The background around (x: 20..200, y: 228..300):
  // Notice that y=220..230 is the off-white background above the buttons (left of Burj Khalifa).
  // At y=232, the color at x=20 is ~ (252, 252, 252).
  // At y=232, the color at x=200 is ~ (252, 251, 249).
  // At y=302, the color at x=20 is ~ (249, 247, 243).
  // At y=302, the color at x=200 is ~ (247, 245, 240).
  // We can sample clean reference pixels:
  // Top reference: y=232, x from 20 to 200
  // Bottom reference: y=302, x from 20 to 200
  // Left reference: x=25, y from 228 to 300
  // Right reference: to the right of whatever button we place.

  // Let's create Version A: Remove Get a Quote completely. Keep View Portfolio at original position (x: 198..355).
  const bufA = Buffer.from(data);
  for (let y = 228; y <= 300; y++) {
    const t = (y - 228) / (300 - 228);
    for (let x = 28; x <= 198; x++) {
      const topP = getPixel(data, x, 231);
      const botP = getPixel(data, x, 302);
      const r = Math.round(topP[0] * (1 - t) + botP[0] * t);
      const g = Math.round(topP[1] * (1 - t) + botP[1] * t);
      const b = Math.round(topP[2] * (1 - t) + botP[2] * t);
      setPixel(bufA, x, y, r, g, b);
    }
  }

  await sharp(bufA, { raw: { width, height, channels } })
    .extract({ left: 20, top: 215, width: 360, height: 95 })
    .toFile('.playwright-cli/test-varA-crop.png');

  // Let's create Version B: Move "View Portfolio" to the left (starting at x: 38, exactly where Get a Quote was).
  // Inpaint the entire button area (x: 28..360, y: 228..300) first.
  const bufB = Buffer.from(data);
  
  // Extract View Portfolio button from original data (x: 198 to 354, y: 234 to 289)
  const btnW = 158;
  const btnH = 56;
  const btnCrop = Buffer.alloc(btnW * btnH * channels);
  for (let y = 0; y < btnH; y++) {
    for (let x = 0; x < btnW; x++) {
      const p = getPixel(data, 198 + x, 234 + y);
      const idx = (y * btnW + x) * channels;
      btnCrop[idx] = p[0];
      btnCrop[idx + 1] = p[1];
      btnCrop[idx + 2] = p[2];
    }
  }

  // Seamlessly inpaint all of x: 28..360, y: 228..300 in bufB
  for (let y = 228; y <= 300; y++) {
    const t = (y - 228) / (300 - 228);
    for (let x = 28; x <= 365; x++) {
      const topP = getPixel(data, x, 231);
      const botP = getPixel(data, x, 302);
      const r = Math.round(topP[0] * (1 - t) + botP[0] * t);
      const g = Math.round(topP[1] * (1 - t) + botP[1] * t);
      const b = Math.round(topP[2] * (1 - t) + botP[2] * t);
      setPixel(bufB, x, y, r, g, b);
    }
  }

  // Now paste View Portfolio at x = 38, y = 234
  for (let y = 0; y < btnH; y++) {
    for (let x = 0; x < btnW; x++) {
      const idx = (y * btnW + x) * channels;
      setPixel(bufB, 38 + x, 234 + y, btnCrop[idx], btnCrop[idx + 1], btnCrop[idx + 2]);
    }
  }

  await sharp(bufB, { raw: { width, height, channels } })
    .extract({ left: 20, top: 215, width: 360, height: 95 })
    .toFile('.playwright-cli/test-varB-crop.png');

  console.log('Test crops generated');
}

test();
