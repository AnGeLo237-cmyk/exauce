"use client";

import { useState, useMemo, useEffect } from "react";
import { LocalizedText } from "@/lib/translation";
import ReviewCard from "@/components/shared/ui/review-card";
import RatingSummary from "@/components/review/rating-summary";
import ReviewFilters from "@/components/review/review-filters";
import ReviewPagination from "@/components/shared/ui/pagination";
import ReviewForm from "@/components/review/review-form";
import EmptyState from "@/components/shared/ui/empty-state";
import { BounceIn, FadeIn, CardReveal } from "@/components/shared/ux/animations";

type Review = {
  id: number;
  name: string;
  location: string;   // Ville
  country: string;    // Pays
  rating: number;
  date: string;
  category: string;
  product: string;
  text: string;
  initials: string;
  usefulCount?: number;
};

type Category = "Toutes" | "Voiture" | "Meuble" | "Électroménager";
type SortOption = "recent" | "oldest" | "rating" | "useful";

// 48 avis répartis sur les 12 pays de vente
const initialReviews: Review[] = [
  // 🇨🇲 Cameroun (8 avis)
  { id: 1, name: "Marie Ngo Bassa", location: "Douala", country: "Cameroun", rating: 5, date: "2025-03-15", category: "Meuble", product: "Canapé Chesterfield", text: "Qualité exceptionnelle, confort incroyable. Livraison rapide et soignée.", initials: "MB", usefulCount: 12 },
  { id: 2, name: "Jean-Paul Mballa", location: "Yaoundé", country: "Cameroun", rating: 4, date: "2025-03-10", category: "Voiture", product: "SUV Premium X500", text: "Très bon service client, le SUV correspondait parfaitement à la description.", initials: "JM", usefulCount: 8 },
  { id: 3, name: "Aïcha Aboubakar", location: "Garoua", country: "Cameroun", rating: 5, date: "2025-03-05", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Arrivé en parfait état, silencieux et économe.", initials: "AA", usefulCount: 15 },
  { id: 4, name: "Eric Tchoumi", location: "Bafoussam", country: "Cameroun", rating: 3, date: "2025-02-28", category: "Meuble", product: "Table à manger", text: "Belle table mais montage un peu compliqué. Dans l'ensemble satisfait.", initials: "ET", usefulCount: 3 },
  { id: 5, name: "Lucie Kenfack", location: "Bamenda", country: "Cameroun", rating: 5, date: "2025-02-20", category: "Voiture", product: "Berline Élégance 2025", text: "Conduite agréable, design magnifique. Je recommande.", initials: "LK", usefulCount: 10 },
  { id: 6, name: "Thomas Nkoumou", location: "Douala", country: "Cameroun", rating: 4, date: "2025-02-15", category: "Électroménager", product: "Lave-linge", text: "Fonctionne très bien, programme éco efficace.", initials: "TN", usefulCount: 6 },
  { id: 7, name: "Emma Etoa", location: "Yaoundé", country: "Cameroun", rating: 5, date: "2025-02-10", category: "Meuble", product: "Canapé d'angle", text: "Tissu agréable, très grand confort. Livraison en 3 jours.", initials: "EE", usefulCount: 9 },
  { id: 8, name: "Hugo Nganou", location: "Ngaoundéré", country: "Cameroun", rating: 2, date: "2025-01-28", category: "Voiture", product: "Citadine électrique", text: "Autonomie un peu faible, sinon voiture correcte.", initials: "HN", usefulCount: 1 },

  // 🇨🇩 RDC (4 avis)
  { id: 9, name: "Joseph Kabongo", location: "Kinshasa", country: "RDC", rating: 5, date: "2025-03-12", category: "Voiture", product: "SUV Premium X500", text: "Excellent véhicule, importation rapide et conforme. Très satisfait.", initials: "JK", usefulCount: 14 },
  { id: 10, name: "Grâce Mbuyi", location: "Lubumbashi", country: "RDC", rating: 4, date: "2025-02-25", category: "Meuble", product: "Canapé Chesterfield", text: "Très beau canapé, la livraison a pris un peu de temps mais tout est arrivé intact.", initials: "GM", usefulCount: 7 },
  { id: 11, name: "Patrick Ilunga", location: "Goma", country: "RDC", rating: 5, date: "2025-02-08", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Réfrigérateur parfait pour ma famille, très économe en énergie.", initials: "PI", usefulCount: 9 },
  { id: 12, name: "Nadine Tshibangu", location: "Mbuji-Mayi", country: "RDC", rating: 4, date: "2025-01-20", category: "Meuble", product: "Table à manger", text: "Bonne qualité, bois solide. Le service client est réactif.", initials: "NT", usefulCount: 5 },

  // 🇬🇳 Guinée Conakry (4 avis)
  { id: 13, name: "Alpha Diallo", location: "Conakry", country: "Guinée Conakry", rating: 5, date: "2025-03-08", category: "Voiture", product: "Berline Élégance 2025", text: "Berline superbe, importation de qualité. Service impeccable.", initials: "AD", usefulCount: 11 },
  { id: 14, name: "Fatoumata Camara", location: "Kankan", country: "Guinée Conakry", rating: 4, date: "2025-02-18", category: "Électroménager", product: "Four encastrable", text: "Four très performant, cuisson uniforme.", initials: "FC", usefulCount: 6 },
  { id: 15, name: "Mamadou Bah", location: "Nzérékoré", country: "Guinée Conakry", rating: 5, date: "2025-01-30", category: "Meuble", product: "Canapé d'angle", text: "Canapé très confortable, tissu de qualité. Je recommande vivement.", initials: "MB", usefulCount: 8 },
  { id: 16, name: "Aissatou Sow", location: "Kindia", country: "Guinée Conakry", rating: 3, date: "2025-01-15", category: "Électroménager", product: "Lave-linge", text: "Lave-linge correct mais un peu bruyant sur certains programmes.", initials: "AS", usefulCount: 2 },

  // 🇨🇬 Congo Brazzaville (4 avis)
  { id: 17, name: "Jean-Claude Mabiala", location: "Brazzaville", country: "Congo Brazzaville", rating: 5, date: "2025-03-02", category: "Voiture", product: "SUV Premium X500", text: "Véhicule impeccable, service après-vente au top.", initials: "JM", usefulCount: 13 },
  { id: 18, name: "Bernadette Loemba", location: "Pointe-Noire", country: "Congo Brazzaville", rating: 4, date: "2025-02-14", category: "Meuble", product: "Bibliothèque", text: "Bibliothèque élégante, montage simple. Très contente.", initials: "BL", usefulCount: 5 },
  { id: 19, name: "Fabrice Nkodia", location: "Dolisie", country: "Congo Brazzaville", rating: 5, date: "2025-01-25", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Grand réfrigérateur, très silencieux. Livraison rapide.", initials: "FN", usefulCount: 9 },
  { id: 20, name: "Sylvie Okemba", location: "Owando", country: "Congo Brazzaville", rating: 4, date: "2025-01-10", category: "Meuble", product: "Canapé Chesterfield", text: "Très beau canapé, confortable. Livraison conforme.", initials: "SO", usefulCount: 6 },

  // 🇬🇦 Gabon (4 avis)
  { id: 21, name: "Paul Nguema", location: "Libreville", country: "Gabon", rating: 5, date: "2025-03-06", category: "Voiture", product: "Berline Élégance 2025", text: "Berline parfaite, très belle finition intérieure.", initials: "PN", usefulCount: 12 },
  { id: 22, name: "Chantal Obame", location: "Port-Gentil", country: "Gabon", rating: 4, date: "2025-02-22", category: "Électroménager", product: "Four encastrable", text: "Four moderne, très efficace. Bon rapport qualité-prix.", initials: "CO", usefulCount: 4 },
  { id: 23, name: "Yannick Mba", location: "Franceville", country: "Gabon", rating: 5, date: "2025-02-05", category: "Meuble", product: "Canapé d'angle", text: "Canapé spacieux et très confortable. Livraison impeccable.", initials: "YM", usefulCount: 8 },
  { id: 24, name: "Prisca Ondo", location: "Oyem", country: "Gabon", rating: 3, date: "2025-01-18", category: "Meuble", product: "Bureau", text: "Bureau fonctionnel mais un peu petit pour mon usage.", initials: "PO", usefulCount: 2 },

  // 🇭🇹 Haïti (4 avis)
  { id: 25, name: "Jean-Baptiste Pierre", location: "Port-au-Prince", country: "Haïti", rating: 5, date: "2025-03-01", category: "Voiture", product: "SUV Premium X500", text: "Excellent SUV, importation vers Haïti très bien gérée.", initials: "JP", usefulCount: 11 },
  { id: 26, name: "Marie-Claire Delva", location: "Cap-Haïtien", country: "Haïti", rating: 4, date: "2025-02-12", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Réfrigérateur conforme à la description. Livraison dans les délais.", initials: "MD", usefulCount: 6 },
  { id: 27, name: "Wilner Étienne", location: "Gonaïves", country: "Haïti", rating: 5, date: "2025-01-28", category: "Meuble", product: "Canapé Chesterfield", text: "Canapé magnifique, très belle finition cuir.", initials: "WE", usefulCount: 9 },
  { id: 28, name: "Roseline Joseph", location: "Jacmel", country: "Haïti", rating: 4, date: "2025-01-08", category: "Meuble", product: "Table à manger", text: "Belle table en bois massif. Montage un peu long mais résultat superbe.", initials: "RJ", usefulCount: 5 },

  // 🇸🇳 Sénégal (4 avis)
  { id: 29, name: "Ousmane Ndiaye", location: "Dakar", country: "Sénégal", rating: 5, date: "2025-03-14", category: "Voiture", product: "Berline Élégance 2025", text: "Berline très élégante, parfaite pour mes déplacements professionnels.", initials: "ON", usefulCount: 13 },
  { id: 30, name: "Aminata Diop", location: "Thiès", country: "Sénégal", rating: 4, date: "2025-02-26", category: "Électroménager", product: "Lave-linge", text: "Lave-linge performant, très économe en eau.", initials: "AD", usefulCount: 7 },
  { id: 31, name: "Ibrahima Fall", location: "Saint-Louis", country: "Sénégal", rating: 5, date: "2025-02-08", category: "Meuble", product: "Canapé d'angle", text: "Canapé d'angle très confortable. Livraison rapide à Saint-Louis.", initials: "IF", usefulCount: 8 },
  { id: 32, name: "Mariama Sy", location: "Ziguinchor", country: "Sénégal", rating: 4, date: "2025-01-22", category: "Électroménager", product: "Four encastrable", text: "Four très efficace, cuisson parfaite. Satisfaite.", initials: "MS", usefulCount: 5 },

  // 🇧🇫 Burkina Faso (4 avis)
  { id: 33, name: "Boureima Ouédraogo", location: "Ouagadougou", country: "Burkina Faso", rating: 5, date: "2025-03-04", category: "Voiture", product: "SUV Premium X500", text: "SUV très robuste, adapté à nos routes. Très satisfait.", initials: "BO", usefulCount: 12 },
  { id: 34, name: "Salimata Kaboré", location: "Bobo-Dioulasso", country: "Burkina Faso", rating: 4, date: "2025-02-18", category: "Meuble", product: "Bibliothèque", text: "Bibliothèque solide, bonne qualité de bois.", initials: "SK", usefulCount: 5 },
  { id: 35, name: "Issa Sawadogo", location: "Koudougou", country: "Burkina Faso", rating: 5, date: "2025-01-30", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Réfrigérateur très performant, silencieux.", initials: "IS", usefulCount: 8 },
  { id: 36, name: "Fatimata Zongo", location: "Banfora", country: "Burkina Faso", rating: 3, date: "2025-01-12", category: "Meuble", product: "Chaise de bureau", text: "Chaise correcte mais pas très ergonomique sur la durée.", initials: "FZ", usefulCount: 2 },

  // 🇨🇮 Côte d'Ivoire (4 avis)
  { id: 37, name: "Kouassi Yao", location: "Abidjan", country: "Côte d'Ivoire", rating: 5, date: "2025-03-11", category: "Voiture", product: "Berline Élégance 2025", text: "Berline haut de gamme, service client excellent.", initials: "KY", usefulCount: 14 },
  { id: 38, name: "Aya Traoré", location: "Bouaké", country: "Côte d'Ivoire", rating: 4, date: "2025-02-24", category: "Électroménager", product: "Four encastrable", text: "Four moderne et performant. Livraison rapide.", initials: "AT", usefulCount: 6 },
  { id: 39, name: "Ibrahim Koné", location: "Yamoussoukro", country: "Côte d'Ivoire", rating: 5, date: "2025-02-06", category: "Meuble", product: "Canapé Chesterfield", text: "Canapé de grande qualité, très confortable.", initials: "IK", usefulCount: 9 },
  { id: 40, name: "Adjoua N'Guessan", location: "San-Pédro", country: "Côte d'Ivoire", rating: 4, date: "2025-01-20", category: "Meuble", product: "Table à manger", text: "Belle table, très stable. Montage facile.", initials: "AN", usefulCount: 5 },

  // 🇹🇩 Tchad (4 avis)
  { id: 41, name: "Mahamat Idriss", location: "N'Djamena", country: "Tchad", rating: 5, date: "2025-03-09", category: "Voiture", product: "SUV Premium X500", text: "SUV très fiable, parfait pour les routes du Tchad.", initials: "MI", usefulCount: 10 },
  { id: 42, name: "Aché Moussa", location: "Moundou", country: "Tchad", rating: 4, date: "2025-02-20", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Réfrigérateur très utile, grande capacité.", initials: "AM", usefulCount: 6 },
  { id: 43, name: "Halimé Abdelkerim", location: "Abéché", country: "Tchad", rating: 5, date: "2025-02-02", category: "Meuble", product: "Canapé d'angle", text: "Canapé très confortable, tissu résistant.", initials: "HA", usefulCount: 7 },
  { id: 44, name: "Djimet Ngaba", location: "Sarh", country: "Tchad", rating: 3, date: "2025-01-15", category: "Meuble", product: "Bureau", text: "Bureau correct, livraison un peu lente.", initials: "DN", usefulCount: 2 },

  // 🇹🇬 Togo (4 avis)
  { id: 45, name: "Kodjo Adjovi", location: "Lomé", country: "Togo", rating: 5, date: "2025-03-07", category: "Voiture", product: "Berline Élégance 2025", text: "Berline très élégante, livrée conforme.", initials: "KA", usefulCount: 11 },
  { id: 46, name: "Akossiwa Mensah", location: "Sokodé", country: "Togo", rating: 4, date: "2025-02-16", category: "Électroménager", product: "Lave-linge", text: "Lave-linge performant, très satisfaite.", initials: "AM", usefulCount: 5 },
  { id: 47, name: "Yao Agbeko", location: "Kara", country: "Togo", rating: 5, date: "2025-01-30", category: "Meuble", product: "Canapé Chesterfield", text: "Canapé superbe, très bonne qualité.", initials: "YA", usefulCount: 8 },

  // 🇲🇱 Mali (4 avis)
  { id: 48, name: "Amadou Coulibaly", location: "Bamako", country: "Mali", rating: 5, date: "2025-03-03", category: "Voiture", product: "SUV Premium X500", text: "SUV robuste, parfait pour le Mali. Importation rapide.", initials: "AC", usefulCount: 12 },
];

// Liste des pays (pour le filtre)
const COUNTRIES = [
  "Tous",
  "Cameroun",
  "RDC",
  "Guinée Conakry",
  "Congo Brazzaville",
  "Gabon",
  "Haïti",
  "Sénégal",
  "Burkina Faso",
  "Côte d'Ivoire",
  "Tchad",
  "Togo",
  "Mali",
];

export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Toutes");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string>("Tous");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  const filteredReviews = useMemo(() => {
    let filtered = [...allReviews];

    if (selectedCategory !== "Toutes") {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }
    if (selectedRating > 0) {
      filtered = filtered.filter((r) => r.rating >= selectedRating);
    }
    if (selectedCountry !== "Tous") {
      filtered = filtered.filter((r) => r.country === selectedCountry);
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.product.toLowerCase().includes(term) ||
          r.text.toLowerCase().includes(term) ||
          r.location.toLowerCase().includes(term) ||
          r.country.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "useful":
        filtered.sort((a, b) => (b.usefulCount || 0) - (a.usefulCount || 0));
        break;
    }

    return filtered;
  }, [allReviews, selectedCategory, selectedRating, selectedCountry, sortBy, searchTerm]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const displayedReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRating, selectedCountry, sortBy, searchTerm]);

  const totalReviews = allReviews.length;
  const averageRating =
    totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: allReviews.filter((r) => Math.floor(r.rating) === stars).length,
  }));

  const handleNewReview = (newReview: {
    name: string;
    email: string;
    location: string;
    country: string;
    rating: number;
    product: string;
    comment: string;
  }) => {
    const review: Review = {
      id: allReviews.length + 1,
      name: newReview.name,
      location: newReview.location,
      country: newReview.country,
      rating: newReview.rating,
      date: new Date().toISOString().slice(0, 10),
      category: "Voiture",
      product: newReview.product,
      text: newReview.comment,
      initials: newReview.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      usefulCount: 0,
    };
    setAllReviews((prev) => [review, ...prev]);
  };

  const resetFilters = () => {
    setSelectedCategory("Toutes");
    setSelectedRating(0);
    setSelectedCountry("Tous");
    setSortBy("recent");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={100}>
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
              <LocalizedText>Ils nous ont fait confiance</LocalizedText>
            </h1>
            <p className="mt-2 text-text-muted">
              <LocalizedText>
                Découvrez les retours authentiques de nos clients à travers l'Afrique et la Caraïbe.
              </LocalizedText>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mb-8">
            <RatingSummary
              averageRating={averageRating}
              totalReviews={totalReviews}
              distribution={distribution}
            />
          </div>
        </FadeIn>

        <FadeIn delay={600}>
          <ReviewFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </FadeIn>

        {displayedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review, index) => (
              <CardReveal key={review.id} index={index} delay={200}>
                <ReviewCard review={review} />
              </CardReveal>
            ))}
          </div>
        ) : (
          <BounceIn>
            <EmptyState onReset={resetFilters} />
          </BounceIn>
        )}

        <BounceIn>
          <ReviewPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </BounceIn>

        <FadeIn delay={900}>
          <div className="mt-12">
            <ReviewForm onSubmit={handleNewReview} />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}