import FiltersCard from "@/components/FilterContainer/filtercontainer";
import { StarShipTable } from "@/components/Table/StarShipTable";
import TabSwitcher from "@/components/Tabs/tabswitcher";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <FiltersCard />

      <div className="p-6">
        <TabSwitcher
          tabs={[
            {
              value: "all",
              label: "All Starships",
              content: (
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Starships</h1>
                  <StarShipTable />
                </div>
              ),
            },
            {
              value: "favorites",
              label: "Favorites",
              content: (
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Starships</h1>
                  <StarShipTable />
                </div>
              ),
            },
            {
              value: "compare",
              label: "Compare",
              content: (
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Starships</h1>
                  <StarShipTable />
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
