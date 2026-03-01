"use client";

import React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import {
  ColumnDef,
  SortDirection,
  TableRow,
  TableStructureProps,
} from "@/types/components/table";
import NoData from "./no-data";
import PaginationComponent from "./pagination";

function SkeletonRow({ count }: { count: number }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--table-border)" }}>
      {Array.from({ length: count }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div
            className="h-3.5 rounded-full animate-pulse"
            style={{
              background: "var(--table-skeleton-bg)",
              width: i === 0 ? "55%" : i % 3 === 0 ? "38%" : "72%",
            }}
          />
        </td>
      ))}
    </tr>
  );
}

export default function TableStructure({
  header,
  data,
  headerTitle,
  actions,
  sort,
  setSort,
  page,
  totalPages,
  setPage,
  customeBodyStyle,
  className = "",
  bodyClassName = "",
  noDataText = "No data found",
  stickyHeader = false,
  loading = false,
  skeletonRows = 5,
}: TableStructureProps) {
  const handleHeaderClick = (col: ColumnDef) => {
    if (!col.sortable || !sort || !setSort) return;
    const nextDir: SortDirection =
      sort.key === col.value && sort.dir === "asc" ? "desc" : "asc";
    setSort({ key: col.value, dir: nextDir });
  };

  const colWidth = (w?: string) => {
    const totalSpecified = header.filter((h) => !h.width);
    return w ?? `${100 / Math.max(totalSpecified.length, 1)}%`;
  };

  const getRowStyle = (index: number): React.CSSProperties => {
    if (index % 2 !== 0) return { background: "var(--border-color)" };
    return { background: "var(--table-bg)" };
  };

  const hasHeader = headerTitle !== undefined || actions !== undefined;
  const hasPagination =
    page !== undefined && totalPages !== undefined && setPage !== undefined;

  return (
    <div
      className={`w-full flex flex-col overflow-hidden ${className}`}
      style={{
        background: "var(--table-bg)",
        border: "1px solid var(--table-border)",
        borderRadius: "var(--table-radius)",
      }}
    >
      {/* ── Header bar (title + actions) ── */}
      {hasHeader && (
        <div
          className="flex items-center justify-between gap-4 px-4 py-3 shrink-0"
          style={{
            borderBottom: "1px solid var(--table-border)",
            background: "var(--table-bg)",
          }}
        >
          {headerTitle !== undefined ? (
            <div
              className="text-lg font-semibold"
              style={{ color: "var(--text-color)" }}
            >
              {headerTitle}
            </div>
          ) : (
            <div />
          )}

          {actions !== undefined && (
            <div className="flex items-center gap-2 shrink-0">{actions}</div>
          )}
        </div>
      )}

      {/* ── Table (header + body share one scroll container) ── */}
      <div className="w-full">
        <div
          className={`overflow-x-auto  max-w-[100vw] overflow-y-auto ${bodyClassName}`}
        >
          <table
            className="w-full  table-fixed text-[var(--fs-sm)]"
            style={{ color: "var(--table-body-text)", minWidth: "700px" }}
          >
            <thead
              style={{
                background: "var(--table-header-bg)",
                borderBottom: "1px solid var(--table-header-border)",
                ...(stickyHeader
                  ? { position: "sticky", top: 0, zIndex: 10 }
                  : {}),
              }}
            >
              <tr>
                {header.map((col) => (
                  <th
                    key={col.value}
                    scope="col"
                    onClick={() => handleHeaderClick(col)}
                    style={{
                      width: colWidth(col.width),
                      cursor: col.sortable ? "pointer" : "default",
                      userSelect: "none",
                      color: "var(--table-header-text)",
                      transition: "background 0.12s, color 0.12s",
                      ...col.headerStyle,
                    }}
                    className={[
                      "px-4 py-3 border-[0_1_0_0] border-r-[var(--table-header-border)] text-xs font-semibold uppercase tracking-wider whitespace-nowrap last:border-r-0",
                      col.align ? `text-${col.align}` : "text-left",
                      col.sortable
                        ? "hover:bg-[var(--table-row-hover-bg)] hover:text-[var(--table-row-hover-text)]"
                        : "",
                      col.className ?? "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="inline-flex items-center">
                      {col.label}
                      {col.sortable && sort && (
                        <SortIcon
                          active={sort.key === col.value}
                          dir={sort.dir}
                        />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              style={{
                ...customeBodyStyle,
              }}
            >
              {loading ? (
                Array.from({ length: skeletonRows }).map((_, i) => (
                  <SkeletonRow key={i} count={header.length} />
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={header.length}>
                    <NoData title={noDataText} />
                  </td>
                </tr>
              ) : (
                data.map((row: TableRow, rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    style={{
                      ...getRowStyle(rowIndex),
                      borderBottom: "1px solid var(--table-border)",
                      transition: "background 0.1s, color 0.1s",
                    }}
                  >
                    {header.map((col) => (
                      <td
                        key={col.value}
                        style={{
                          width: colWidth(col.width),
                          ...col.cellStyle,
                        }}
                        className={[
                          "px-4 py-3 border-[0_1_0_0] text-sm border-r-[var(--table-border)] whitespace-nowrap text-ellipsis last:border-r-0",
                          col.align ? `text-${col.align}` : "text-left",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {row[col.value]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {hasPagination && (
        <div className="flex items-center justify-end gap-4 px-4 py-3 shrink-0">
          <PaginationComponent
            page={page!}
            totalPages={totalPages!}
            setPage={setPage!}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SortIcon({ active, dir }: { active: boolean; dir: SortDirection }) {
  if (!active)
    return (
      <ChevronsUpDown
        size={13}
        className="ml-1 shrink-0"
        style={{ color: "var(--table-sort-inactive)", opacity: 0.45 }}
      />
    );
  return dir === "asc" ? (
    <ArrowUp
      size={13}
      className="ml-1 shrink-0"
      style={{ color: "var(--table-sort-active)" }}
    />
  ) : (
    <ArrowDown
      size={13}
      className="ml-1 shrink-0"
      style={{ color: "var(--table-sort-active)" }}
    />
  );
}
