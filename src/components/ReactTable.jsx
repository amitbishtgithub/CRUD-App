import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import mdata from "../MOCK_DATA.json";
import { DateTime } from "luxon";
import { Tooltip } from "react-tooltip";

export default function ReactTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w3-responsive mt-2">
      <div>
        <input
          className="mb-1 border-1 "
          placeholder="Search Table"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="btn-group btn-group-sm mt-1" role="group">
          <button
            onClick={() => table.setPageIndex(0)}
            type="button"
            className="btn btn-light border-secondary"
          >
            {/* First */}
            <i className="fa-solid fa-1"></i>
          </button>
          <button
            onClick={() => table.previousPage()}
            id="previous"
            type="button"
            className="btn btn-light border-secondary"
            disabled={!table.getCanPreviousPage()}
          >
            {/* Previous */}
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button
            onClick={() => table.nextPage()}
            id="next"
            type="button"
            className="btn btn-light border-secondary"
            disabled={!table.getCanNextPage()}
          >
            {/* Next */}
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            id="end"
            type="button"
            className="btn btn-light border-secondary"
          >
            {/* Last */}
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
      <Tooltip anchorId="previous" place="bottom" content="Previous" />
      <Tooltip anchorId="next" place="bottom" content="Next" />
      <Tooltip anchorId="end" place="bottom" content="Last Page" />
    </div>
  );
}
