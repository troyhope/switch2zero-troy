import { Purchase } from "../types/models";

export const calculateNeutralityDate = (
  avgCO2PerPersonPerYear: number,
  purchases: Purchase[]
): { achieved: boolean; date: string } => {
  // Convert the average yearly CO2 consumption from metric tons to kilograms
  const yearlyCO2PerPersonKg = avgCO2PerPersonPerYear * 1000;

  // Find the earliest purchase year from the data
  const earliestPurchaseYear = Math.min(
    ...purchases.map((p) => parseInt(p.monthYear.split("-")[1]))
  );

  const maxIterations = 100;

  // Check for carbon neutrality each year, starting from the earliest purchase year
  for (
    let year = earliestPurchaseYear, iterations = 0;
    iterations < maxIterations;
    year++, iterations++
  ) {
    let totalOffset = 0; // Reset the total offset for each year

    // Calculate the total offset from all trees planted in previous years
    for (const purchase of purchases) {
      const purchaseYear = parseInt(purchase.monthYear.split("-")[1]);

      // Assuming trees start offsetting CO2 immediately
      if (year >= purchaseYear) {
        totalOffset += purchase.numberOfTrees * 28.5;
      }
    }

    // Check if carbon neutrality is achieved
    if (totalOffset >= yearlyCO2PerPersonKg) {
      return { achieved: true, date: `November ${year}` };
    }
  }

  // If carbon neutrality is not achieved within the maxIterations, return an object indicating so
  return { achieved: false, date: "" };
};

export const calculateMonthlyMaintenanceCost = (totalTrees: number): number => {
  return (totalTrees * (120 * 0.1)) / 12;
};

export const calculateExpenditure = (
  purchases: Purchase[]
): { total: number; purchaseCosts: number; maintenanceFees: number } => {
  let purchaseCosts = 0;
  let maintenanceFees = 0;

  for (const purchase of purchases) {
    // Extract the purchase year from the monthYear string
    const purchaseYear = parseInt(purchase.monthYear.split("-")[1]);

    // Calculate the purchase cost for the current purchase
    const currentPurchaseCost = purchase.numberOfTrees * 120;
    purchaseCosts += currentPurchaseCost;

    // Calculate the remaining years for maintenance fee for the current purchase
    const remainingYears = 10 - (purchaseYear - 2023);

    // Calculate the maintenance cost for the current purchase for the remaining years
    const currentMaintenanceFees = purchase.numberOfTrees * 12 * remainingYears;
    maintenanceFees += currentMaintenanceFees;
  }

  // Sum the purchase costs and maintenance fees to get the total expenditure
  const total = purchaseCosts + maintenanceFees;

  return { total, purchaseCosts, maintenanceFees };
};
