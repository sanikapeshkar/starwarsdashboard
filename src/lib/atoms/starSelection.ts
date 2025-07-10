
import { Starship } from "@/components/Table/starshiptable.types";
import { atom } from "jotai";

export const selectedStarshipsAtom = atom<string[]>([]);
export const starShips =atom<Starship[]>([]);