"use client";

import { useAtom } from "jotai";
import {
  filterSettingsAtom,
  searchTermAtom,
} from "@/lib/atoms/starSelection";
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
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [filter, setfilter] = useAtom(filterSettingsAtom);

  const handleClear = () => {
    setSearchTerm("");
    setfilter(() => ({ crewSizeRange: "Any", hyperdriveRating: "Any" }));
  };

  function onHyperdriveChange(value: string) {
    setfilter((prev) => ({ ...prev, hyperdriveRating: value }));
  }

  function onCrewChange(value: string) {
    setfilter((prev) => ({ ...prev, crewSizeRange: value }));
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
            <Select value={filter.hyperdriveRating} onValueChange={onHyperdriveChange}>
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
            <Select value={filter.crewSizeRange} onValueChange={onCrewChange}>
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
