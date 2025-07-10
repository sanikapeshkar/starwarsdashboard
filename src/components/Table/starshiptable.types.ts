export type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  passengers: string;
  hyperdrive_rating: string;
};

export type Props = {
  data: Starship[];
};