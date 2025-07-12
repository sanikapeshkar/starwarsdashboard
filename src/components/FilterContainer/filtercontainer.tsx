"use client";

import { useDebounce } from "use-debounce";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { applyFilters } from "@/lib/services/starships.service";
import { useAtom } from "jotai";
import { filterSettingsAtom, starShipsAtom } from "@/lib/atoms/starSelection";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { crewOptions, hyperdriveOptions } from "./filtercontainer.types";
import { py4eClient } from "@/lib/services/tsrestClient";

export default function FiltersCard() {
  const [_, setStarships] = useAtom(starShipsAtom);
  const [filter, setFilterSettings] = useAtom(filterSettingsAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 800);
  const [hyperdrive, setHyperdrive] = useState("Any");
  const [crew, setCrew] = useState("Any");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = py4eClient.searchStarships.useQuery([
    {
      query: {
        search: debouncedSearchTerm,
      },
    },
  ]);

  const result = data?.body?.results ?? [];
  
console.log(result,'from starships filter');
  const filteredResults = useMemo(() => {
    return applyFilters(result, {
      hyperdriveRating: hyperdrive,
      crewSizeRange: crew,
    });
  }, [result, crew, hyperdrive]);

  useEffect(() => {
    if (Array.isArray(result)) {
      setStarships(filteredResults);
    }
  }, [filteredResults, result]);

  const handleClear = () => {
    setSearchTerm("");
    setHyperdrive("Any");
    setCrew("Any");
    queryClient.invalidateQueries({ queryKey: ["search", debouncedSearchTerm] });
  };

  const onHyperdriveChange = (value: string) => {
    if (value !== hyperdrive) {
      setHyperdrive(value);
    }
  };

  const onCrewChange = (value: string) => {
    if (value !== crew) {
      setCrew(value);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading starships.</div>;

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