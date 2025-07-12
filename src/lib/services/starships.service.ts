import { Starship } from "@/components/StarShipCard/starshipcard.types";

export function parseCrew(crewStr: string): [number, number] {
  if (!crewStr || crewStr.toLowerCase() === "unknown") return [0, Infinity];

  const cleaned = crewStr.replace(/,/g, "").trim();

  if (cleaned.endsWith("+")) {
    const base = parseInt(cleaned.slice(0, -1), 10);
    return isNaN(base) ? [0, Infinity] : [base, Infinity];
  }

  const parts = cleaned.split("-").map((p) => parseInt(p, 10));

  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return [parts[0], parts[1]];
  }

  const singleValue = parts[0];
  return isNaN(singleValue) ? [0, Infinity] : [singleValue, singleValue];
}

type FilterSettings = {
  hyperdriveRating: string;
  crewSizeRange: string;
};

export function applyFilters(
  starships: Starship[],
  filters: FilterSettings
): Starship[] {
  const minRating =
    filters.hyperdriveRating === "Any"
      ? 0
      : parseFloat(filters.hyperdriveRating);
  let minCrew, maxCrew;
  if (filters.crewSizeRange === "Any") {
    minCrew = 0;
    maxCrew = Infinity;
  } else {
    const parsedcrew = parseCrew(filters.crewSizeRange);

    minCrew = parsedcrew[0];
    maxCrew = parsedcrew[1];
  }

  return starships.filter((ship) => {
    const rating = parseFloat(ship.hyperdrive_rating);
    const crew = parseCrew(ship.crew);
    return rating >= minRating && !(crew[1] < minCrew || crew[0] > maxCrew);
  });
}
