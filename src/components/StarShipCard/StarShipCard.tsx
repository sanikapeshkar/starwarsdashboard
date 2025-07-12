import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Props } from "./starshipcard.types";

export function StarshipCard({ starship, onRemove }: Props) {
  return (
    <Card className="w-full max-w-full border border-gray-300 dark:border-gray-700">
      <CardHeader className="flex items-center justify-between border-b px-4 py-2 bg-muted">
        <CardTitle className="text-md font-semibold truncate">{starship.name}</CardTitle>
        {onRemove && (
          <Button variant="destructive" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 px-4 py-4 text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">Model</span>
        <span className="text-foreground truncate break-words whitespace-normal">{starship.model}</span>

        <span className="font-medium text-gray-700 dark:text-gray-300">Manufacturer</span>
        <span className="text-foreground truncate break-words whitespace-normal">{starship.manufacturer}</span>

        <span className="font-medium text-gray-700 dark:text-gray-300">Crew</span>
        <span className="text-foreground">{starship.crew}</span>

        <span className="font-medium text-gray-700 dark:text-gray-300">Passengers</span>
        <span className="text-foreground">{starship.passengers}</span>

        <span className="font-medium text-gray-700 dark:text-gray-300">Hyperdrive</span>
        <span className="text-foreground">{starship.hyperdrive_rating}</span>
      </CardContent>
    </Card>
  );
}
