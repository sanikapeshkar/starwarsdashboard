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
import { useAtom } from "jotai";
import {
  selectedStarshipsAtom,
  starShipsAtom,
} from "@/lib/atoms/starSelection";
import { tsRestClient } from "@/lib/services/tsrestClient";

export const StarShipTable = () => {
  const [currentpage, setPage] = useState(4); 
  const [starshipdata, setStarshipdata] = useAtom(starShipsAtom);
  const [selectedShips, setSelectedShips] = useAtom(selectedStarshipsAtom);
  
const { data, error, isLoading } = tsRestClient.starships.getStarships.useQuery(
  ['starships', currentpage], 
  {
    query: {
      currentpage,
      limit: 10,
    },
  },
  {
    staleTime: 0, 
  }
);

console.log(
  tsRestClient.starships.getStarships.getRequestUrl({
    query: { page: 3, limit: 10 },
  })
);
  const results = data?.body.results ?? [];
console.log(data,'from starships table');
  useEffect(() => {
    if (results && results.length > 0) {
      setStarshipdata(results);
    }
  }, [results, setStarshipdata]); // Use results in the dependency array

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
    <div className="rounded-md border w-full">
      <Table className="table-fixed w-full">
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-sm truncate whitespace-normal break-words"
                >
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
          disabled={currentpage === 1}
        >
          Previous
        </Button>
        <span>Page {currentpage}</span>
        <Button onClick={() => setPage((old) => old + 1)}>Next</Button>
      </div>
    </div>
  );
};