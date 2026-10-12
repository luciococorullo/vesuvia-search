#!/usr/bin/env node

/**
 * Simple icon generator for PWA
 * Generates the Vesuvia Search app icon (Linea × Golfo palette) in all PWA sizes
 */

const fs = require('fs');
const path = require('path');

// SVG template for the VesuviaSearch icon
const createIconSVG = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1F5F8B"/>
      <stop offset="62%" stop-color="#2E86AB"/>
      <stop offset="100%" stop-color="#F3B562"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#sky)"/>
  <circle cx="70" cy="32" r="9" fill="#F3B562"/>
  <path d="M8 78 L34 50 Q40 44 46 46 L52 48 Q58 44 64 50 L92 78 Z" fill="#1F1A17" opacity="0.85"/>
  <rect x="0" y="78" width="100" height="22" fill="#1F5F8B"/>
  <path d="M14 88 H86" stroke="#FBF7F0" stroke-width="3" stroke-dasharray="1 7" stroke-linecap="round"/>
  <circle cx="14" cy="88" r="4.5" fill="#D9572B" stroke="#FBF7F0" stroke-width="2"/>
  <circle cx="86" cy="88" r="4.5" fill="#FBF7F0"/>
</svg>`;

// Icon sizes needed for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons
iconSizes.forEach(size => {
  const svgContent = createIconSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svgContent);
  console.log(`Generated ${filename}`);
});

console.log('Icon generation complete!');
console.log('Note: These are placeholder SVG icons. For production, consider creating proper PNG icons using a tool like ImageMagick or an online converter.');
console.log('To convert SVG to PNG, you can use: npx svgexport icon-512x512.svg icon-512x512.png 512:512');
