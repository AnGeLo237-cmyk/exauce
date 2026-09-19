"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchProducts, Product } from "@/lib/data";
import { LocalizedText } from "@/lib/translation";
import FilterSidebar, { Filters } from "@/components/catalog/filter-sidebar";
import SearchBar from "@/components/shared/ui/search-bar";
import SortDropdown, { SortOption } from "@/components/catalog/sort-dropdown";
import ProductGrid from "@/components/catalog/product-grid";
import Pagination from "@/components/shared/ui/pagination";
import EmptyState from "@/components/shared/ui/empty-state";
import { SlideLeft, BounceIn, FadeIn } from "@/components/shared/ux/animations";

const ITEMS_PER_PAGE = 12;

export default function CataloguePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des produits
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (err) {
        setError("Impossible de charger les produits.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceMin: "",
    priceMax: "",
    minRating: 0,
    availability: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.priceMin !== "") {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax !== "") {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
    }
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }
    if (filters.availability.length > 0) {
      if (filters.availability.includes("in_stock")) {
        result = result.filter((p) => p.stock > 0);
      }
      if (filters.availability.includes("out_of_stock")) {
        result = result.filter((p) => p.stock === 0);
      }
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, filters, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm, sortBy]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceMin: "",
      priceMax: "",
      minRating: 0,
      availability: [],
    });
    setSearchTerm("");
    setSortBy("relevance");
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg text-text">
          <LocalizedText>Chargement du catalogue...</LocalizedText>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={200}>
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
              <LocalizedText>Catalogue</LocalizedText>
            </h1>
            <p className="mt-2 text-text-muted">
              <LocalizedText>
                Découvrez notre large gamme de voitures, meubles et électroménagers.
              </LocalizedText>
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar filters={filters} onChange={setFilters}/>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                <ProductGrid products={paginatedProducts} />
                <BounceIn>
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </BounceIn>
              </>
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}