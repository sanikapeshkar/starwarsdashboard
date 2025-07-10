import { cn } from "@/lib/utils";
import { HeaderProps } from "./header.types";
import { Rocket } from "lucide-react";

export const Header = ({ className }: HeaderProps) => {
  return (
    <div className={cn("flex m-2 mb-6", className)}>
      <div className="m-2 p-3 bg-blue-100 rounded-xl">
        <Rocket className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Star Wars Fleet Management
        </h1>

        <p className="text-muted-foreground text-sm mt-1">
          Explore, compare, and manage starships from across the galaxy
        </p>
      </div>
    </div>
  );
};
