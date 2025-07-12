"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchStarships } from "@/lib/services/starships.service";
import { useAtom } from "jotai";
import {
  selectedStarshipsAtom,
  starShipsAtom,
} from "@/lib/atoms/starSelection";
import { Starship } from "./starshiptable.types";

export const StarShipTable = () => {
  const [page, setPage] = useState(1);
  const [starshipdata, setStarshipdata] = useAtom(starShipsAtom);
  const [selectedShips, setSelectedShips] = useAtom(selectedStarshipsAtom);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["starships", page],
    queryFn: () => fetchStarships(page),
  });

  useEffect(() => {
    if (data?.length > 0) {
      setStarshipdata(data);
    }
  }, [data, setStarshipdata]);

  const handleSelect = (starship: Starship) => {
    setSelectedShips((prev) => {
      const isSelected = prev.some((s) => s.name === starship.name);
      return isSelected
        ? prev.filter((s) => s.name !== starship.name)
        : [...prev, starship];
    });
  };

  const columns: ColumnDef<Starship>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "manufacturer", header: "Manufacturer" },
    { accessorKey: "crew", header: "Crew" },
    { accessorKey: "passengers", header: "Passengers" },
    {
      accessorKey: "hyperdrive_rating",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={() => column.toggleSorting(isSorted === "asc")}
            className="cursor-pointer select-none flex items-center gap-1"
          >
            Hyperdrive
            {isSorted === "asc" ? (
              <span>▲</span>
            ) : isSorted === "desc" ? (
              <span>▼</span>
            ) : (
              <span className="opacity-30">⇅</span>
            )}
          </div>
        );
      },
      enableSorting: true,
      sortingFn: (a, b) =>
        parseFloat(a.getValue("hyperdrive_rating") as string) -
        parseFloat(b.getValue("hyperdrive_rating") as string),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const ship = row.original;
        const isSelected = selectedShips.some((s) => s.name === ship.name);
        return (
          <Button
            size="sm"
            variant={isSelected ? "destructive" : "outline"}
            onClick={() => handleSelect(ship)}
          >
            {isSelected ? "Remove" : "Select"}
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: starshipdata,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading starships.</div>;

  return (
    <div className="rounded-xl border w-full">
      <Table className="table-fixed w-full border border-gray-200 dark:border-gray-700 rounded-xl">
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow
              key={group.id}
              className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
            >
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-sm truncate whitespace-normal break-words text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
                >
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header &&
                      header.column.columnDef.header instanceof Function
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="text-sm truncate whitespace-normal break-words"
                >
                  {cell.column.columnDef.cell
                    ? cell.column.columnDef.cell instanceof Function
                      ? cell.column.columnDef.cell(cell.getContext())
                      : cell.column.columnDef.cell
                    : cell.getValue()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-4">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((old) => old + 1)}>Next</Button>
      </div>
    </div>
  );
};
