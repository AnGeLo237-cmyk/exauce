// lib/mock-data.ts
// ============================================================
// FICHIER DE DONNÉES STATIQUES (BACKUP) – TOUS LES VÉHICULES
// ============================================================
// Ce fichier est chargé uniquement côté serveur.
// Il utilise `fs` pour lister les images réelles présentes dans `public/images/voitures/`.
// ATTENTION : Ne pas importer ce fichier dans un composant "use client".
// ============================================================

// ============================================================
// 1. TYPES
// ============================================================
export type Category = "Voiture";

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;              // en FCFA
  rating: number;             // de 0 à 5
  images: string[];           // chemins des images (au moins 1)
  description: string;
  specifications: Record<string, string>;
  stock: number;
  brand: string;
  createdAt: string;          // date d'ajout
};

// ============================================================
// 2. MAPPING COMPLET DES DOSSIERS D'IMAGES (source de vérité)
// ============================================================
// Clé = slug du nom du produit (généré par `slugify`).
// Valeur = nom exact du dossier dans `public/images/voitures/`.
// Ce mapping doit être synchronisé avec l’arborescence réelle des dossiers.
// À compléter manuellement ou via un script de génération.
export const imageSourceFolderMapping: Record<string, string> = {
  // --- Nouveaux mappings pour les slugs manquants (33 ajouts) ---
  "hyundai-elantra-2021": "hyundai-elantra-2021-elegance-economie-confort",
  "hyundai-tucson": "hyundai-tucson-2017-moderne-economique-confortable",
  "hyundai-tucson-2017": "hyundai-tucson-2017-moderne-economique-confortable",
  "hyundai-tucson-2021": "hyundai-tucson-2021-full-options-confort-fiabilite",
  "hyundai-veloster-2019": "hyundai-veloster-2019-sportive-moderne-fiable",
  "jeep-grand-cherokee": "jeep-grand-cherokee-high-altitude-2018-luxe-puissance-technologie",
  "jetour-dashing": "jetour-dashing-2025-full-options-luxe-etat-neuf",
  "jetour-t1": "jetour-t1-1-5t-2026-modernite-technologie-performance",
  "jetour-t1-phev": "jetour-t1-phev-2026-technologie-puissance-economie",
  "jetour-t2": "jetour-t2-travel-2025-luxe-aventure-performance",
  "kia-pegas": "kia-pegas-1-4-ex-2021-economique-fiable-prete-a-rouler",
  "kia-sportage-2023": "kia-sportage-2023-design-confort-technologie",
  "kia-telluride": "kia-telluride-2023-luxe-espace-performance",
  "lexus-nx-250": "lexus-nx-250-2023-luxe-technologie-performance",
  "lexus-rx450h": "lexus-rx450h-executive-2020-luxe-puissance-economie-hybride",
  "mazda-3": "mazda-3-sport-hatchback-skyactiv-2017-sportive-fiable-economique",
  "mazda3": "mazda-3-sport-hatchback-skyactiv-2017-sportive-fiable-economique",
  "mercedes-benz-a200": "mercedes-benz-a200-2024-luxe-elegance-technologie",
  "mercedes-benz-e220d": "mercedes-benz-e220d-exclusive-lwb-2022-luxe-elegance-confort-absolu",
  "mercedes-benz-ml-350": "mercedes-benz-ml-350-2015-luxe-puissance-confort",
  "mercedes-benz-ml-500": "mercedes-benz-ml500-4matic-2015-puissance-luxe-confort-absolu",
  "mitsubishi-pajero-sport": "mitsubishi-pajero-3-8-v6-2011-puissance-robustesse-confort",
  "peugeot-2008": "peugeot-2008-gtl-2017-le-charme-francais-a-petit-prix",
  "peugeot-traveller": "peugeot-traveller-business-vip-2024-gcc",
  "ram-1500": "ram-1500-trx-havoc-edition-2023",
  "serie-speciale-petit-budget": "serie-speciale-petit-budget-hyundai-accent-2019-hyundai-elantra-2020",
  "toyota-c-hr-2021": "toyota-c-hr-2021-design-economie-technologi",
  "toyota-camry": "toyota-camry-se-sport-2007-opportunite-exceptionnelle",
  "toyota-coaster": "toyota-coaster-2025-le-minibus-de-reference-pour-le-transport-professionnel",
  "toyota-corolla-2024": "toyota-corolla-2024-modernite-fiabilite-economie",
  "toyota-avensis": "toyota-avensis-tete-de-cochon-occasion-belgique",
  "honda-civic": "honda-civic-lx-sport-2020",
  "haval-jolion-1-5t-2021": "haval-jolion-1-5t-2021-modernite-confort-technologi",

  // --- Mappings existants (conservés) ---
  "changan-deepal-s07": "changan-deepal-s07",
  "haval-jolion": "haval-jolion",
  "hyundai-grandeur": "hyundai-grandeur",
  "hyundai-grandeur-hybrid": "hyundai-grandeur-hybrid",
  "hyundai-santa-fe": "hyundai-santa-fe",
  "hyundai-santa-fe-2013": "hyundai-santa-fe-2013-confort-puissance-elegance",
  "jac-j7": "jac-j7",
  "kia-sorento": "kia-sorento",
  "kia-sportage": "kia-sportage",
  "kia-telluride-xline": "kia-telluride-xline",
  "mazda-cx5": "mazda-cx5",
  "mercedes-amg-gle-53-2021": "mercedes-amg-gle-53-2021",
  "mercedes-amg-gle-53-2023": "mercedes-amg-gle-53-2023",
  "toyota-4runner-sr5": "toyota-4runner-sr5",

  // --- Dossiers supplémentaires (non utilisés, mais conservés pour cohérence) ---
  "jeep-grand-cherokee-high-altitude-2018-luxe-puissance-technologie-1": "jeep-grand-cherokee-high-altitude-2018-luxe-puissance-technologie-1",
  "jetour-t1-1-5t-2026-modernite-technologie-performance-1": "jetour-t1-1-5t-2026-modernite-technologie-performance-1",
  "kia-sportage-2023-design-confort-technologie-1": "kia-sportage-2023-design-confort-technologie-1",
  "lexus-nx-250-2023-luxe-technologie-performance-1": "lexus-nx-250-2023-luxe-technologie-performance-1",
  // etc. (si vous voulez conserver toutes les valeurs existantes, gardez-les toutes)
  // Pour simplifier, j'ai inclus toutes les entrées précédentes ci-dessous :
  "kia-telluride-2023-luxe-espace-performance": "kia-telluride-2023-luxe-espace-performance",
  "lexus-rx450h-executive-2020-luxe-puissance-economie-hybride": "lexus-rx450h-executive-2020-luxe-puissance-economie-hybride",
  "mazda-3-sport-hatchback-skyactiv-2017-sportive-fiable-economique": "mazda-3-sport-hatchback-skyactiv-2017-sportive-fiable-economique",
  "mercedes-benz-a200-2024-luxe-elegance-technologie": "mercedes-benz-a200-2024-luxe-elegance-technologie",
  "mercedes-benz-e220d-exclusive-lwb-2022-luxe-elegance-confort-absolu": "mercedes-benz-e220d-exclusive-lwb-2022-luxe-elegance-confort-absolu",
  "mercedes-benz-ml-350-2015-luxe-puissance-confort": "mercedes-benz-ml-350-2015-luxe-puissance-confort",
  "mercedes-benz-ml500-4matic-2015-puissance-luxe-confort-absolu": "mercedes-benz-ml500-4matic-2015-puissance-luxe-confort-absolu",
  "mitsubishi-pajero-3-8-v6-2011-puissance-robustesse-confort": "mitsubishi-pajero-3-8-v6-2011-puissance-robustesse-confort",
  "peugeot-2008-gtl-2017-le-charme-francais-a-petit-prix": "peugeot-2008-gtl-2017-le-charme-francais-a-petit-prix",
  "peugeot-traveller-business-vip-2024-gcc": "peugeot-traveller-business-vip-2024-gcc",
  "ram-1500-trx-havoc-edition-2023": "ram-1500-trx-havoc-edition-2023",
  "serie-speciale-petit-budget-hyundai-accent-2019-hyundai-elantra-2020": "serie-speciale-petit-budget-hyundai-accent-2019-hyundai-elantra-2020",
  "toyota-avensis-tete-de-cochon-occasion-belgique": "toyota-avensis-tete-de-cochon-occasion-belgique",
  "toyota-c-hr-2021-design-economie-technologi": "toyota-c-hr-2021-design-economie-technologi",
  "toyota-camry-se-sport-2007-opportunite-exceptionnelle": "toyota-camry-se-sport-2007-opportunite-exceptionnelle",
  "toyota-coaster-2025-le-minibus-de-reference-pour-le-transport-professionnel": "toyota-coaster-2025-le-minibus-de-reference-pour-le-transport-professionnel",
  "toyota-corolla-2024-modernite-fiabilite-economie": "toyota-corolla-2024-modernite-fiabilite-economie",
  "hyundai-elantra-2021-elegance-economie-confort": "hyundai-elantra-2021-elegance-economie-confort",
  "hyundai-tucson-2017-moderne-economique-confortable": "hyundai-tucson-2017-moderne-economique-confortable",
  "hyundai-tucson-2021-full-options-confort-fiabilite": "hyundai-tucson-2021-full-options-confort-fiabilite",
  "hyundai-veloster-2019-sportive-moderne-fiable": "hyundai-veloster-2019-sportive-moderne-fiable",
  "jeep-grand-cherokee-high-altitude-2018-luxe-puissance-technologie": "jeep-grand-cherokee-high-altitude-2018-luxe-puissance-technologie",
  "jetour-dashing-2025-full-options-luxe-etat-neuf": "jetour-dashing-2025-full-options-luxe-etat-neuf",
  "jetour-t1-1-5t-2026-modernite-technologie-performance": "jetour-t1-1-5t-2026-modernite-technologie-performance",
  "jetour-t1-phev-2026-technologie-puissance-economie": "jetour-t1-phev-2026-technologie-puissance-economie",
  "jetour-t2-travel-2025-luxe-aventure-performance": "jetour-t2-travel-2025-luxe-aventure-performance",
  "kia-pegas-1-4-ex-2021-economique-fiable-prete-a-rouler": "kia-pegas-1-4-ex-2021-economique-fiable-prete-a-rouler",
  "kia-sportage-2023-design-confort-technologie": "kia-sportage-2023-design-confort-technologie",
  "lexus-nx-250-2023-luxe-technologie-performance": "lexus-nx-250-2023-luxe-technologie-performance",
  "honda-civic-lx-sport-2020": "honda-civic-lx-sport-2020",
  "haval-jolion-1-5t-2021-modernite-confort-technologi": "haval-jolion-1-5t-2021-modernite-confort-technologi",
};

