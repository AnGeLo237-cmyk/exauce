// scripts/check-slugs.ts
import { rawProductsData, imageSourceFolderMapping } from "../lib/mock-data";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

console.log("🔍 VÉRIFICATION DES SLUGS PRODUITS\n");
console.log("=".repeat(70));
console.log(
  "ID".padEnd(4) +
    "Nom du produit".padEnd(40) +
    "Slug généré".padEnd(25) +
    "✓ Mapping"
);
console.log("=".repeat(70));

let missing = 0;

for (const product of rawProductsData) {
  const slug = slugify(product.name);
  const exists = imageSourceFolderMapping[slug] !== undefined;
  const status = exists ? "✅" : "❌";
  if (!exists) missing++;

  const displayName = product.name.length > 35 ? product.name.slice(0, 35) + "…" : product.name;
  console.log(
    String(product.id).padEnd(4) +
      displayName.padEnd(40) +
      slug.padEnd(25) +
      status
  );
}

console.log("=".repeat(70));
console.log(`\n📊 Total produits : ${rawProductsData.length}`);
console.log(`✅ Produits avec mapping : ${rawProductsData.length - missing}`);
console.log(`❌ Produits SANS mapping : ${missing}`);

if (missing > 0) {
  console.log("\n⚠️ Les produits ci-dessus n'ont pas de dossier correspondant.");
  console.log("   Pour corriger :");
  console.log("   1. Ajustez le nom du produit pour générer le bon slug.");
  console.log("   2. OU ajoutez une entrée dans imageSourceFolderMapping.");
} else {
  console.log("\n✅ Tous les slugs sont valides !");
}