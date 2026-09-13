import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');
const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const mapping: Record<string, string> = {};
for (const folder of folders) {
  // Le slug est le nom du dossier lui-même (normalisé)
  const slug = folder
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  mapping[slug] = folder;
}

console.log('export const imageSourceFolderMapping: Record<string, string> = {');
for (const [slug, folder] of Object.entries(mapping).sort()) {
  console.log(`  "${slug}": "${folder}",`);
}
console.log('};');