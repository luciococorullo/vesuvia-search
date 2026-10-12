#!/usr/bin/env node

/**
 * Icon generator for PWA
 * Builds every app icon (PWA, maskable, Apple, MS tile, favicon) from the
 * master logo in public/brand/vesuvia-logo.png.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const source = path.join(root, 'public', 'brand', 'vesuvia-logo.png');
const iconsDir = path.join(root, 'public', 'icons');

// Cream background of the master logo
const BACKGROUND = { r: 254, g: 249, b: 240, alpha: 1 };

// Icon sizes needed for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Renders the logo centred on a cream square, filling `scale` of its side
async function render(logo, size, scale) {
  const inner = Math.round(size * scale);
  const mark = await sharp(logo)
    .resize(inner, inner, { fit: 'contain', background: BACKGROUND })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BACKGROUND } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toBuffer();
}

// Packs PNG images into a .ico container (PNG-in-ICO, supported by every modern browser)
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  // Crop the cream margin so every size starts from the bare mark
  const logo = await sharp(source).trim({ threshold: 20 }).toBuffer();

  fs.mkdirSync(iconsDir, { recursive: true });
  const write = (file, data) => {
    fs.writeFileSync(path.join(root, file), data);
    console.log(`Generated ${file}`);
  };

  for (const size of iconSizes) {
    write(`public/icons/icon-${size}x${size}.png`, await render(logo, size, 0.78));
  }
  // Maskable icons keep the mark inside the 80% safe zone
  for (const size of [192, 512]) {
    write(`public/icons/maskable-${size}x${size}.png`, await render(logo, size, 0.6));
  }
  write('public/icons/apple-touch-icon.png', await render(logo, 180, 0.72));
  write('public/mstile-150x150.png', await render(logo, 150, 0.7));

  const favicons = [];
  for (const size of [16, 32, 48]) {
    favicons.push({ size, data: await render(logo, size, 0.92) });
  }
  write('src/app/favicon.ico', toIco(favicons));

  console.log('Icon generation complete!');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
