// scripts/diagnose-detailed.ts
import fs from 'fs';
import path from 'path';
import { products } from '../lib/mock-data';
import { imageFolderMapping } from '../lib/mock-data';

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');
const realFolders = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

// 1. Produits sans image
console.log('🖼️ PRODUITS SANS IMAGE (dossier ou fichier manquant) :');
const productsWithoutImage: { product: any, folder: string, slug: string }[] = [];
for (const product of products) {
  const slug = product.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
  const folder = imageFolderMapping[slug] || slug;
  const fileBase = folder
  const imagePath = path.join(imagesDir, folder, `${fileBase}-01.jpeg`);
  if (!fs.existsSync(imagePath)) {
    productsWithoutImage.push({ product, folder, slug });
    console.log(`  ❌ ${product.name} → dossier : ${folder}, fichier attendu : ${fileBase}-01.jpeg`);
  }
}
console.log(`\nTotal : ${productsWithoutImage.length} produits sans image.\n`);

// 2. Dossiers réels non référencés
console.log('📁 DOSSIERS RÉELS NON RÉFÉRENCÉS DANS LE MAPPING :');
const referencedFolders = Object.values(imageFolderMapping);
const unreferenced = realFolders.filter(f => !referencedFolders.includes(f));
for (const folder of unreferenced) {
  console.log(`  📂 ${folder}`);
  // Afficher les fichiers présents
  const files = fs.readdirSync(path.join(imagesDir, folder));
  const imageFiles = files.filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
  console.log(`     Fichiers : ${imageFiles.join(', ')}`);
}
console.log(`\nTotal : ${unreferenced.length} dossiers non référencés.\n`);

// 3. Dossiers référencés mais inexistants
console.log('📁 DOSSIERS RÉFÉRENCÉS MAIS INEXISTANTS SUR LE DISQUE :');
const referenced = Object.values(imageFolderMapping);
const missing = referenced.filter(f => !realFolders.includes(f));
const uniqueMissing = [...new Set(missing)];
for (const folder of uniqueMissing) {
  console.log(`  ❌ ${folder}`);
}
console.log(`\nTotal : ${uniqueMissing.length} dossiers manquants.\n`);