// ============================================================
// 3. FONCTIONS UTILITAIRES
// ============================================================

/**
 * Transforme un nom de produit en slug utilisable dans les URLs.
 * Exemple : "Mazda CX-5" → "mazda-cx-5"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")                       // décompose les accents
    .replace(/[\u0300-\u036f]/g, "")        // supprime les accents
    .replace(/[^a-z0-9]+/g, "-")            // remplace tout sauf lettres/chiffres par un tiret
    .replace(/-+/g, "-")                    // réduit les tirets multiples
    .replace(/^-|-$/g, "");                 // supprime les tirets en début/fin
}

/**
 * Génère les chemins d'images pour un produit donné.
 * Retourne un tableau de 4 chemins génériques (suffixes _01 à _04).
 * Les fichiers manquants seront gérés par le composant ProductCard.
 */
function getImagePaths(productName: string): string[] {
  const slug = slugify(productName);
  const folder = imageSourceFolderMapping[slug] || slug;
  const maxImages = 6;
  const paths: string[] = [];
  for (let i = 1; i <= maxImages; i++) {
    const suffix = String(i).padStart(2, '0');
    paths.push(`/images/voitures/${folder}/${folder}-${suffix}.jpg`);
  }
  return paths;
}

// ============================================================
// 4. DONNÉES BRUTES DES PRODUITS (sans les images)
// ============================================================
// Chaque produit doit avoir un nom qui correspond (après `slugify`) à une clé
// dans `imageSourceFolderMapping`, ou alors le fallback sera utilisé.
// À compléter avec vos 12 (ou plus) produits.
export const rawProductsData: Omit<Product, "images">[] = [
  // 1. Mercedes-AMG GLE 53 2023
  {
    id: 1,
    name: "Mercedes-AMG GLE 53 2023",
    category: "Voiture",
    price: 10000000,
    rating: 4.9,
    description: "Mercedes-AMG GLE 53 version européenne. Véhicule neuf (0 km). Toit panoramique, MBUX, caméra 360°.",
    specifications: { Année: "2023", Kilométrage: "0 km", Carburant: "Essence", Moteur: "3.0L Turbo 435 ch", "Boîte de vitesse": "Automatique 4MATIC+", Couleur: "Noir" },
    stock: 16, brand: "Mercedes-Benz", createdAt: "2025-02-01",
  },
  // 2. Toyota 4Runner SR5
  {
    id: 2,
    name: "Toyota 4Runner SR5",
    category: "Voiture",
    price: 6800000,
    rating: 4.5,
    description: "Toyota 4Runner SR5 robuste et fiable. Idéal pour les longs trajets et terrains difficiles.",
    specifications: { Année: "2021", Kilométrage: "45 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 19, brand: "Toyota", createdAt: "2025-02-10",
  },
  // 3. Hyundai Grandeur
  {
    id: 3,
    name: "Hyundai Grandeur",
    category: "Voiture",
    price: 5000000,
    rating: 4.4,
    description: "Hyundai Grandeur importé de Corée du Sud. Excellent état, sellerie cuir.",
    specifications: { Année: "2020", Kilométrage: "319 000 km", Carburant: "GPL (LPi)", Moteur: "3.0L", "Boîte de vitesse": "Automatique Tiptronic", Couleur: "Noir" },
    stock: 8, brand: "Hyundai", createdAt: "2025-03-15",
  },
  // 4. Hyundai Santa Fe 2013
  {
    id: 4,
    name: "Hyundai Santa Fe 2013",
    category: "Voiture",
    price: 2800000,
    rating: 4.2,
    description: "Hyundai Santa Fe 2013 — Confort, puissance & élégance. Véhicule contrôlé.",
    specifications: { Année: "2013", Kilométrage: "180 000 km", Carburant: "Diesel", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 10, brand: "Hyundai", createdAt: "2025-04-01",
  },
  // 5. Kia Sportage
  {
    id: 5,
    name: "Kia Sportage",
    category: "Voiture",
    price: 5500000,
    rating: 4.4,
    description: "Kia Sportage moderne avec écran tactile et caméra de recul.",
    specifications: { Année: "2023", Kilométrage: "18 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Rouge" },
    stock: 24, brand: "Kia", createdAt: "2025-06-10",
  },
  // 6. Mazda CX5 (ajusté : suppression du tiret pour correspondre au dossier mazda-cx5)
  {
    id: 6,
    name: "Mazda CX5",
    category: "Voiture",
    price: 5800000,
    rating: 4.5,
    description: "Mazda CX-5 – Design raffiné et conduite dynamique.",
    specifications: { Année: "2022", Kilométrage: "25 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Bleu" },
    stock: 13, brand: "Mazda", createdAt: "2025-06-20",
  },
  // 7. Kia Sorento
  {
    id: 7,
    name: "Kia Sorento",
    category: "Voiture",
    price: 6800000,
    rating: 4.5,
    description: "Kia Sorento – Grand SUV 7 places, idéal pour les familles nombreuses.",
    specifications: { Année: "2023", Kilométrage: "15 000 km", Carburant: "Diesel", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 10, brand: "Kia", createdAt: "2025-09-01",
  },
  // 8. Kia Telluride
  {
    id: 8,
    name: "Kia Telluride",
    category: "Voiture",
    price: 9200000,
    rating: 4.7,
    description: "Kia Telluride – Grand SUV 8 places. Luxe et espace exceptionnels.",
    specifications: { Année: "2022", Kilométrage: "20 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 5, brand: "Kia", createdAt: "2025-11-25",
  },
  // 9. Toyota Camry
  {
    id: 9,
    name: "Toyota Camry",
    category: "Voiture",
    price: 5500000,
    rating: 4.6,
    description: "Toyota Camry – Berline fiable et confortable.",
    specifications: { Année: "2022", Kilométrage: "28 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 15, brand: "Toyota", createdAt: "2025-12-10",
  },
  // 10. Honda Civic
  {
    id: 10,
    name: "Honda Civic",
    category: "Voiture",
    price: 4500000,
    rating: 4.4,
    description: "Honda Civic – Berline compacte dynamique et fiable.",
    specifications: { Année: "2023", Kilométrage: "12 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Rouge" },
    stock: 22, brand: "Honda", createdAt: "2026-07-01",
  },
  // 11. Mazda3
  {
    id: 11,
    name: "Mazda3",
    category: "Voiture",
    price: 4200000,
    rating: 4.4,
    description: "Mazda3 – Berline compacte au design premium et conduite sportive.",
    specifications: { Année: "2022", Kilométrage: "18 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Gris" },
    stock: 11, brand: "Mazda", createdAt: "2026-07-05",
  },
  // 12. Hyundai Tucson
  {
    id: 12,
    name: "Hyundai Tucson",
    category: "Voiture",
    price: 5200000,
    rating: 4.4,
    description: "Hyundai Tucson – SUV compact moderne et bien équipé.",
    specifications: { Année: "2022", Kilométrage: "25 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 14, brand: "Hyundai", createdAt: "2026-07-10",
  },
  // ----- NOUVEAUX PRODUITS (13 à 30) -----
  // 13. Mercedes-AMG GLE 53 2021
  {
    id: 13,
    name: "Mercedes-AMG GLE 53 2021",
    category: "Voiture",
    price: 9500000,
    rating: 4.8,
    description: "Mercedes-AMG GLE 53 version 2021. Performance et luxe réunis.",
    specifications: { Année: "2021", Kilométrage: "15 000 km", Carburant: "Essence", Moteur: "3.0L Turbo 435 ch", "Boîte de vitesse": "Automatique 4MATIC+", Couleur: "Gris" },
    stock: 18, brand: "Mercedes-Benz", createdAt: "2025-02-15",
  },
  // 14. Toyota C-HR 2021
  {
    id: 14,
    name: "Toyota C-HR 2021",
    category: "Voiture",
    price: 4600000,
    rating: 4.3,
    description: "Toyota C-HR 2021 – Design, économie & technologie.",
    specifications: { Année: "2021", Kilométrage: "22 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Bleu" },
    stock: 20, brand: "Toyota", createdAt: "2025-03-01",
  },
  // 15. Toyota Corolla 2024
  {
    id: 15,
    name: "Toyota Corolla 2024",
    category: "Voiture",
    price: 5800000,
    rating: 4.6,
    description: "Toyota Corolla 2024 – Modernité, fiabilité & économie.",
    specifications: { Année: "2024", Kilométrage: "12 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 9, brand: "Toyota", createdAt: "2025-03-20",
  },
  // 16. Hyundai Elantra 2021
  {
    id: 16,
    name: "Hyundai Elantra 2021",
    category: "Voiture",
    price: 3800000,
    rating: 4.2,
    description: "Hyundai Elantra 2021 – Élégance, économie & confort.",
    specifications: { Année: "2021", Kilométrage: "30 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 28, brand: "Hyundai", createdAt: "2025-04-15",
  },
  // 17. Hyundai Veloster 2019
  {
    id: 17,
    name: "Hyundai Veloster 2019",
    category: "Voiture",
    price: 4200000,
    rating: 4.3,
    description: "Hyundai Veloster 2019 – Sportive, moderne & fiable.",
    specifications: { Année: "2019", Kilométrage: "35 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Rouge" },
    stock: 15, brand: "Hyundai", createdAt: "2025-05-01",
  },
  // 18. Hyundai Tucson 2021
  {
    id: 18,
    name: "Hyundai Tucson 2021",
    category: "Voiture",
    price: 6200000,
    rating: 4.5,
    description: "Hyundai Tucson 2021 – Full options, confort & fiabilité.",
    specifications: { Année: "2021", Kilométrage: "18 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 15, brand: "Hyundai", createdAt: "2025-05-20",
  },
  // 19. Kia Sportage 2023 (modèle spécifique)
  {
    id: 19,
    name: "Kia Sportage 2023",
    category: "Voiture",
    price: 6200000,
    rating: 4.6,
    description: "Kia Sportage 2023 – Design, confort & technologie.",
    specifications: { Année: "2023", Kilométrage: "10 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Gris" },
    stock: 27, brand: "Kia", createdAt: "2025-06-01",
  },
  // 20. Kia Telluride Xline (ajusté : suppression du tiret après X)
  {
    id: 20,
    name: "Kia Telluride Xline",
    category: "Voiture",
    price: 9800000,
    rating: 4.7,
    description: "Kia Telluride X-Line – Version sportive du grand SUV.",
    specifications: { Année: "2022", Kilométrage: "15 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 13, brand: "Kia", createdAt: "2025-06-15",
  },
  // 21. Peugeot 2008 (ajusté : retrait de "GTL")
  {
    id: 21,
    name: "Peugeot 2008",
    category: "Voiture",
    price: 3800000,
    rating: 4.2,
    description: "Peugeot 2008 GTL 2017 – Le charme français à petit prix.",
    specifications: { Année: "2017", Kilométrage: "45 000 km", Carburant: "Essence", "Boîte de vitesse": "Manuelle", Couleur: "Blanc" },
    stock: 15, brand: "Peugeot", createdAt: "2025-07-01",
  },
  // 22. Peugeot Traveller (ajusté : retrait de "VIP")
  {
    id: 22,
    name: "Peugeot Traveller",
    category: "Voiture",
    price: 6800000,
    rating: 4.4,
    description: "Peugeot Traveller Business VIP 2024 – Confort et prestige.",
    specifications: { Année: "2024", Kilométrage: "8 000 km", Carburant: "Diesel", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 17, brand: "Peugeot", createdAt: "2025-07-15",
  },
  // 23. Ram 1500 (ajusté : retrait de "TRX")
  {
    id: 23,
    name: "Ram 1500",
    category: "Voiture",
    price: 15000000,
    rating: 4.9,
    description: "Ram 1500 TRX Havoc Edition 2023 – Puissance et robustesse extrêmes.",
    specifications: { Année: "2023", Kilométrage: "5 000 km", Carburant: "Essence", Moteur: "6.2L V8", "Boîte de vitesse": "Automatique", Couleur: "Rouge" },
    stock: 10, brand: "Ram", createdAt: "2025-08-01",
  },
  // 24. Jeep Grand Cherokee (ajusté : retrait de "High Altitude")
  {
    id: 24,
    name: "Jeep Grand Cherokee",
    category: "Voiture",
    price: 12000000,
    rating: 4.7,
    description: "Jeep Grand Cherokee High Altitude 2018 – Luxe, puissance & technologie.",
    specifications: { Année: "2018", Kilométrage: "25 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 5, brand: "Jeep", createdAt: "2025-08-15",
  },
  // 25. Lexus NX 250 (inchangé)
  {
    id: 25,
    name: "Lexus NX 250",
    category: "Voiture",
    price: 7800000,
    rating: 4.6,
    description: "Lexus NX 250 2023 – Luxe, technologie & performance.",
    specifications: { Année: "2023", Kilométrage: "12 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 4, brand: "Lexus", createdAt: "2025-09-01",
  },
  // 26. Lexus RX450h (inchangé)
  {
    id: 26,
    name: "Lexus RX450h",
    category: "Voiture",
    price: 9500000,
    rating: 4.8,
    description: "Lexus RX450h Executive 2020 – Luxe, puissance & économie hybride.",
    specifications: { Année: "2020", Kilométrage: "28 000 km", Carburant: "Hybride", "Boîte de vitesse": "Automatique", Couleur: "Gris" },
    stock: 18, brand: "Lexus", createdAt: "2025-09-15",
  },
  // 27. Mitsubishi Pajero Sport (inchangé)
  {
    id: 27,
    name: "Mitsubishi Pajero Sport",
    category: "Voiture",
    price: 6500000,
    rating: 4.4,
    description: "Mitsubishi Pajero 3.8 V6 2011 – Puissance, robustesse & confort.",
    specifications: { Année: "2011", Kilométrage: "55 000 km", Carburant: "Essence", Moteur: "3.8L V6", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 19, brand: "Mitsubishi", createdAt: "2025-10-01",
  },
  // 28. JAC J7 (inchangé)
  {
    id: 28,
    name: "JAC J7",
    category: "Voiture",
    price: 3500000,
    rating: 4.0,
    description: "JAC J7 – Berline compacte abordable et fiable.",
    specifications: { Année: "2021", Kilométrage: "20 000 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 20, brand: "JAC", createdAt: "2025-10-15",
  },
  // 29. Jetour Dashing (inchangé)
  {
    id: 29,
    name: "Jetour Dashing",
    category: "Voiture",
    price: 7800000,
    rating: 4.5,
    description: "Jetour Dashing 2025 – Full options, luxe & état neuf.",
    specifications: { Année: "2025", Kilométrage: "0 km", Carburant: "Essence", "Boîte de vitesse": "Automatique", Couleur: "Bleu" },
    stock: 12, brand: "Jetour", createdAt: "2025-11-01",
  },
  // 30. Toyota Coaster (inchangé)
  {
    id: 30,
    name: "Toyota Coaster",
    category: "Voiture",
    price: 14500000,
    rating: 4.6,
    description: "Toyota Coaster 2025 – Le minibus de référence pour le transport professionnel.",
    specifications: { Année: "2025", Kilométrage: "2 000 km", Carburant: "Diesel", "Boîte de vitesse": "Manuelle", Couleur: "Blanc" },
    stock: 18, brand: "Toyota", createdAt: "2025-11-10",
  },
  // 31. Changan Deepal S07
  {
    id: 31,
    name: "Changan Deepal S07",
    category: "Voiture",
    price: 4500000,
    rating: 4.3,
    description: "Changan Deepal S07 – SUV électrique moderne et bien équipé.",
    specifications: { Année: "2024", Kilométrage: "8 000 km", Carburant: "Électrique", Moteur: "Moteur électrique", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 14, brand: "Changan", createdAt: "2025-01-20",
  },
  // 32. Haval Jolion 1.5T 2021
  {
    id: 32,
    name: "Haval Jolion 1.5T 2021",
    category: "Voiture",
    price: 4200000,
    rating: 4.2,
    description: "Haval Jolion 1.5T 2021 – Modernité, confort & technologie.",
    specifications: { Année: "2021", Kilométrage: "25 000 km", Carburant: "Essence", Moteur: "1.5L Turbo", "Boîte de vitesse": "Automatique", Couleur: "Gris" },
    stock: 22, brand: "Haval", createdAt: "2025-01-25",
  },
  // 33. Hyundai Grandeur Hybrid
  {
    id: 33,
    name: "Hyundai Grandeur Hybrid",
    category: "Voiture",
    price: 6000000,
    rating: 4.5,
    description: "Hyundai Grandeur Hybrid – Luxe, puissance & économie hybride.",
    specifications: { Année: "2022", Kilométrage: "18 000 km", Carburant: "Hybride", Moteur: "2.5L Hybrid", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 11, brand: "Hyundai", createdAt: "2025-02-01",
  },
  // 34. Hyundai Santa Fe
  {
    id: 34,
    name: "Hyundai Santa Fe",
    category: "Voiture",
    price: 5500000,
    rating: 4.4,
    description: "Hyundai Santa Fe – SUV familial confortable et fiable.",
    specifications: { Année: "2020", Kilométrage: "35 000 km", Carburant: "Essence", Moteur: "2.4L", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 10, brand: "Hyundai", createdAt: "2025-02-05",
  },
  // 35. Jetour T1
  {
    id: 35,
    name: "Jetour T1",
    category: "Voiture",
    price: 7800000,
    rating: 4.6,
    description: "Jetour T1 1.5T 2026 – Modernité, technologie & performance.",
    specifications: { Année: "2026", Kilométrage: "5 000 km", Carburant: "Essence", Moteur: "1.5L Turbo", "Boîte de vitesse": "Automatique", Couleur: "Bleu" },
    stock: 16, brand: "Jetour", createdAt: "2025-02-10",
  },
  // 36. Jetour T1 PHEV
  {
    id: 36,
    name: "Jetour T1 PHEV",
    category: "Voiture",
    price: 8800000,
    rating: 4.7,
    description: "Jetour T1 PHEV 2026 – Technologie, puissance & économie.",
    specifications: { Année: "2026", Kilométrage: "3 000 km", Carburant: "Hybride rechargeable", Moteur: "1.5L Turbo + électrique", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 12, brand: "Jetour", createdAt: "2025-02-15",
  },
  // 37. Jetour T2
  {
    id: 37,
    name: "Jetour T2",
    category: "Voiture",
    price: 9500000,
    rating: 4.8,
    description: "Jetour T2 Travel+ 2025 – Luxe, aventure & performance.",
    specifications: { Année: "2025", Kilométrage: "2 000 km", Carburant: "Essence", Moteur: "2.0L Turbo", "Boîte de vitesse": "Automatique", Couleur: "Noir" },
    stock: 10, brand: "Jetour", createdAt: "2025-02-20",
  },
  // 38. Kia Pegas
  {
    id: 38,
    name: "Kia Pegas",
    category: "Voiture",
    price: 3500000,
    rating: 4.0,
    description: "Kia Pegas 1.4 EX 2021 – Économique, fiable & prête à rouler.",
    specifications: { Année: "2021", Kilométrage: "28 000 km", Carburant: "Essence", Moteur: "1.4L", "Boîte de vitesse": "Automatique", Couleur: "Rouge" },
    stock: 20, brand: "Kia", createdAt: "2025-03-01",
  },
  // 39. Mercedes-Benz A200
  {
    id: 39,
    name: "Mercedes-Benz A200",
    category: "Voiture",
    price: 7800000,
    rating: 4.5,
    description: "Mercedes-Benz A200 2024 – Luxe, élégance & technologie.",
    specifications: { Année: "2024", Kilométrage: "10 000 km", Carburant: "Essence", Moteur: "1.3L Turbo", "Boîte de vitesse": "Automatique 7 vitesses", Couleur: "Gris" },
    stock: 10, brand: "Mercedes-Benz", createdAt: "2025-03-05",
  },
  // 40. Mercedes-Benz E220d
  {
    id: 40,
    name: "Mercedes-Benz E220d",
    category: "Voiture",
    price: 12000000,
    rating: 4.7,
    description: "Mercedes-Benz E220d Exclusive LWB 2022 – Luxe, élégance & confort absolu.",
    specifications: { Année: "2022", Kilométrage: "15 000 km", Carburant: "Diesel", Moteur: "2.0L Turbo Diesel", "Boîte de vitesse": "Automatique 9 vitesses", Couleur: "Noir" },
    stock: 17, brand: "Mercedes-Benz", createdAt: "2025-03-10",
  },
  // 41. Hyundai Tucson 2017
  {
    id: 41,
    name: "Hyundai Tucson 2017",
    category: "Voiture",
    price: 4800000,
    rating: 4.3,
    description: "Hyundai Tucson 2017 – Moderne, économique & confortable.",
    specifications: { Année: "2017", Kilométrage: "55 000 km", Carburant: "Essence", Moteur: "2.0L", "Boîte de vitesse": "Automatique", Couleur: "Gris" },
    stock: 18, brand: "Hyundai", createdAt: "2025-04-01",
  },
  // 42. Mercedes-Benz ML 350
  {
    id: 42,
    name: "Mercedes-Benz ML 350",
    category: "Voiture",
    price: 8500000,
    rating: 4.6,
    description: "Mercedes-Benz ML 350 2015 – Luxe, puissance & confort.",
    specifications: { Année: "2015", Kilométrage: "65 000 km", Carburant: "Essence", Moteur: "3.5L V6", "Boîte de vitesse": "Automatique 7 vitesses", Couleur: "Noir" },
    stock: 17, brand: "Mercedes-Benz", createdAt: "2025-04-05",
  },
  // 43. Mercedes-Benz ML 500
  {
    id: 43,
    name: "Mercedes-Benz ML 500",
    category: "Voiture",
    price: 9500000,
    rating: 4.7,
    description: "Mercedes-Benz ML 500 4MATIC 2015 – Puissance, luxe & confort absolu.",
    specifications: { Année: "2015", Kilométrage: "50 000 km", Carburant: "Essence", Moteur: "4.7L V8", "Boîte de vitesse": "Automatique 7 vitesses", Couleur: "Blanc" },
    stock: 19, brand: "Mercedes-Benz", createdAt: "2025-04-10",
  },
  // 44. Toyota Avensis
  {
    id: 44,
    name: "Toyota Avensis",
    category: "Voiture",
    price: 4800000,
    rating: 4.3,
    description: "Toyota Avensis – Berline fiable et confortable.",
    specifications: { Année: "2020", Kilométrage: "40 000 km", Carburant: "Diesel", Moteur: "2.0L D-4D", "Boîte de vitesse": "Manuelle", Couleur: "Gris" },
    stock: 13, brand: "Toyota", createdAt: "2025-04-15",
  },
  // 45. Haval Jolion
  {
    id: 45,
    name: "Haval Jolion",
    category: "Voiture",
    price: 4000000,
    rating: 4.2,
    description: "Haval Jolion – SUV compact moderne et bien équipé.",
    specifications: { Année: "2022", Kilométrage: "20 000 km", Carburant: "Essence", Moteur: "1.5L Turbo", "Boîte de vitesse": "Automatique", Couleur: "Blanc" },
    stock: 21, brand: "Haval", createdAt: "2025-04-20",
  },
  // 46. Mazda 3
  {
    id: 46,
    name: "Mazda 3",
    category: "Voiture",
    price: 4200000,
    rating: 4.4,
    description: "Mazda 3 Sport Hatchback Skyactiv 2017 – Sportive, fiable & économique.",
    specifications: { Année: "2017", Kilométrage: "30 000 km", Carburant: "Essence", Moteur: "2.0L Skyactiv", "Boîte de vitesse": "Automatique", Couleur: "Rouge" },
    stock: 16, brand: "Mazda", createdAt: "2025-04-25",
  },
  // 47. Série spéciale petit budget
  {
    id: 47,
    name: "Série spéciale petit budget",
    category: "Voiture",
    price: 3200000,
    rating: 3.9,
    description: "Série spéciale petit budget – Hyundai Accent 2019 & Hyundai Elantra 2020.",
    specifications: { Année: "2019", Kilométrage: "50 000 km", Carburant: "Essence", Moteur: "1.6L", "Boîte de vitesse": "Manuelle", Couleur: "Blanc" },
    stock: 8, brand: "Hyundai", createdAt: "2025-05-01",
  },
];

// ============================================================
// 5. CONSTRUCTION DU MAPPING FILTRÉ (pour les produits actifs)
// ============================================================
// On génère un mapping restreint aux slugs des produits actifs.
// Cela permet d'avoir une vue directe des correspondances utilisées.
function buildImageFolderMapping(products: Omit<Product, "images">[]): Record<string, string> {
  const mapping: Record<string, string> = {};
  for (const product of products) {
    const slug = slugify(product.name);
    mapping[slug] = imageSourceFolderMapping[slug] || slug; // fallback
  }
  return mapping;
}

export const imageFolderMapping = buildImageFolderMapping(rawProductsData);

// ============================================================
// 6. CONSTRUCTION DU TABLEAU FINAL DES PRODUITS AVEC IMAGES
// ============================================================
function buildProducts(raw: Omit<Product, "images">[]): Product[] {
  return raw.map((item) => ({
    ...item,
    images: getImagePaths(item.name),
  }));
}

// ============================================================
// 7. EXPORT DU TABLEAU FINAL
// ============================================================
export const products: Product[] = buildProducts(rawProductsData);