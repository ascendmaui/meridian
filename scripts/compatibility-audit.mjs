#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runAudit() {
  const htmlPath = path.resolve(__dirname, '../index.html');
  let htmlContent;

  try {
    htmlContent = await fs.promises.readFile(htmlPath, 'utf8');
  } catch (error) {
    console.error(`Failed to read HTML file: ${error.message}`);
    process.exit(1);
  }

  // Check for viewport meta tag
  const viewportRegex = /<meta[^>]*name=([\"\'])viewport\1[^>]*content=([\"\'])[^\2]*\2/i;
  if (!viewportRegex.test(htmlContent)) {
    console.error('Compatibility audit failed: Missing viewport meta tag.');
    process.exit(1);
  }

  // Check that viewport content includes width=device-width
  const viewportContentRegex = /<meta[^>]*name=([\"\'])viewport\1[^>]*content=([\"\'])([^\2]*?)\2/i;
  const match = htmlContent.match(viewportContentRegex);
  if (match) {
    const content = match[3];
    if (!content.includes('width=device-width')) {
      console.error('Compatibility audit failed: Viewport meta tag missing width=device-width.');
      process.exit(1);
    }
  }

  // Check for any fixed width or height in inline styles that might break responsiveness
  // We'll look for style attributes with pixel values that are not zero or maybe large numbers.
  // This is a simple check; we can improve later.
  const inlineStyleRegex = /style=([\"\'])([^\1]*?)\1/g;
  let matchStyle;
  while ((matchStyle = inlineStyleRegex.exec(htmlContent)) !== null) {
    const styleValue = matchStyle[2];
    // Look for pixel values that are not 0px and maybe greater than 100px? We'll flag any px usage for review.
    const pxRegex = /(\d+)px/g;
    let pxMatch;
    while ((pxMatch = pxRegex.exec(styleValue)) !== null) {
      const pixelValue = parseInt(pxMatch[1]);
      if (pixelValue !== 0 && pixelValue > 100) {
        // We'll just warn, not fail, because fixed widths might be intentional for certain elements.
        console.warn(`Compatibility audit warning: Large fixed pixel value ${pixelValue}px found in inline style: ${styleValue}`);
      }
    }
  }

  // Check that the body or container uses relative width/height? We'll skip for now.

  console.log('Compatibility audit passed.');
  process.exit(0);
}

runAudit();
