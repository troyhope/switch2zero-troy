import { useContext } from "react";
import useSWR from "swr";

import { SimulationContext } from "../context/simulatorContext";
import { SimulationMode } from "../types/models";
import { fetcher } from "../utils/helpers";

import Dropdown from "../components/atoms/Dropdown";
import PurchasesTable from "../components/organisms/PurchasesTable";
import AddNewPurchase from "../components/molecules/AddNewPurchase";

export type Purchase = {
  id: number;
  monthYear: string;
  numberOfTrees: number;
};

function SimulationTool() {
  const simulationContext = useContext(SimulationContext);
  const { data: countries } = useSWR(
    "http://localhost:4000/api/countries",
    fetcher
  );

  const {
    simulationData,
    setSelectedCountry,
    setSimulationMode,
    selectedCountry,
    simulationMode,
    addPurchase,
  } = simulationContext;

  const handleCountry = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSimulationMode = (mode: string) => {
    setSimulationMode(mode as SimulationMode);
  };

  const handleNewPurchase = (formData) => {
    const purchases = simulationData.purchases || [];

    // Find the highest existing ID in the purchases for the selected country
    const highestId = Math.max(...purchases.map((p) => p.id), 0);

    addPurchase({ ...formData, id: highestId + 1 });
  };

  return (
    <div>
      <h2 className="p-2 text-2xl mb-5 font-bold">
        Carbon Offset Simulation Tool
      </h2>

      <div className="flex flex-col">
        <Dropdown
          label="Country"
          options={countries || []}
          selectedOption={selectedCountry}
          onOptionSelect={handleCountry}
          classNames="p-2 border rounded w-48"
        />
        <Dropdown
          label="Simulation Mode"
          options={["Monthly", "Yearly"]}
          selectedOption={simulationMode}
          onOptionSelect={handleSimulationMode}
          classNames="p-2 border rounded w-32"
        />
      </div>
      <PurchasesTable />
      <AddNewPurchase onSubmit={handleNewPurchase} />
    </div>
  );
}

export default SimulationTool;
