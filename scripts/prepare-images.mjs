import sharp from 'sharp';
import { stat } from 'node:fs/promises';

// The selected originals are retained unchanged. Resize the entire image: never crop faces or hair.
for (const name of ['retno-introduction-v3', 'retno-insurance-v3']) {
  for (const width of [320, 640]) {
    const output = `public/assets/${name}-${width}.webp`;
    await sharp(`public/assets/${name}.png`).resize({ width }).webp({ quality: 90, effort: 6 }).toFile(output);
    console.log(`${output}: ${(await stat(output)).size} bytes`);
  }
}
const chibi = sharp('public/assets/retno-chibi-wave.png');
const metadata = await chibi.metadata();
if (!metadata.hasAlpha) throw new Error('The selected chibi must retain its transparent background.');
await chibi.resize({ height: 396 }).webp({ lossless: true, effort: 6 }).toFile('public/assets/retno-chibi-wave.webp');
console.log('Chibi: lossless WebP, transparency preserved.');
