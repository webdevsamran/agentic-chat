import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const iconsDir = path.join('public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const standardSvg = fs.readFileSync(path.join('src', 'app', 'icon.svg'));
const maskableSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#10b981" />
  <g transform="translate(4,4)" fill="none" stroke="#ffffff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="4.5" width="16" height="10.5" rx="3" />
    <path d="M8 15v4l4-4" />
    <circle cx="14" cy="9.5" r="2" fill="#ffffff" stroke="none" />
  </g>
</svg>`);

async function generate() {
  await sharp(standardSvg).resize(192, 192).png().toFile(path.join(iconsDir, 'icon-192.png'));
  await sharp(standardSvg).resize(512, 512).png().toFile(path.join(iconsDir, 'icon-512.png'));
  await sharp(maskableSvg).resize(512, 512).png().toFile(path.join(iconsDir, 'icon-maskable-512.png'));
  await sharp(standardSvg).resize(180, 180).png().toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  console.log('Icons generated successfully in public/icons/');
}

generate().catch(console.error);
