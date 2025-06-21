#!/usr/bin/env node

/**
 * Simple icon generator for PWA
 * This creates basic placeholder icons until proper icons are designed
 */

const fs = require('fs');
const path = require('path');

// SVG template for the VesuviaSearch icon
const createIconSVG = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad1)"/>
  <circle cx="${size * 0.5}" cy="${size * 0.35}" r="${size * 0.15}" fill="white"/>
  <text x="${size * 0.5}" y="${size * 0.75}" font-family="Arial, sans-serif" font-size="${size * 0.25}" font-weight="bold" fill="white" text-anchor="middle">V</text>
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
