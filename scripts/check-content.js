#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function runAudit() {
  const filePath = path.join(__dirname, '..', 'index.html');

  console.log('Running content audit...');

  let content;
  try {
    console.log('About to read file');
    content = fs.readFileSync(filePath, 'utf8');
    console.log('File read successfully');
  } catch (error) {
    console.error('Failed to read index.html: ' + error.message);
    console.error('Error object:', error);
    process.exit(1);
    return;
  }

  if (typeof content !== 'string') {
    console.error('Failed to read index.html: content is not a string');
    process.exit(1);
    return;
  }

  // Check for meta description
  const metaDescriptionMatch = content.match(/<meta\s+name=["']description["'][^>]*>/i);
  if (!metaDescriptionMatch) {
    console.error('❌ Missing meta description tag');
    process.exit(1);
    return;
  } else {
    console.log('✅ Found meta description tag');
  }

  // Check for html lang attribute
  const htmlLangMatch = content.match(/<html\s+[^>]*lang=["']([^"']*)["'][^>]*>/i);
  if (!htmlLangMatch) {
    console.error('❌ Missing lang attribute on html tag');
    process.exit(1);
    return;
  } else {
    console.log(`✅ Found lang attribute: ${htmlLangMatch[1]}`);
  }

  // Check for placeholder text
  const placeholderPatterns = [
    /Lorem Ipsum/i,
    /placeholder text/i,
    /sample text/i,
    /your text here/i
  ];

  let foundPlaceholder = false;
  for (const pattern of placeholderPatterns) {
    if (content.match(pattern)) {
      console.error(`❌ Found placeholder text: ${pattern}`);
      foundPlaceholder = true;
    }
  }

  if (foundPlaceholder) {
    process.exit(1);
    return;
  } else {
    console.log('✅ No obvious placeholder text found');
  }

  // Check heading structure (h1 before h2, etc.)
  const headingMatches = content.match(/<h([1-6])[^>]*>/gi);
  if (headingMatches) {
    let prevLevel = 0;
    let headingOrderOK = true;
    for (const match of headingMatches) {
      const level = parseInt(match.match(/<h([1-6])/i)[1]);
      if (level > prevLevel + 1) {
        headingOrderOK = false;
        break;
      }
      prevLevel = level;
    }
    
    if (!headingOrderOK) {
      console.error('❌ Heading structure is not sequential (e.g., h1 followed by h3)');
      process.exit(1);
      return;
    } else {
      console.log('✅ Heading structure is properly sequential');
    }
  } else {
    console.log('ℹ️  No headings found to check structure');
  }

  console.log('✅ Content audit passed');
  process.exit(0);
}

runAudit();
