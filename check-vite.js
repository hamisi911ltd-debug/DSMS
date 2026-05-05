#!/usr/bin/env node
import { readFileSync } from 'fs';

console.log('=== VITE VERSION CHECK ===');

// Check package.json
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
console.log('package.json vite version:', pkg.devDependencies.vite);

// Check installed version
try {
  const vitePkg = JSON.parse(readFileSync('node_modules/vite/package.json', 'utf8'));
  console.log('Installed vite version:', vitePkg.version);
} catch (e) {
  console.log('Could not read installed vite version');
}

// Check if version meets requirements
const viteVersion = pkg.devDependencies.vite.replace('^', '');
const major = parseInt(viteVersion.split('.')[0]);

if (major >= 6) {
  console.log('✅ VITE VERSION IS COMPATIBLE WITH CLOUDFLARE PAGES');
} else {
  console.log('❌ VITE VERSION TOO OLD FOR CLOUDFLARE PAGES');
  process.exit(1);
}

console.log('========================');