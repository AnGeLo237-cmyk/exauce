import fs from 'fs';
import path from 'path';
import { products } from '../lib/mock-data';

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');

// Récupère la liste des dossiers réels et leurs fichiers
const realFolders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => {
    const fullPath = path.join(imagesDir, d.name);
    const files = fs.readdirSync(fullPath);
    return { name: d.name, files };
  });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

// Fonction pour trouver le dossier le plus proche d'un produit
function findBestMatch(productName: string): string | null {
  const productSlug = slugify(productName);
  // Extraire la marque (premier mot)
  const brand = productSlug.split('-')[0];

  let best = null;
  let bestScore = 0;

  for (const folder of realFolders) {
    const folderSlug = slugify(folder.name);
    // Score basé sur la présence de la marque et la similarité globale
    let score = 0;
    if (folderSlug.includes(brand) || brand.includes(folderSlug)) {
      score += 0.3;
    }
    // Similarité de Levenshtein sur la chaîne entière
    const dist = levenshtein(productSlug, folderSlug);
    const maxLen = Math.max(productSlug.length, folderSlug.length);
    const sim = 1 - dist / maxLen;
    score += sim * 0.7;

    // Bonus si le dossier contient l'année du produit (si présente)
    const yearMatch = productSlug.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      if (folderSlug.includes(yearMatch[0])) {
        score += 0.2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = folder.name;
    }
  }

  // Seuil minimal pour éviter des correspondances farfelues
  return bestScore > 0.4 ? best : null;
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

// Construction du mapping
const mapping: Record<string, string> = {};
const usedFolders = new Set<string>();

console.log(`🚗 ${products.length} produits à mapper.`);
console.log(`📁 ${realFolders.length} dossiers réels.`);

for (const product of products) {
  const slug = slugify(product.name);
  // Trouver le meilleur dossier
  let matchedFolder = findBestMatch(product.name);
  
  // Si un dossier est trouvé et pas encore utilisé, on l'assigne
  if (matchedFolder) {
    // Gérer les doublons : si le dossier est déjà utilisé, on cherche un autre
    if (usedFolders.has(matchedFolder)) {
      // Essayer de trouver un autre dossier pour ce produit (moins bon)
      // On retire le dossier utilisé de la liste des candidats
      const candidates = realFolders.filter(f => !usedFolders.has(f.name));
      let best2 = null;
      let bestScore2 = 0;
      const productSlug = slug;
      const brand = productSlug.split('-')[0];
      for (const f of candidates) {
        const folderSlug = slugify(f.name);
        let score = 0;
        if (folderSlug.includes(brand) || brand.includes(folderSlug)) score += 0.3;
        const dist = levenshtein(productSlug, folderSlug);
        const maxLen = Math.max(productSlug.length, folderSlug.length);
        const sim = 1 - dist / maxLen;
        score += sim * 0.7;
        const yearMatch = productSlug.match(/\b(19|20)\d{2}\b/);
        if (yearMatch && folderSlug.includes(yearMatch[0])) score += 0.2;
        if (score > bestScore2) {
          bestScore2 = score;
          best2 = f.name;
        }
      }
      if (best2 && bestScore2 > 0.4) {
        matchedFolder = best2;
      } else {
        matchedFolder = null;
      }
    }
  }

  if (matchedFolder) {
    mapping[slug] = matchedFolder;
    usedFolders.add(matchedFolder);
    console.log(`✅ ${product.name} → ${matchedFolder}`);
  } else {
    // Fallback : utiliser le slug (qui n'existera pas → placeholder)
    mapping[slug] = slug;
    console.log(`⚠️ ${product.name} → ${slug} (fallback)`);
  }
}

// Générer le code TypeScript
console.log('\n📝 MAPPING FINAL (à copier dans lib/mock-data.ts) :');
console.log('export const imageFolderMapping: Record<string, string> = {');
const sortedKeys = Object.keys(mapping).sort();
for (const key of sortedKeys) {
  console.log(`  "${key}": "${mapping[key]}",`);
}
console.log('};');

// Statistiques
const mappedToReal = Object.values(mapping).filter(v => realFolders.some(f => f.name === v)).length;
console.log(`\n📊 ${mappedToReal} produits mappés vers des dossiers réels.`);
console.log(`   ${products.length - mappedToReal} produits utiliseront le placeholder.`);