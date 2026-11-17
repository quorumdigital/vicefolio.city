#!/usr/bin/env node
'use strict';

// Deduplicate only byte-identical generated linearGradient definitions. Do not
// parse/re-serialize SVGs: path coordinates, colors and every retained byte stay
// untouched. Run after the client build; public source assets are not modified.
const fs = require('node:fs/promises');
const path = require('node:path');

function optimizeSvg(source) {
  const canonical = new Map();
  const remap = new Map();
  let removedGradients = 0;
  let removedDefs = 0;

  // Keep definitions referenced through inheritance/animation rather than
  // changing anything other than the generated local url(#id) references.
  const inherited = new Set();
  for (const match of source.matchAll(/\b(?:xlink:)?href\s*=\s*(["'])#([^"']+)\1/g)) {
    inherited.add(match[2]);
  }

  // Only plain defs containers are eligible. Attributes on a defs parent could
  // supply inherited styles, so those containers must remain exactly as built.
  let result = source.replace(/<defs\s*>([\s\S]*?)<\/defs\s*>/g, (container, content) => {
    let removedHere = 0;
    const nextContent = content.replace(/<linearGradient\b[^>]*(?:\/>|>[\s\S]*?<\/linearGradient\s*>)/g, gradient => {
      const opening = gradient.slice(0, gradient.indexOf('>') + 1);
      const idMatch = /\sid\s*=\s*(["'])([A-Za-z_][A-Za-z0-9_.:-]*)\1/.exec(opening);
      if (!idMatch) return gradient;
      const id = idMatch[2];
      const valueStart = idMatch.index + idMatch[0].indexOf(idMatch[1]) + 1;
      // Preserve attribute order, whitespace, quoting and every non-id byte.
      const signature = gradient.slice(0, valueStart) + '\0' + gradient.slice(valueStart + id.length);
      const firstId = canonical.get(signature);
      if (!firstId) {
        canonical.set(signature, id);
        return gradient;
      }
      if (firstId === id || inherited.has(id)) return gradient;
      remap.set(id, firstId);
      removedGradients++;
      removedHere++;
      return '';
    });
    if (!removedHere) return container;
    if (!nextContent.trim()) {
      removedDefs++;
      return '';
    }
    // Replace the content by offsets; retain the original wrapper serialization.
    const start = container.indexOf('>') + 1;
    return container.slice(0, start) + nextContent + container.slice(start + content.length);
  });

  if (remap.size) {
    result = result.replace(/url\((\s*)(["']?)#([A-Za-z_][A-Za-z0-9_.:-]*)\2(\s*)\)/g,
      (reference, before, quote, id, after) => remap.has(id)
        ? 'url(' + before + quote + '#' + remap.get(id) + quote + after + ')'
        : reference);
  }

  return { source: result, removedGradients, removedDefs };
}

async function svgFiles(directory) {
  const result = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await svgFiles(filename));
    else if (entry.isFile() && /\.svg$/i.test(entry.name)) result.push(filename);
    // Symlinks are deliberately not followed outside the deployment tree.
  }
  return result.sort();
}

async function optimizeDirectory(directory, { dryRun = false } = {}) {
  const summary = {
    directory: path.resolve(directory), dryRun, files: 0, changedFiles: 0,
    beforeBytes: 0, afterBytes: 0, savedBytes: 0,
    removedGradients: 0, removedDefs: 0
  };
  for (const filename of await svgFiles(summary.directory)) {
    const original = await fs.readFile(filename, 'utf8');
    const optimized = optimizeSvg(original);
    const before = Buffer.byteLength(original);
    const after = Buffer.byteLength(optimized.source);
    summary.files++;
    summary.beforeBytes += before;
    summary.afterBytes += after;
    summary.removedGradients += optimized.removedGradients;
    summary.removedDefs += optimized.removedDefs;
    if (original !== optimized.source) {
      summary.changedFiles++;
      if (!dryRun) await fs.writeFile(filename, optimized.source, 'utf8');
    }
  }
  summary.savedBytes = summary.beforeBytes - summary.afterBytes;
  return summary;
}

async function main(args = process.argv.slice(2)) {
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node scripts/optimize-deployment-svg.cjs [--dry-run] [directory]');
    console.log('Default directory: dist/client/assets/lettering (recursive).');
    return;
  }
  const unknown = args.filter(arg => arg.startsWith('-') && arg !== '--dry-run');
  const directories = args.filter(arg => !arg.startsWith('-'));
  if (unknown.length || directories.length > 1) throw new Error('Invalid arguments. Use --help for usage.');
  const directory = directories[0] || path.resolve(__dirname, '../dist/client/assets/lettering');
  const summary = await optimizeDirectory(directory, { dryRun: args.includes('--dry-run') });
  console.log(JSON.stringify(summary, null, 2));
}

module.exports = { optimizeSvg, optimizeDirectory };
if (require.main === module) main().catch(error => {
  console.error('SVG deployment optimization failed:', error.message);
  process.exitCode = 1;
});
