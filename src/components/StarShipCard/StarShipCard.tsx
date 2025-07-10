import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Props } from "./starshipcard.types";


export function StarshipCard({ starship, onRemove }: Props) {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{starship.name}</CardTitle>
        {onRemove && (
          <Button variant="destructive" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Model:</span>{" "}
          {starship.model}
        </div>
        <div>
          <span className="font-medium text-foreground">Manufacturer:</span>{" "}
          {starship.manufacturer}
        </div>
        <div>
          <span className="font-medium text-foreground">Crew:</span>{" "}
          {starship.crew}
        </div>
        <div>
          <span className="font-medium text-foreground">Passengers:</span>{" "}
          {starship.passengers}
        </div>
        <div>
          <span className="font-medium text-foreground">Hyperdrive:</span>{" "}
          {starship.hyperdrive_rating}
        </div>
      </CardContent>
    </Card>
  );
}
