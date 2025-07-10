import { StarshipCard } from "../StarShipCard/StarShipCard";
import { Starship } from "../StarShipCard/starshipcard.types";

export default function ComparisonGrid({ starships }: { starships: Starship[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {starships.map((ship) => (
        <StarshipCard key={ship.name} starship={ship} />
      ))}
    </div>
  );
}
