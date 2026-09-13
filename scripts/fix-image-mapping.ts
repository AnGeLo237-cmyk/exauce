// scripts/fix-image-mapping.ts
import fs from 'fs';
import path from 'path';
import { products } from '../lib/mock-data';
import { imageFolderMapping } from '../lib/mock-data';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');
const realFolders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('🔧 CORRECTION AUTOMATIQUE DU MAPPING');
console.log('='.repeat(60));

// 1. Ajouter les dossiers réels non référencés au mapping
console.log('\n📁 Ajout des dossiers réels non référencés...');
const updatedMapping = { ...imageFolderMapping };
let addedCount = 0;

realFolders.forEach(folder => {
  const isMapped = Object.values(updatedMapping).includes(folder);
  if (!isMapped) {
    // Générer un slug à partir du nom du dossier
    const slug = slugify(folder);
    // Vérifier si le slug existe déjà comme clé
    if (!updatedMapping[slug]) {
      updatedMapping[slug] = folder;
      console.log(`  ✅ Ajouté: "${slug}" → "${folder}"`);
      addedCount++;
    } else {
      console.log(`  ⚠️ Conflit: le slug "${slug}" existe déjà pour "${updatedMapping[slug]}"`);
      console.log(`     Le dossier "${folder}" n'a pas été ajouté.`);
    }
  }
});
console.log(`  ${addedCount} dossiers ajoutés au mapping.`);

// 2. Générer le nouveau mapping en TypeScript
console.log('\n📝 NOUVEAU MAPPING (à copier dans mock-data.ts) :');
console.log('='.repeat(60));
console.log('export const imageFolderMapping: Record<string, string> = {');
const sortedKeys = Object.keys(updatedMapping).sort();
sortedKeys.forEach(key => {
  console.log(`  "${key}": "${updatedMapping[key]}",`);
});
console.log('};');
console.log('='.repeat(60));

// 3. Vérifier les images manquantes
console.log('\n🖼️ VÉRIFICATION DES IMAGES MANQUANTES...');
let missingImages = 0;
const missingProducts: string[] = [];

products.forEach(product => {
  const slug = slugify(product.name);
  const folder = updatedMapping[slug] || slug;
  const fileBase = folder.replace(/ /g, '_');
  const expectedFile = path.join(imagesDir, folder, `${fileBase}_01.jpeg`);
  
  if (!fs.existsSync(expectedFile)) {
    // Chercher une image avec n'importe quelle extension
    const dirPath = path.join(imagesDir, folder);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      const imageFiles = files.filter(f => 
        f.toLowerCase().endsWith('.jpeg') || 
        f.toLowerCase().endsWith('.jpg') || 
        f.toLowerCase().endsWith('.png')
      );
      if (imageFiles.length === 0) {
        missingImages++;
        missingProducts.push(`${product.name} (dossier: ${folder})`);
        console.log(`  ❌ Aucune image dans ${folder}/`);
      } else {
        console.log(`  ✅ ${product.name} → ${imageFiles[0]}`);
      }
    } else {
      console.log(`  ❌ Dossier ${folder} introuvable`);
      missingImages++;
    }
  }
});
console.log(`  ${missingImages} produits sans image.`);

// 4. Suggestion pour les dossiers avec caractères spéciaux
console.log('\n💡 SUGGESTIONS :');
console.log('-'.repeat(60));
const problematicFolders = realFolders.filter(f => 
  /[^a-z0-9-]/i.test(f) || f.includes(' ') || f.includes('&') || f.includes('?')
);
if (problematicFolders.length > 0) {
  console.log('  Ces dossiers contiennent des caractères spéciaux :');
  problematicFolders.forEach(f => console.log(`    - "${f}"`));
  console.log('  Recommandation : renommez-les avec des minuscules et des tirets.');
} else {
  console.log('  ✅ Aucun dossier avec caractères spéciaux.');
}