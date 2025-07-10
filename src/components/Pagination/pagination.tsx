"use client";

import { Button } from "@/components/ui/button";
import { PaginationProps } from "./pagination.types";

export default function Pagination({ page, totalPages }: PaginationProps) {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  function onPageChange(page: number) {}
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <Button
        variant="outline"
        onClick={() => onPageChange(page - 1)}
        disabled={isFirst}
      >
        ← Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={isLast}
      >
        Next →
      </Button>
    </div>
  );
}
