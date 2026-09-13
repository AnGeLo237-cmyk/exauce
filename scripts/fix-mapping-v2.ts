// scripts/fix-mapping-v2.ts
import fs from 'fs';
import path from 'path';
import { products } from '../lib/mock-data';
import { imageFolderMapping as oldMapping } from '../lib/mock-data';

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');
const realFolders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

// Nettoyer les noms des dossiers pour la comparaison
function cleanFolderName(name: string): string {
  return slugify(name);
}

// Calculer la similarité entre deux chaînes (ratio de correspondance)
function similarity(a: string, b: string): number {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1.0;
  const editDistance = levenshtein(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshtein(a: string, b: string): number {
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i-1][j] + 1,
        matrix[i][j-1] + 1,
        matrix[i-1][j-1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

// Nouveau mapping
const newMapping: Record<string, string> = {};
const usedFolders = new Set<string>();

// 1. D'abord, conserver les correspondances existantes valides
for (const slug of Object.keys(oldMapping)) {
  const folder = oldMapping[slug];
  if (realFolders.includes(folder) && !usedFolders.has(folder)) {
    newMapping[slug] = folder;
    usedFolders.add(folder);
  }
}

// 2. Pour les produits restants, trouver un dossier correspondant
const remainingProducts = products.filter(p => {
  const slug = slugify(p.name);
  return !newMapping[slug];
});

console.log(`📊 ${remainingProducts.length} produits à mapper.`);

for (const product of remainingProducts) {
  const slug = slugify(product.name);
  const brand = slug.split('-')[0];
  
  // Trouver les dossiers non utilisés contenant la marque ou une partie du slug
  const candidates = realFolders.filter(f => !usedFolders.has(f));
  
  let bestMatch = null;
  let bestScore = 0;
  const cleanSlug = slug;
  
  for (const folder of candidates) {
    const cleanFolder = cleanFolderName(folder);
    // Comparaison de similarité
    const score = similarity(cleanSlug, cleanFolder);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = folder;
    }
  }
  
  if (bestMatch && bestScore > 0.4) {
    newMapping[slug] = bestMatch;
    usedFolders.add(bestMatch);
    console.log(`✅ ${product.name} → ${bestMatch} (score: ${bestScore.toFixed(2)})`);
  } else {
    // Fallback : utiliser le slug lui-même (créera un dossier à créer)
    newMapping[slug] = slug;
    console.log(`⚠️ ${product.name} → ${slug} (aucun dossier trouvé, fallback)`);
  }
}

// Générer le code TypeScript
console.log('\n📝 NOUVEAU MAPPING :');
console.log('export const imageFolderMapping: Record<string, string> = {');
const sortedKeys = Object.keys(newMapping).sort();
for (const key of sortedKeys) {
  console.log(`  "${key}": "${newMapping[key]}",`);
}
console.log('};');