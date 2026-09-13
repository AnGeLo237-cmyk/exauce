// scripts/rename-files.ts
import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images', 'voitures');

/**
 * Règle de renommage unique :
 * - Remplace uniquement les underscores "_" par des tirets "-"
 * - Ne touche à rien d'autre (casse, accents, espaces, etc.)
 */
function normalizeFileName(name: string): string {
  return name.replace(/_/g, '-');
}

/**
 * Parcourt récursivement un dossier et renomme tous les fichiers
 */
function processDirectory(dir: string, renameMap: Record<string, string>, usedNames: Set<string>) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // On descend dans les sous-dossiers
      processDirectory(fullPath, renameMap, usedNames);
    } else if (entry.isFile()) {
      const oldName = entry.name;
      const newName = normalizeFileName(oldName);

      // Si aucun changement nécessaire
      if (newName === oldName) {
        console.log(`✅ ${path.relative(imagesDir, fullPath)} → inchangé`);
        renameMap[oldName] = newName;
        usedNames.add(path.join(dir, newName));
        continue;
      }

      // Gestion des collisions (même nom après renommage)
      let finalName = newName;
      let counter = 1;
      const ext = path.extname(newName);
      const base = path.basename(newName, ext);

      while (usedNames.has(path.join(dir, finalName)) || fs.existsSync(path.join(dir, finalName))) {
        finalName = `${base}-${counter}${ext}`;
        counter++;
      }

      const newPath = path.join(dir, finalName);

      try {
        fs.renameSync(fullPath, newPath);
        console.log(`🔄 ${path.relative(imagesDir, fullPath)} → ${path.relative(imagesDir, newPath)}`);
        renameMap[oldName] = finalName;
        usedNames.add(newPath);
      } catch (error) {
        console.error(`❌ Erreur lors du renommage de ${fullPath} :`, error);
      }
    }
  }
}

console.log('📁 Renommage des fichiers dans', imagesDir);
console.log('⚠️  Règle appliquée : "_" → "-"');
console.log('⚠️  Assurez-vous d’avoir sauvegardé vos fichiers avant de continuer.\n');

const renameMap: Record<string, string> = {};
const usedNames = new Set<string>();

processDirectory(imagesDir, renameMap, usedNames);

console.log('\n✅ Renommage terminé.');

// Affiche un aperçu du mapping (optionnel)
console.log('\n📝 Aperçu du mapping (anciens noms → nouveaux noms) :');
console.log('export const imageFileMapping: Record<string, string> = {');
Object.entries(renameMap)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .forEach(([oldName, newName]) => {
    console.log(`  "${oldName}": "${newName}",`);
  });
console.log('};');