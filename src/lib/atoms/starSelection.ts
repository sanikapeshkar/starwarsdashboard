
import { Starship } from "@/components/Table/starshiptable.types";
import { atom } from "jotai";

export const selectedStarshipsAtom = atom<Starship[]>([]);
export const starShipsAtom =atom<Starship[]>([]);