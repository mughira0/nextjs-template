"use client";

import React, { CSSProperties, ReactNode } from "react";

export interface TableHeader {
  label: string;
  key: string;
  align?: "left" | "center" | "right";
  width?: string;
  headerStyle?: CSSProperties;
  headerClassName?: string;
  cellStyle?: CSSProperties;
  cellClassName?: string;
  render?: (value: any, row: any, index: number) => ReactNode;
}

interface TableStructureProps {
  headers: TableHeader[];
  data: any[];
  className?: string;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  trClassName?: string;
  thClassName?: string;
  tdClassName?: string;
  emptyMessage?: string;
  emptyHeight?: string;
  onRowClick?: (row: any, index: number) => void;
  striped?: boolean;
  hover?: boolean;
}

export default function TableStructure({
  headers,
  data,
  className = "",
  tableClassName = "",
  theadClassName = "",
  tbodyClassName = "",
  trClassName = "",
  thClassName = "",
  tdClassName = "",
  emptyMessage = "No data found",
  emptyHeight = "280px",
  onRowClick,
  striped = false,
  hover = true,
}: TableStructureProps) {
  return (
    <div className={`table-container ${className}`}>
      <div className="table-wrapper">
        <table className={`table ${tableClassName}`}>
          {/* Header */}
          <thead className={`table-head ${theadClassName}`}>
            <tr className={trClassName}>
              {headers.map(
                ({
                  label,
                  key,
                  align = "left",
                  width,
                  headerStyle,
                  headerClassName = "",
                }) => (
                  <th
                    key={key}
                    className={`table-th ${thClassName} ${headerClassName} text-${align}`}
                    style={{ width, ...headerStyle }}
                  >
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className={`table-body ${tbodyClassName}`}>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="table-td-empty"
                  style={{ height: emptyHeight }}
                >
                  <div className="empty-state">
                    <svg
                      className="empty-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="empty-text">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  onClick={() => onRowClick?.(row, index)}
                  className={`
                    table-tr
                    ${trClassName}
                    ${striped && index % 2 === 1 ? "table-tr-striped" : ""}
                    ${hover ? "table-tr-hover" : ""}
                    ${onRowClick ? "table-tr-clickable" : ""}
                  `}
                >
                  {headers.map(
                    ({
                      key,
                      align = "left",
                      width,
                      cellStyle,
                      cellClassName = "",
                      render,
                    }) => (
                      <td
                        key={key}
                        className={`table-td ${tdClassName} ${cellClassName} text-${align}`}
                        style={{ width, ...cellStyle }}
                      >
                        {render ? render(row[key], row, index) : row[key]}
                      </td>
                    )
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
