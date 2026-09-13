"use client";

import { useState, useMemo, useEffect } from "react";
import { LocalizedText } from "@/lib/translation";
import ReviewCard from "@/components/shared/ui/review-card";
import RatingSummary from "@/components/review/rating-summary";
import ReviewFilters from "@/components/review/review-filters";
import ReviewPagination from "@/components/shared/ui/pagination";
import ReviewForm from "@/components/review/review-form";
import EmptyState from "@/components/shared/ui/empty-state";
import { SlideLeft, ZoomIn, SlideUp, SlideRight, BounceIn, FadeIn, CardReveal } from "@/components/shared/ux/animations";

type Review = {
  id: number;
  name: string;
  location: string;
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

// Données fictives camerounaises (24 avis)
const initialReviews: Review[] = [
  { id: 1, name: "Marie Ngo Bassa", location: "Douala, Cameroun", rating: 5, date: "2025-03-15", category: "Meuble", product: "Canapé Chesterfield", text: "Qualité exceptionnelle, confort incroyable. Livraison rapide et soignée.", initials: "MB", usefulCount: 12 },
  { id: 2, name: "Jean-Paul Mballa", location: "Yaoundé, Cameroun", rating: 4, date: "2025-03-10", category: "Voiture", product: "SUV Premium X500", text: "Très bon service client, le SUV correspondait parfaitement à la description.", initials: "JM", usefulCount: 8 },
  { id: 3, name: "Aïcha Aboubakar", location: "Garoua, Cameroun", rating: 5, date: "2025-03-05", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Arrivé en parfait état, silencieux et économe. Commande très simple.", initials: "AA", usefulCount: 15 },
  { id: 4, name: "Eric Tchoumi", location: "Bafoussam, Cameroun", rating: 3, date: "2025-02-28", category: "Meuble", product: "Table à manger", text: "Belle table mais montage un peu compliqué. Dans l'ensemble satisfait.", initials: "ET", usefulCount: 3 },
  { id: 5, name: "Lucie Kenfack", location: "Bamenda, Cameroun", rating: 5, date: "2025-02-20", category: "Voiture", product: "Berline Élégance 2025", text: "Conduite agréable, design magnifique. Je recommande.", initials: "LK", usefulCount: 10 },
  { id: 6, name: "Thomas Nkoumou", location: "Douala, Cameroun", rating: 4, date: "2025-02-15", category: "Électroménager", product: "Lave-linge", text: "Fonctionne très bien, programme éco efficace.", initials: "TN", usefulCount: 6 },
  { id: 7, name: "Emma Etoa", location: "Yaoundé, Cameroun", rating: 5, date: "2025-02-10", category: "Meuble", product: "Canapé d'angle", text: "Tissu agréable, très grand confort. Livraison en 3 jours.", initials: "EE", usefulCount: 9 },
  { id: 8, name: "Hugo Nganou", location: "Ngaoundéré, Cameroun", rating: 2, date: "2025-01-28", category: "Voiture", product: "Citadine électrique", text: "Autonomie un peu faible, sinon voiture correcte.", initials: "HN", usefulCount: 1 },
  { id: 9, name: "Chloé Mbarga", location: "Buea, Cameroun", rating: 5, date: "2025-01-20", category: "Électroménager", product: "Four encastrable", text: "Cuisson parfaite, nettoyage facile. Je suis ravie.", initials: "CM", usefulCount: 7 },
  { id: 10, name: "Louis Fouda", location: "Douala, Cameroun", rating: 4, date: "2025-01-15", category: "Meuble", product: "Bureau", text: "Solide et élégant, parfait pour le télétravail.", initials: "LF", usefulCount: 4 },
  { id: 11, name: "Sarah Atangana", location: "Yaoundé, Cameroun", rating: 5, date: "2025-01-05", category: "Voiture", product: "SUV Premium X500", text: "Le service client a répondu à toutes mes questions avant l'achat.", initials: "SA", usefulCount: 11 },
  { id: 12, name: "Antoine Owona", location: "Kribi, Cameroun", rating: 3, date: "2024-12-20", category: "Électroménager", product: "Micro-ondes", text: "Fonctionne bien mais un peu bruyant.", initials: "AO", usefulCount: 2 },
  { id: 13, name: "Camille Essomba", location: "Douala, Cameroun", rating: 5, date: "2024-12-10", category: "Meuble", product: "Bibliothèque", text: "Très belle finition, correspond exactement à la photo.", initials: "CE", usefulCount: 13 },
  { id: 14, name: "Nicolas Onana", location: "Yaoundé, Cameroun", rating: 4, date: "2024-11-28", category: "Voiture", product: "Berline Élégance 2025", text: "Bonne tenue de route, confort au top.", initials: "NO", usefulCount: 5 },
  { id: 15, name: "Julie Ngo Bassa", location: "Bafang, Cameroun", rating: 5, date: "2024-11-15", category: "Électroménager", product: "Réfrigérateur Side-by-Side", text: "Grande capacité, très silencieux. Livraison impeccable.", initials: "JN", usefulCount: 18 },
  { id: 16, name: "Mathieu Lontsi", location: "Douala, Cameroun", rating: 2, date: "2024-11-05", category: "Meuble", product: "Chaise de bureau", text: "Pas très confortable sur la durée.", initials: "ML", usefulCount: 1 },
  { id: 17, name: "Elodie Simo", location: "Yaoundé, Cameroun", rating: 5, date: "2024-10-25", category: "Voiture", product: "SUV Premium X500", text: "Parfait pour la famille, coffre immense.", initials: "ES", usefulCount: 9 },
  { id: 18, name: "Romain Kamga", location: "Bafoussam, Cameroun", rating: 4, date: "2024-10-10", category: "Électroménager", product: "Sèche-linge", text: "Efficace et silencieux, je recommande.", initials: "RK", usefulCount: 3 },
  { id: 19, name: "Manon Mefire", location: "Douala, Cameroun", rating: 5, date: "2024-09-30", category: "Meuble", product: "Canapé Chesterfield", text: "Le canapé est magnifique, très bonne qualité.", initials: "MM", usefulCount: 14 },
  { id: 20, name: "Paul Ndjock", location: "Yaoundé, Cameroun", rating: 3, date: "2024-09-15", category: "Voiture", product: "Citadine électrique", text: "Correcte pour la ville, mais un peu chère.", initials: "PN", usefulCount: 2 },
  { id: 21, name: "Laura Manga", location: "Douala, Cameroun", rating: 5, date: "2024-08-20", category: "Électroménager", product: "Four encastrable", text: "Résultat de cuisson parfait à chaque fois.", initials: "LM", usefulCount: 8 },
  { id: 22, name: "Alexandre Nkoulou", location: "Buea, Cameroun", rating: 4, date: "2024-08-05", category: "Meuble", product: "Table à manger", text: "Très belle table, facile à monter.", initials: "AN", usefulCount: 6 },
  { id: 23, name: "Inès Fotso", location: "Yaoundé, Cameroun", rating: 5, date: "2024-07-18", category: "Voiture", product: "Berline Élégance 2025", text: "La voiture est superbe et le service client au top.", initials: "IF", usefulCount: 10 },
  { id: 24, name: "Maxime Ngo Mpacko", location: "Douala, Cameroun", rating: 3, date: "2024-06-30", category: "Électroménager", product: "Lave-linge", text: "Correct, mais le programme rapide laisse des traces.", initials: "MN", usefulCount: 2 },
];

const categories: Category[] = ["Toutes", "Voiture", "Meuble", "Électroménager"];

export default function ReviewsPage() {
  const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Toutes");
  const [selectedRating, setSelectedRating] = useState(0);
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
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.product.toLowerCase().includes(term) ||
          r.text.toLowerCase().includes(term)
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
  }, [allReviews, selectedCategory, selectedRating, sortBy, searchTerm]);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const displayedReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRating, sortBy, searchTerm]);

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
    rating: number;
    product: string;
    comment: string;
  }) => {
    const review: Review = {
      id: allReviews.length + 1,
      name: newReview.name,
      location: "Cameroun",
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
                Découvrez les retours authentiques de nos clients camerounais.
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
                <ReviewCard key={review.id} review={review} />
              </CardReveal>
            ))}
          </div>
        ) : (
          <BounceIn><EmptyState onReset={resetFilters} /></BounceIn>
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