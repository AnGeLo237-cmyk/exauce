// scripts/clean-overrides.ts
import * as fs from 'fs';
import * as path from 'path';

// ================================================================
// Configuration
// ================================================================
const SCAN_DIRS = ['app', 'components', 'src/app', 'src/components'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORED = ['node_modules', '.next', 'public', 'styles', 'lib', 'scripts'];

const overridesPath = path.join(process.cwd(), 'text-overrides.json');
const reportPath = path.join(process.cwd(), 'clean-overrides-report.json');

// ================================================================
// Normalisation (doit être identique à collect-texts.ts)
// ================================================================
function decodeEntities(text: string): string {
  return text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function normalize(text: string): string {
  return decodeEntities(text).replace(/\s+/g, ' ').trim();
}

// ================================================================
// Lecture des fichiers source
// ================================================================
function walkDir(dir: string, fileList: string[]) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORED.includes(entry.name)) walkDir(fullPath, fileList);
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      fileList.push(fullPath);
    }
  }
}

function loadAllSourceContent(): string {
  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    walkDir(path.join(process.cwd(), dir), allFiles);
  }
  return allFiles
    .map((f) => fs.readFileSync(f, 'utf-8'))
    .join('\n---FILE-SEPARATOR---\n');
}

// ================================================================
// Détection des orphelins
// ================================================================
interface CleanResult {
  total: number;
  orphans: string[];
  valid: string[];
}

function findOrphans(
  overrides: Record<string, string>,
  sourceContent: string
): CleanResult {
  const normalizedSource = normalize(sourceContent);
  const orphans: string[] = [];
  const valid: string[] = [];

  for (const oldText of Object.keys(overrides)) {
    const normalizedOld = normalize(oldText);
    // On cherche le texte normalisé dans le contenu normalisé
    if (normalizedSource.includes(normalizedOld)) {
      valid.push(oldText);
    } else {
      orphans.push(oldText);
    }
  }

  return {
    total: Object.keys(overrides).length,
    orphans,
    valid,
  };
}

// ================================================================
// Main
// ================================================================
function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run') || !args.includes('--apply');
  const isApply = args.includes('--apply');

  if (!fs.existsSync(overridesPath)) {
    console.error(`❌ Fichier introuvable : ${overridesPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(overridesPath, 'utf-8');
  const overrides: Record<string, string> = JSON.parse(raw);

  console.log('Analyse des fichiers source...');
  const sourceContent = loadAllSourceContent();

  console.log('Comparaison avec text-overrides.json...\n');
  const result = findOrphans(overrides, sourceContent);

  // ============================================================
  // Rapport
  // ============================================================
  console.log('════════════════════════════════════════════════');
  console.log('  RAPPORT DE NETTOYAGE — text-overrides.json');
  console.log('════════════════════════════════════════════════');
  console.log(`  Total d'overrides          : ${result.total}`);
  console.log(`  ✅ Valides (encore utilisés) : ${result.valid.length}`);
  console.log(`  🗑️  Orphelins (à supprimer)   : ${result.orphans.length}`);
  console.log('════════════════════════════════════════════════\n');

  // Écrire un rapport JSON détaillé
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        total: result.total,
        valid: result.valid,
        orphans: result.orphans,
      },
      null,
      2
    ),
    'utf-8'
  );
  console.log(`📄 Rapport détaillé : ${reportPath}\n`);

  // Liste des orphelins (affichage limité à 30)
  if (result.orphans.length > 0) {
    console.log('🗑️  Overrides orphelins :');
    const preview = result.orphans.slice(0, 30);
    preview.forEach((key) => {
      const val = overrides[key];
      console.log(`   • "${key}"`);
      console.log(`     → "${val.substring(0, 80)}${val.length > 80 ? '…' : ''}"`);
    });
    if (result.orphans.length > 30) {
      console.log(`   … et ${result.orphans.length - 30} autres (voir le rapport JSON)`);
    }
    console.log('');
  }

  // ============================================================
  // Application du nettoyage
  // ============================================================
  if (isApply) {
    if (result.orphans.length === 0) {
      console.log('✅ Aucun nettoyage nécessaire.');
      return;
    }

    const cleaned: Record<string, string> = {};
    for (const [key, value] of Object.entries(overrides)) {
      if (!result.orphans.includes(key)) {
        cleaned[key] = value;
      }
    }

    // Sauvegarde de l'ancien fichier
    const backupPath = overridesPath + '.backup';
    fs.writeFileSync(backupPath, raw, 'utf-8');
    console.log(`💾 Sauvegarde de l'ancien fichier : ${backupPath}`);

    fs.writeFileSync(
      overridesPath,
      JSON.stringify(cleaned, null, 2),
      'utf-8'
    );
    console.log(`✅ ${result.orphans.length} overrides supprimés.`);
    console.log(`   Nouveau total : ${Object.keys(cleaned).length} overrides.`);
    console.log(`\n➡️  Prochaine étape : npx tsx scripts/apply-overrides.ts`);
  } else if (isDryRun) {
    console.log('ℹ️  Mode simulation (dry-run).');
    console.log('   Pour appliquer le nettoyage, relancez avec --apply :');
    console.log('   npx tsx scripts/clean-overrides.ts --apply\n');
  }
}

main();