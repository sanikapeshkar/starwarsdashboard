"use client";

import { comparisonmodal } from "@/lib/atoms/starSelection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useAtom } from "jotai";
import ComparisonGrid from "../ComparisonGrid/ComparisonGrid";

export const ComparisonGridModal = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(comparisonmodal);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="min-w-5xl">
        <DialogHeader>
          <DialogTitle>Compare Starships</DialogTitle>
        </DialogHeader>
        <ComparisonGrid />
      </DialogContent>
    </Dialog>
  );
};
