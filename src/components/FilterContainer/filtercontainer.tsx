"use client";

import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applyFilters,
  searchStarships,
} from "@/lib/services/starships.service";
import { useAtom } from "jotai";
import { starShipsAtom } from "@/lib/atoms/starSelection";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { crewOptions, hyperdriveOptions } from "./filtercontainer.types";

export default function FiltersCard() {
  const [, setStarships] = useAtom(starShipsAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 800);
  const [hyperdrive, setHyperdrive] = useState("Any");
  const [crew, setCrew] = useState("Any");
  const queryClient = useQueryClient();
  const [clearTrigger, setClearTrigger] = useState(0);

  const { data } = useQuery({
    queryKey: ["search", debouncedSearchTerm, clearTrigger],
    queryFn: () => searchStarships(debouncedSearchTerm),
    staleTime: 0,
    enabled: true,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filtered = applyFilters(data, {
        hyperdriveRating: hyperdrive,
        crewSizeRange: crew,
      });
      setStarships(filtered);
    }
  }, [data, crew, hyperdrive, setStarships]);

  const handleClear = () => {
    setSearchTerm("");
    setHyperdrive("Any");
    setCrew("Any");
    queryClient.invalidateQueries({ queryKey: ["search"] });
    setClearTrigger((prev) => prev + 1);
  };

  function onHyperdriveChange(value: string) {
    setHyperdrive(value);
  }

  function onCrewChange(value: string) {
    setCrew(value);
  }

  return (
    <Card className="m-2 w-full max-w-6xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2">
            Search
          </Label>
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
            <Select value={hyperdrive} onValueChange={onHyperdriveChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {hyperdriveOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="mb-2">Crew Size</Label>
            <Select value={crew} onValueChange={onCrewChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select crew size" />
              </SelectTrigger>
              <SelectContent>
                {crewOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 md:col-span-3 text-right flex items-end">
            <Button variant="outline" onClick={handleClear}>
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
