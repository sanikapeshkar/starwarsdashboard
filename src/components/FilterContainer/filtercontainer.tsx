
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { FiltersProps } from "./filtercontainer.types";


const hyperdriveOptions = [
  "Any",
  "0.5",
  "1.0",
  "2.0",
  "4.0",
  "10.0",
];

const crewOptions = [
  "Any",
  "1",
  "2-4",
  "5-10",
  "11-100",
  "100+",
];

export default function FiltersCard({ onChange, onClear }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [hyperdrive, setHyperdrive] = useState("Any");
  const [crew, setCrew] = useState("Any");

  const handleUpdate = () => {
    // onChange({ search, hyperdrive, crew });
  };

  const handleClear = () => {
    // setSearch("");
    // setHyperdrive("Any");
    // setCrew("Any");
    // onClear();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="e.g. Millennium Falcon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={handleUpdate}
          />
        </div>

        <div>
          <Label>Hyperdrive Rating</Label>
          <Select
            value={hyperdrive}
            onValueChange={(val) => {
              setHyperdrive(val);
              handleUpdate();
            }}
          >
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

        <div>
          <Label>Crew Size</Label>
          <Select
            value={crew}
            onValueChange={(val) => {
              setCrew(val);
              handleUpdate();
            }}
          >
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

        <div className="col-span-1 md:col-span-3 text-right">
          <Button variant="outline" onClick={handleClear}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
