import ComparisonGrid from "@/components/ComparisonGrid/ComparisonGrid";
import FiltersCard from "@/components/FilterContainer/filtercontainer";
import { Header } from "@/components/Header/header";
import { StarShipTable } from "@/components/Table/StarShipTable";
import TabSwitcher from "@/components/Tabs/tabswitcher";

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-2">
        <TabSwitcher
          tabs={[
            {
              value: "all",
              label: "All Starships",
              content: (
                <div className="px-8 py-4 ">
                  <h1 className="text-2xl font-bold mb-4">Starships</h1>
                  <FiltersCard />
                  <StarShipTable />
                </div>
              ),
            },
            {
              value: "compare",
              label: "Compare",
              content: (
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Compare Starships</h1>
                  <ComparisonGrid />
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
