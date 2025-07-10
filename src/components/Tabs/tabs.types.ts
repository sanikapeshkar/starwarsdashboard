import { ReactNode } from "react";

export type TabSwitcherProps = {
  tabs: { value: string; label: string; content?: ReactNode }[];
  onTabChange?: (value: string) => void;
};
