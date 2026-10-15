#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function runAudit() {
  const filePath = path.join(__dirname, '..', 'index.html');

  console.log('Running compatibility audit...');

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Failed to read index.html:', error.message);
    process.exit(1);
    return;
  }

  if (typeof content !== 'string') {
    console.error('Failed to read index.html: content is not a string');
    process.exit(1);
    return;
  }

  // Check for viewport meta tag
  const viewportMatch = content.match(/<meta\s+name=["']viewport["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (!viewportMatch) {
    console.error('❌ Missing viewport meta tag');
    process.exit(1);
    return;
  } else {
    const viewportContent = viewportMatch[1];
    console.log(`✅ Found viewport meta tag: ${viewportContent}`);
    
    // Check for important viewport directives
    if (!/width\s*=\s*device-width/i.test(viewportContent)) {
      console.error('❌ Viewport missing width=device-width');
      process.exit(1);
      return;
    }
    if (!/initial-scale\s*=\s*1[\.0]*/i.test(viewportContent)) {
      console.error('❌ Viewport missing initial-scale=1');
      process.exit(1);
      return;
    }
  }

  // Check for deprecated tags
  const deprecatedTags = [
    /<center[^>]*>/i,
    /<font[^>]*>/i,
    /<strike[^>]*>/i,
    /<big[^>]*>/i,
    /<blink[^>]*>/i,
    /<marquee[^>]*>/i,
    /<frameset[^>]*>/i,
    /<frame[^>]*>/i,
    /<noframes[^>]*>/i,
    /<tt[^>]*>/i,
    /<nobr[^>]*>/i
  ];

  let foundDeprecated = false;
  for (const pattern of deprecatedTags) {
    if (content.match(pattern)) {
      console.error(`❌ Found deprecated tag: ${pattern}`);
      foundDeprecated = true;
    }
  }

  if (foundDeprecated) {
    process.exit(1);
    return;
  } else {
    console.log('✅ No deprecated HTML tags found');
  }

  // Check for relative units in CSS (look in style tags and style attributes)
  const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  const styleAttributeMatches = content.match(/style=["'][^"']*["']/gi);

  let hasRelativeUnits = false;

  // Check style tags
  if (styleMatches) {
    for (const match of styleMatches) {
      const cssContent = match.match(/<style[^>]*>([\s\S]*?)<\/style>/i)[1];
      if (/[0-9]+(vw|vh|%|em|rem|ex|ch)/i.test(cssContent)) {
        hasRelativeUnits = true;
        break;
      }
    }
  }

  // Check style attributes
  if (!hasRelativeUnits && styleAttributeMatches) {
    for (const match of styleAttributeMatches) {
      const styleContent = match.match(/style=["']([^"']*)["']/i)[1];
      if (/[0-9]+(vw|vh|%|em|rem|ex|ch)/i.test(styleContent)) {
        hasRelativeUnits = true;
        break;
      }
    }
  }

  if (!hasRelativeUnits) {
    console.error('❌ No relative units found in CSS (consider using vw, vh, %, em, rem for responsive design)');
    process.exit(1);
    return;
  } else {
    console.log('✅ Found relative units in CSS');
  }

  console.log('✅ Compatibility audit passed');
  process.exit(0);
}

runAudit();
