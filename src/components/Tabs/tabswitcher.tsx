"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { TabSwitcherProps } from "./tabs.types";


export default function TabSwitcher({ tabs, onTabChange }: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "");

  const handleChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleChange} className="w-full">
      <TabsList className="mx-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(
        (tab) =>
          tab.content && (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          )
      )}
    </Tabs>
  );
}
