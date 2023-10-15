import React, { createContext, useState } from "react";
import useSWR, { mutate } from "swr";
import { CountryData, Purchase } from "../types/models";

import { fetcher, parseDate } from "../utils/helpers";

export const SimulationContext = createContext<{
  addPurchase: (newPurchase: Purchase) => void;
  deletePurchase: (id: number) => void;
  calculateTotalTrees: () => number;
  simulationData: CountryData;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  simulationMode: string;
  setSimulationMode: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
} | null>(null);

export const SimulationProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Singapore");

  const { data: simulationData, error } = useSWR(
    `http://localhost:4000/api/simulationData/${selectedCountry}`,
    fetcher
  );

  const isLoading = !simulationData && !error;

  const [simulationMode, setSimulationMode] = useState(
    simulationData ? simulationData.simulationMode : "Monthly"
  );

  const addPurchase = async (newPurchase) => {
    const key = `http://localhost:4000/api/simulationData/${selectedCountry}`;

    // Calculate new ID for optimistic update
    newPurchase.id =
      Math.max(...simulationData.purchases.map((p) => p.id), 0) + 1;

    // Check if the total number of trees purchased this year is more than 55
    const currentYear = newPurchase.monthYear.split("-")[1];
    const totalTreesThisYear = simulationData.purchases
      .filter((purchase) => purchase.monthYear.split("-")[1] === currentYear)
      .reduce((total, purchase) => total + purchase.numberOfTrees, 0);

    if (totalTreesThisYear + newPurchase.numberOfTrees > 55) {
      alert("You cannot purchase more than 55 trees in one year.");

      return;
    }

    // Determine insertion point for new purchase
    const position = simulationData.purchases.findIndex(
      (purchase) =>
        parseDate(purchase.monthYear) > parseDate(newPurchase.monthYear)
    );

    // Create updated purchases array based on position
    const updatedPurchases =
      position === -1
        ? [...simulationData.purchases, newPurchase]
        : [
            ...simulationData.purchases.slice(0, position),
            newPurchase,
            ...simulationData.purchases.slice(position),
          ];

    // Optimistic UI update
    mutate(key, { ...simulationData, purchases: updatedPurchases }, false);

    try {
      const response = await fetch(
        `http://localhost:4000/api/${selectedCountry}/purchases`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPurchase),
        }
      );

      if (!response.ok) throw new Error("Failed to add new purchase");

      await response.json();

      // Revalidate the cache with the key.
      mutate(key);
    } catch (error) {
      console.error("Error while adding new purchase:", error.message);
      // Revert optimistic update since there was an error.
      mutate(key, simulationData, false);
    }
  };

  const deletePurchase = async (id: number) => {
    if (!simulationData || !simulationData.purchases) return;

    const key = `http://localhost:4000/api/simulationData/${selectedCountry}`;

    const updatedPurchases = simulationData.purchases.filter(
      (p) => p.id !== id
    );

    mutate(
      key,
      {
        ...simulationData,
        purchases: updatedPurchases,
      },
      false
    );

    try {
      const response = await fetch(
        `http://localhost:4000/api/${selectedCountry}/purchases/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete purchase");
      }

      mutate(key);
    } catch (error) {
      mutate(key, simulationData, false);
    }
  };

  const calculateTotalTrees = () => {
    if (simulationData && simulationData.purchases) {
      return simulationData.purchases.reduce(
        (total, purchase) => total + purchase.numberOfTrees,
        0
      );
    }

    return 0;
  };

  if (error) {
    console.error("Failed to fetch data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <SimulationContext.Provider
      value={{
        isLoading,
        simulationData,
        selectedCountry,
        setSelectedCountry,
        simulationMode,
        setSimulationMode,
        deletePurchase,
        calculateTotalTrees,
        addPurchase,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
