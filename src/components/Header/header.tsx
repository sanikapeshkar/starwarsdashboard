"use client"
import { cn } from "@/lib/utils";
import { HeaderProps } from "./header.types";
import { Rocket } from "lucide-react";
import ThemeToggle from "../ToggleTheme/ToggleTheme";
import { Pill } from "../Pill/pill";
import { useAtom } from "jotai";
import { selectedStarshipsAtom } from "@/lib/atoms/starSelection";

export const Header = ({ className }: HeaderProps) => {
  const [selectedships] =useAtom(selectedStarshipsAtom)
  return (
    <div className="mt-4 mx-2 flex justify-between">
      <div className={cn("flex m-2 mb-6", className)}>
        <div className="h-[60px] w-[60px] mx-4 my-2 p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <Rocket className="h-[30px] w-[30px] text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Star Wars Fleet Management
          </h1>

          <p className="text-muted-foreground text-sm mt-1">
            Explore, compare, and manage starships from across the galaxy
          </p>
          <Pill className="my-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{selectedships.length!==0 ? selectedships.length + " ship selected" : "No starships selected" }</Pill>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};
