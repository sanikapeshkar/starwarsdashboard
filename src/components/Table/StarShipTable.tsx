"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Props, Starship } from "./starshiptable.types";
import { useQuery } from "@tanstack/react-query";

export const StarShipTable = () => {
   const fetchStarships = async () => {
    const res = await fetch("https://swapi.tech/api/starships"); 
    const data = await res.json();
    return data.results;
  };

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["starships"],
    queryFn: fetchStarships,
  });

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
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => alert(`Viewing ${row.original.name}`)}
        >
          View
        </Button>
      ),
    },
  ];

  const table = useReactTable({
   data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
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
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
