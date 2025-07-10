"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const hyperdriveOptions = ["Any", "0.5", "1.0", "2.0", "4.0", "10.0"];

const crewOptions = ["Any", "1", "2-4", "5-10", "11-100", "100+"];

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

  const labelClassName = "mb-2";
  return (
    <Card className="m-4 w-[90%] max-w-6xl mx-auto mb-6">
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex-1">
          <Label className={labelClassName} htmlFor="search">
            Search
          </Label>
          <Input
            id="search"
            placeholder="e.g. Millennium Falcon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={handleUpdate}
          />
        </div>

        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <Label className={labelClassName}>Hyperdrive Rating</Label>
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

          <div className="flex-1">
            <Label className={labelClassName}>Crew Size</Label>
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
        </div>
      </CardContent>
    </Card>
  );
}
