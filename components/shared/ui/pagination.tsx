"use client";

import { useClientTranslation } from "@/lib/translation";

type ReviewPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ReviewPaginationProps) {
  const { translated: paginationLabel } = useClientTranslation("Pagination");
  const { translated: prevPageLabel } = useClientTranslation("Page précédente");
  const { translated: nextPageLabel } = useClientTranslation("Page suivante");

  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | "...")[] => {
    const delta = 1; // nombre de pages visibles autour de la page courante
    const range: number[] = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    const result: (number | "...")[] = [1];
    if (range[0] > 2) result.push("...");
    result.push(...range);
    if (range[range.length - 1] < totalPages - 1) result.push("...");
    if (totalPages > 1) result.push(totalPages);

    return result;
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8" aria-label={paginationLabel}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 rounded-md bg-surface border border-border text-text flex items-center justify-center hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label={prevPageLabel}
      >
        ←
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="text-text-muted px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-surface border border-border text-text hover:bg-primary/10"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 rounded-md bg-surface border border-border text-text flex items-center justify-center hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label={nextPageLabel}
      >
        →
      </button>
    </nav>
  );
}