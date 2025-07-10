"use client";

import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchStarships } from "@/lib/services/starships.service";
import { useAtom } from "jotai";
import { starShips } from "@/lib/atoms/starSelection";
import { Card ,CardContent, CardHeader, CardTitle} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {   Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../ui/select";
import { Button } from "../ui/button";


const hyperdriveOptions = ["Any", "0.5", "1.0", "2.0", "4.0", "10.0"];
const crewOptions = ["Any", "1", "2-4", "5-10", "11-100", "100+"];

export default function FiltersCard() {
  const [_, setStarships] = useAtom(starShips);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400); 

  const [hyperdrive, setHyperdrive] = useState("Any");
  const [crew, setCrew] = useState("Any");

  const { data } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => searchStarships(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
     staleTime: 0, 
  });

  const applyFilters = (starships: any[]) => {
    return starships.filter((ship) => {
      const matchesHyperdrive =
        hyperdrive === "Any" || ship.hyperdrive_rating === hyperdrive;

      const crewCount = parseInt(ship.crew.replace(/[^0-9]/g, "")) || 0;

      const matchesCrew =
        crew === "Any" ||
        (crew === "1" && crewCount === 1) ||
        (crew === "2-4" && crewCount >= 2 && crewCount <= 4) ||
        (crew === "5-10" && crewCount >= 5 && crewCount <= 10) ||
        (crew === "11-100" && crewCount > 10 && crewCount <= 100) ||
        (crew === "100+" && crewCount > 100);

      return matchesHyperdrive && matchesCrew;
    });
  };

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filtered = applyFilters(data);
      setStarships(filtered);
    }
  }, [data,hyperdrive, crew, setStarships]);

  const handleClear = () => {
    setSearchTerm("");
    setHyperdrive("Any");
    setCrew("Any");
    setStarships([]);
  };

  return (
    <Card className="m-4 w-[90%] max-w-6xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2">Search</Label>
          <Input
            id="search"
            placeholder="e.g. Millennium Falcon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <Label className="mb-2">Hyperdrive Rating</Label>
            <Select value={hyperdrive} onValueChange={setHyperdrive}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {hyperdriveOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label className="mb-2">Crew Size</Label>
            <Select value={crew} onValueChange={setCrew}>
              <SelectTrigger>
                <SelectValue placeholder="Select crew size" />
              </SelectTrigger>
              <SelectContent>
                {crewOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-1 md:col-span-3 text-right flex items-end">
            <Button variant="outline" onClick={handleClear}>Clear Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
