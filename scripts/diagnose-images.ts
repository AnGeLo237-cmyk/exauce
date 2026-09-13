// scripts/diagnose-images.ts
import fs from 'fs';
import path from 'path';
import { products } from '../lib/mock-data';
import { imageFolderMapping } from '../lib/mock-data';

// Fonction slugify (identique à celle utilisée dans le code)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

// Lire les dossiers réels depuis le système de fichiers
const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');
const realFolders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('🔍 DIAGNOSTIC DES IMAGES DE VOITURES');
console.log('='.repeat(60));

// 1. Vérifier que chaque produit a une entrée dans le mapping
console.log('\n📋 PRODUITS SANS MAPPING :');
let missingMapping = 0;
products.forEach(product => {
  const slug = slugify(product.name);
  if (!imageFolderMapping[slug]) {
    console.log(`  ❌ ${product.name} (slug: ${slug}) → Aucun mapping trouvé`);
    missingMapping++;
  }
});
if (missingMapping === 0) console.log('  ✅ Tous les produits ont une entrée dans le mapping.');
console.log(`  Total: ${missingMapping} produits manquants`);

// 2. Vérifier que chaque dossier du mapping existe réellement
console.log('\n📁 DOSSIERS DU MAPPING MANQUANTS SUR LE DISQUE :');
let missingFolders = 0;
const mappingValues = Object.values(imageFolderMapping);
const uniqueFolders = [...new Set(mappingValues)];

uniqueFolders.forEach(folder => {
  if (!realFolders.includes(folder)) {
    console.log(`  ❌ Dossier "${folder}" (mapping) → introuvable sur le disque`);
    missingFolders++;
  }
});
if (missingFolders === 0) console.log('  ✅ Tous les dossiers du mapping existent sur le disque.');
console.log(`  Total: ${missingFolders} dossiers manquants`);

// 3. Vérifier que chaque dossier réel a une entrée dans le mapping (inverse)
console.log('\n📂 DOSSIERS RÉELS SANS CORRESPONDANCE DANS LE MAPPING :');
let unmappedFolders = 0;
realFolders.forEach(folder => {
  // Vérifier si ce dossier est référencé dans le mapping
  const isMapped = Object.values(imageFolderMapping).includes(folder);
  if (!isMapped) {
    console.log(`  ⚠️ Dossier "${folder}" → non référencé dans le mapping`);
    unmappedFolders++;
  }
});
if (unmappedFolders === 0) console.log('  ✅ Tous les dossiers réels sont référencés dans le mapping.');
console.log(`  Total: ${unmappedFolders} dossiers non référencés`);

// 4. Vérifier que les fichiers image existent pour chaque produit
console.log('\n🖼️ PRODUITS SANS IMAGE (fichier _01.jpeg manquant) :');
let missingImages = 0;
products.forEach(product => {
  const slug = slugify(product.name);
  const folder = imageFolderMapping[slug] || slug;
  const expectedFile = path.join(imagesDir, folder, `${folder.replace(/ /g, '_')}_01.jpeg`);
  if (!fs.existsSync(expectedFile)) {
    // Vérifier s'il y a d'autres extensions (jpg, png, etc.)
    const files = fs.existsSync(path.join(imagesDir, folder)) 
      ? fs.readdirSync(path.join(imagesDir, folder))
      : [];
    const hasImage = files.some(f => 
      f.startsWith(folder.replace(/ /g, '_')) && 
      (f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'))
    );
    if (!hasImage) {
      console.log(`  ❌ ${product.name} → Aucune image trouvée dans ${folder}/`);
      console.log(`     Dossier: ${path.join(imagesDir, folder)}`);
      console.log(`     Fichiers présents: ${files.length > 0 ? files.join(', ') : 'Aucun'}`);
      missingImages++;
    }
  }
});
if (missingImages === 0) console.log('  ✅ Tous les produits ont une image _01.jpeg.');
console.log(`  Total: ${missingImages} produits sans image`);

// 5. Résumé
console.log('\n📊 RÉSUMÉ DU DIAGNOSTIC');
console.log('-'.repeat(60));
console.log(`  Produits analysés: ${products.length}`);
console.log(`  Dossiers réels: ${realFolders.length}`);
console.log(`  Entrées dans le mapping: ${Object.keys(imageFolderMapping).length}`);
console.log(`  Produits sans mapping: ${missingMapping}`);
console.log(`  Dossiers manquants sur le disque: ${missingFolders}`);
console.log(`  Dossiers non référencés: ${unmappedFolders}`);
console.log(`  Produits sans image: ${missingImages}`);
console.log('='.repeat(60));

if (missingMapping > 0 || missingFolders > 0 || unmappedFolders > 0 || missingImages > 0) {
  console.log('\n⚠️ Des incohérences ont été détectées. Veuillez consulter les détails ci-dessus.');
} else {
  console.log('\n✅ Toutes les correspondances sont cohérentes !');
}