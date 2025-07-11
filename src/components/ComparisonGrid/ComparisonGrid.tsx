"use client";

import { useAtom } from "jotai";
import { StarshipCard } from "../StarShipCard/StarShipCard";
import { selectedStarshipsAtom } from "@/lib/atoms/starSelection";

export default function ComparisonGrid() {
  const [selectedShips] = useAtom(selectedStarshipsAtom);
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {selectedShips.map((ship) => (
        <StarshipCard key={ship.name} starship={ship} />
      ))}
    </div>
  );
}
