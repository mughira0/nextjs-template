// types/components/table.ts

import React from "react";

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string | null;
  dir: SortDirection;
}

export interface ColumnDef {
  label: React.ReactNode;
  value: string;
  className?: string;
  align?: "left" | "center" | "right";
  width?: string;
  sortable?: boolean;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

export type TableRow = Record<string, React.ReactNode>;

export interface TableStructureProps {
  header: ColumnDef[];
  data: TableRow[];

  headerTitle?: React.ReactNode;
  actions?: React.ReactNode;

  sort?: SortState;
  setSort?: (sort: SortState) => void;

  page?: number;
  totalPages?: number;
  setPage?: (page: number) => void;

  customeBodyStyle?: React.CSSProperties;
  className?: string;
  bodyClassName?: string;
  minHeight?: string;
  noDataText?: string;
  stickyHeader?: boolean;
  loading?: boolean;
  skeletonRows?: number;
}
