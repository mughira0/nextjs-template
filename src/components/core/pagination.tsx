"use client";

import React from "react";

interface PaginationProps {
  totalPages?: number;
  page?: number;
  setPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalPages = 1,
  page = 1,
  setPage,
}) => {
  const renderPages = () => {
    const items: React.ReactNode[] = [];

    if (page > 2) {
      items.push(renderPage(1));
      if (page > 3) items.push(renderEllipsis("start"));
    }

    for (let p = page - 1; p <= page + 1; p++) {
      if (p >= 1 && p <= totalPages) items.push(renderPage(p));
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) items.push(renderEllipsis("end"));
      items.push(renderPage(totalPages));
    }

    return items;
  };

  const renderPage = (p: number) => {
    const active = p === page;

    return (
      <li key={p}>
        <button
          onClick={() => setPage(p)}
          aria-current={active ? "page" : undefined}
          className={`
            h-9 min-w-9 px-3 text-sm font-medium transition
            rounded-[var(--pagination-radius)]
            border border-[var(--pagination-border)]
            ${
              active
                ? "bg-[var(--pagination-active-bg)] text-[var(--pagination-active-text)]"
                : "bg-[var(--pagination-page-bg)] text-[var(--pagination-page-text)] hover:bg-[var(--pagination-page-hover-bg)]"
            }
          `}
        >
          {p}
        </button>
      </li>
    );
  };

  const renderEllipsis = (key: string) => (
    <li
      key={key}
      className="px-2 text-sm text-[var(--pagination-disabled-text)]"
    >
      …
    </li>
  );

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center gap-1">
        {/* Prev */}
        <li>
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
            className={navBtn(page === 1)}
          >
            Prev
          </button>
        </li>

        {renderPages()}

        {/* Next */}
        <li>
          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
            className={navBtn(page === totalPages)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const navBtn = (disabled: boolean) => `
  h-9 px-3 text-sm font-medium transition
  rounded-[var(--pagination-radius)]
  border border-[var(--pagination-border)]
  ${
    disabled
      ? "text-[var(--pagination-disabled-text)] opacity-50 cursor-not-allowed"
      : "bg-[var(--pagination-page-bg)] text-[var(--pagination-text)] hover:bg-[var(--pagination-page-hover-bg)]"
  }
`;

export default PaginationComponent;
