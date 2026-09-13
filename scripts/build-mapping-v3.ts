// scripts/build-mapping-v3.ts
import fs from 'fs';
import path from 'path';
import { products } from '../lib/mock-data';

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');

// Récupérer les dossiers réels
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

// Extraire les informations d'un nom de dossier
function extractFolderInfo(folder: string): { brand: string; model: string; year: string } {
  const normalized = folder
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  
  // Extraire l'année (4 chiffres)
  const yearMatch = normalized.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : '';
  
  // Extraire la marque (premier mot)
  const parts = normalized.split(' ');
  const brand = parts.length > 0 ? parts[0] : '';
  
  // Le reste est le modèle
  const model = parts.slice(1).join(' ');
  
  return { brand, model, year };
}

// Extraire les informations d'un nom de produit
function extractProductInfo(productName: string): { brand: string; model: string; year: string } {
  const normalized = productName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  
  const yearMatch = normalized.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : '';
  
  const parts = normalized.split(' ');
  const brand = parts.length > 0 ? parts[0] : '';
  const model = parts.slice(1).join(' ');
  
  return { brand, model, year };
}

// Calculer la similarité entre deux chaînes (ratio de Jaro-Winkler ou simple)
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

// Indexer les dossiers réels
const folderInfos = realFolders.map(f => ({
  name: f,
  info: extractFolderInfo(f),
  files: fs.existsSync(path.join(imagesDir, f)) 
    ? fs.readdirSync(path.join(imagesDir, f))
    : []
}));

console.log(`📁 ${realFolders.length} dossiers réels analysés.`);
console.log(`🚗 ${products.length} produits à mapper.`);

const mapping: Record<string, string> = {};
const usedFolders = new Set<string>();

for (const product of products) {
  const productInfo = extractProductInfo(product.name);
  const slug = slugify(product.name);
  
  // 1. Recherche par marque + année + modèle partiel
  let bestMatch = null;
  let bestScore = 0;
  
  for (const folder of folderInfos) {
    if (usedFolders.has(folder.name)) continue;
    
    const fi = folder.info;
    let score = 0;
    
    // Correspondance de marque (obligatoire pour un score > 0)
    if (fi.brand === productInfo.brand) {
      score += 0.3;
    } else if (fi.brand.includes(productInfo.brand) || productInfo.brand.includes(fi.brand)) {
      score += 0.2;
    }
    
    // Correspondance d'année (bonus)
    if (fi.year && productInfo.year && fi.year === productInfo.year) {
      score += 0.3;
    }
    
    // Correspondance de modèle (similarité)
    if (fi.model && productInfo.model) {
      const sim = similarity(fi.model, productInfo.model);
      score += sim * 0.4;
    }
    
    // Si le nom du dossier contient le slug du produit
    const folderSlug = slugify(folder.name);
    if (folderSlug.includes(slug) || slug.includes(folderSlug)) {
      score += 0.2;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = folder;
    }
  }
  
  if (bestMatch && bestScore > 0.3) {
    mapping[slug] = bestMatch.name;
    usedFolders.add(bestMatch.name);
    console.log(`✅ ${product.name} → ${bestMatch.name} (score: ${bestScore.toFixed(2)})`);
  } else {
    // Fallback : utiliser un slug générique
    console.log(`⚠️ ${product.name} → ${slug} (fallback)`);
    mapping[slug] = slug;
  }
}

// Générer le code TypeScript
console.log('\n📝 NOUVEAU MAPPING :');
console.log('export const imageFolderMapping: Record<string, string> = {');
const sortedKeys = Object.keys(mapping).sort();
for (const key of sortedKeys) {
  console.log(`  "${key}": "${mapping[key]}",`);
}
console.log('};');

console.log(`\n📊 Statistiques :`);
console.log(`  ${Object.keys(mapping).length} produits mappés.`);
console.log(`  ${usedFolders.size} dossiers utilisés sur ${realFolders.length}.`);
console.log(`  ${realFolders.length - usedFolders.size} dossiers non utilisés.`);