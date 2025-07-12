"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
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
import { Starship } from "./starshiptable.types";
import { useQuery } from "@tanstack/react-query";
import { fetchStarships } from "@/lib/services/starships.service";
import { useAtom } from "jotai";
import {
  selectedStarshipsAtom,
  starShipsAtom,
} from "@/lib/atoms/starSelection";

export const StarShipTable = () => {
  const [page, setPage] = useState(1);
  const [starshipdata, setStarshipdata] = useAtom(starShipsAtom);
  const [selectedShips, setSelectedShips] = useAtom(selectedStarshipsAtom);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["starships", page],
    queryFn: () => fetchStarships(page),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setStarshipdata(data);
    }
  }, [data, setStarshipdata]);

  const handleSelect = (starship: Starship) => {
    const isSelected = selectedShips.some((s) => s.name === starship.name);
    if (isSelected) {
      setSelectedShips(selectedShips.filter((s) => s.name !== starship.name));
    } else {
      setSelectedShips([...selectedShips, starship]);
    }
  };

  const columns: ColumnDef<Starship>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "manufacturer", header: "Manufacturer" },
    { accessorKey: "crew", header: "Crew" },
    { accessorKey: "passengers", header: "Passengers" },
    { accessorKey: "hyperdrive_rating", header: "Hyperdrive" },
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
    getCoreRowModel: getCoreRowModel(),
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
                <TableHead className="text-sm truncate whitespace-normal break-words text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
