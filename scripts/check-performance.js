#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

const THRESHOLD = Number(process.argv[2]) || 90; // default threshold 90
const URL = 'http://localhost:8080';

console.log(`Running Lighthouse performance audit on ${URL} with threshold ${THRESHOLD}...`);

// Run lighthouse
try {
  execSync(`lighthouse ${URL} --only-categories=performance --output=json --output-path=./lighthouse-report.json`, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to run Lighthouse:', error.message);
  process.exit(1);
}

// Read the report
let report;
try {
  const data = fs.readFileSync('./lighthouse-report.json', 'utf8');
  report = JSON.parse(data);
} catch (error) {
  console.error('Failed to read Lighthouse report:', error.message);
  process.exit(1);
}

const score = report.categories.performance.score * 100; // convert to percentage

if (score < THRESHOLD) {
  console.error(`Performance score ${score.toFixed(2)} is below threshold ${THRESHOLD}`);
  process.exit(1);
} else {
  console.log(`Performance score ${score.toFixed(2)} meets threshold ${THRESHOLD}`);
  process.exit(0);
}
