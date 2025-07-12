"use client";

import { useAtom } from "jotai";
import { StarshipCard } from "../StarShipCard/StarShipCard";
import { selectedStarshipsAtom } from "@/lib/atoms/starSelection";

export default function ComparisonGrid() {
  const [selectedShips] = useAtom(selectedStarshipsAtom);
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {selectedShips.length === 0 && (
        <h3 className="mt-2 text-md  text-gray-600 dark:text-gray-300 px-4 py-2">
          No ships selected
        </h3>
      )}
      {selectedShips.map((ship) => (
        <StarshipCard key={ship.name} starship={ship} />
      ))}
    </div>
  );
}
