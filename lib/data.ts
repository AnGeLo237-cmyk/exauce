// lib/data.ts
// ============================================================
// FICHIER DE DONNÉES PRINCIPAL – POINT D'ENTRÉE POUR LES PRODUITS
// ============================================================
// Ce fichier réexporte les données statiques depuis mock-data.ts
// et fournit des utilitaires pour la génération des chemins d'images.
// Il est compatible avec les composants client et serveur.
// ============================================================

import {
  products as STATIC_PRODUCTS,
  imageSourceFolderMapping,
  slugify,
  type Category,
  type Product,
} from "./mock-data";

// ============================================================
// RÉEXPORT DES TYPES ET DONNÉES
// ============================================================
export type { Category, Product };

// Réexport direct des produits statiques (backup)
export const products = STATIC_PRODUCTS;

// Image de fallback en cas d'absence d'image
export const FALLBACK_IMAGE = "/images/placeholder.jpg";

// ============================================================
// GÉNÉRATION DU CHEMIN D'IMAGE
// ============================================================

/**
 * Génère le chemin de la première image pour un produit donné.
 * Utilise le mapping source pour trouver le dossier réel.
 * Les noms de fichiers suivent la convention : {dossier}-01.jpg.
 *
 * @param productName - Nom exact du produit (ex: "Hyundai Grandeur")
 * @returns Chemin de la première image (ex: "/images/voitures/hyundai-grandeur/hyundai-grandeur-01.jpg")
 */
export function mapProductNameToImage(productName: string): string {
  const slug = slugify(productName);
  // Récupère le dossier correspondant dans le mapping, ou utilise le slug en fallback
  const folder = imageSourceFolderMapping[slug] || slug;
  // Le nom du fichier est identique au nom du dossier, suivi d'un tiret et du numéro.
  // Aucun remplacement d'espaces n'est nécessaire car les noms de dossiers sont déjà normalisés.
  return `/images/voitures/${folder}/${folder}-01.jpg`;
}

/**
 * Génère plusieurs chemins d'images pour un produit (jusqu'à 6, ou le nombre spécifié).
 * Utile pour une galerie d'images.
 *
 * @param productName - Nom exact du produit
 * @param maxImages - Nombre maximum d'images à générer (défaut: 6, pour correspondre aux fichiers disponibles)
 * @returns Tableau de chemins d'images
 */
export function getProductImages(productName: string, maxImages: number = 6): string[] {
  const slug = slugify(productName);
  const folder = imageSourceFolderMapping[slug] || slug;
  const paths: string[] = [];
  for (let i = 1; i <= maxImages; i++) {
    const suffix = String(i).padStart(2, "0");
    paths.push(`/images/voitures/${folder}/${folder}-${suffix}.jpg`);
  }
  return paths;
}

// ============================================================
// FONCTION DE CHARGEMENT (ASYNCHRONE POUR COMPATIBILITÉ)
// ============================================================

/**
 * Récupère la liste des produits.
 * Cette fonction est asynchrone pour rester compatible avec les anciens appels.
 * Elle retourne directement les données statiques.
 */
export async function fetchProducts(): Promise<Product[]> {
  return STATIC_PRODUCTS;
}