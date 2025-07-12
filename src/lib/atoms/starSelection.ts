import { Starship } from "@/components/Table/starshiptable.types";
import { atom } from "jotai";

export const selectedStarshipsAtom = atom<Starship[]>([]);
export const starShipsAtom = atom<Starship[]>([]);

export const filterSettingsAtom = atom({
  hyperdriveRating: 0,
  crewSizeRange: [0, Infinity] as [number, number] | number,
});
