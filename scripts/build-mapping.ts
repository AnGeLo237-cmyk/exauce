// scripts/build-mapping.ts
import fs from 'fs';
import path from 'path';
import { products } from '../lib/mock-data';

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

// Récupérer les dossiers réels
const realFolders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log(`📁 Dossiers réels : ${realFolders.length}`);
console.log(`🚗 Produits : ${products.length}`);

// Fonction pour normaliser un nom de dossier (identique à celle utilisée pour les produits)
function normalizeFolderName(name: string): string {
  return slugify(name);
}

// Préparer une liste des dossiers avec leur version normalisée
const folderInfos = realFolders.map(f => ({
  original: f,
  normalized: normalizeFolderName(f)
}));

// Mapping final
const mapping: Record<string, string> = {};
const unmatched: string[] = [];

for (const product of products) {
  const productSlug = slugify(product.name);
  
  // 1. Correspondance exacte
  let found = folderInfos.find(f => f.normalized === productSlug);
  if (found) {
    mapping[productSlug] = found.original;
    continue;
  }

  // 2. Le slug du produit est contenu dans le nom normalisé du dossier
  found = folderInfos.find(f => f.normalized.includes(productSlug) || productSlug.includes(f.normalized));
  if (found) {
    mapping[productSlug] = found.original;
    continue;
  }

  // 3. Correspondance par marque (premier mot du slug)
  const brand = productSlug.split('-')[0];
  if (brand) {
    const candidates = folderInfos.filter(f => f.normalized.includes(brand));
    if (candidates.length > 0) {
      // Choisir celui avec la longueur la plus proche (pour éviter les trop longs)
      let best = candidates[0];
      for (const c of candidates) {
        if (Math.abs(c.normalized.length - productSlug.length) < Math.abs(best.normalized.length - productSlug.length)) {
          best = c;
        }
      }
      mapping[productSlug] = best.original;
      continue;
    }
  }

  // 4. Aucune correspondance → fallback sur le slug lui-même
  unmatched.push(productSlug);
  mapping[productSlug] = productSlug; // le dossier sera nommé comme le slug (risque d'erreur)
}

console.log(`\n✅ ${Object.keys(mapping).length - unmatched.length} correspondances trouvées.`);
console.log(`⚠️ ${unmatched.length} produits non résolus.`);

// Générer le code TypeScript pour le mapping
console.log('\n📝 Nouveau mapping (à copier dans lib/mock-data.ts) :');
console.log('export const imageFolderMapping: Record<string, string> = {');
const sortedKeys = Object.keys(mapping).sort();
for (const key of sortedKeys) {
  console.log(`  "${key}": "${mapping[key]}",`);
}
console.log('};');

// Afficher les produits non résolus pour investigation manuelle
if (unmatched.length > 0) {
  console.log('\n⚠️ Produits sans correspondance :');
  for (const slug of unmatched) {
    const product = products.find(p => slugify(p.name) === slug);
    console.log(`  - ${product?.name || slug}`);
  }
}