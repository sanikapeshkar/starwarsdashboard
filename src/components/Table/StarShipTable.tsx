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
import { starShips } from "@/lib/atoms/starSelection";

export const StarShipTable = () => {
  const [page, setPage] = useState(1);
  const [starshipdata, setStarshipdata] = useAtom(starShips);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["starships", page],
    queryFn: () => fetchStarships(page),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setStarshipdata(data);
    }
  }, [data]);

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
          Select
        </Button>
      ),
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
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
        <Button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((old) => old + 1)}>Next</Button>
      </div>
    </div>
  );
};
