#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '../index.html');
let htmlContent;

try {
  htmlContent = fs.readFileSync(htmlPath, 'utf8');
} catch (error) {
  console.error(`Failed to read HTML file: ${error.message}`);
  process.exit(1);
}

// Check for placeholder text
const placeholderRegex = /Lorem Ipsum/i;
if (placeholderRegex.test(htmlContent)) {
  console.error('Content audit failed: Contains Lorem Ipsum placeholder text.');
  process.exit(1);
}

// Check for TODO/FIXME comments
const todoRegex = /todo|fixme/i;
if (todoRegex.test(htmlContent)) {
  console.error('Content audit failed: Contains TODO or FIXME comments.');
  process.exit(1);
}

// Check for lang attribute on html tag
const langRegex = /<html[^>]*lang=([\"\'])[^\1]*\1/i;
if (!langRegex.test(htmlContent)) {
  console.error('Content audit failed: HTML tag missing lang attribute.');
  process.exit(1);
}

// Check for title element
const titleRegex = /<title>[^<]+<\/title>/;
if (!titleRegex.test(htmlContent)) {
  console.error('Content audit failed: Missing or empty title element.');
  process.exit(1);
}

// Check for meta description
const metaDescRegex = /<meta[^>]*name=([\"\'])description\1[^>]*content=([\"\'])[^\2]*\2/i;
if (!metaDescRegex.test(htmlContent)) {
  console.error('Content audit failed: Missing meta description.');
  process.exit(1);
}

// Check that meta description is not empty
const metaDescContentRegex = /<meta[^>]*name=([\"\'])description\1[^>]*content=([\"\'])([^\2]*?)\2/i;
const match = htmlContent.match(metaDescContentRegex);
if (match && match[3].trim() === '') {
  console.error('Content audit failed: Meta description is empty.');
  process.exit(1);
}

console.log('Content audit passed.');
process.exit(0);
