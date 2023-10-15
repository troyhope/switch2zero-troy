export const mockDatabase = {
  countries: [
    {
      country: "Singapore",
      avgCO2PerPersonPerYear: 8.56,
      purchases: [
        { id: 0, monthYear: "Jan-2023", numberOfTrees: 31 },
        { id: 1, monthYear: "Feb-2023", numberOfTrees: 10 },
        { id: 2, monthYear: "Jun-2023", numberOfTrees: 5 },
        { id: 3, monthYear: "Feb-2024", numberOfTrees: 5 },
        { id: 4, monthYear: "Mar-2024", numberOfTrees: 40 },
        { id: 5, monthYear: "Feb-2025", numberOfTrees: 55 },
        { id: 6, monthYear: "Mar-2026", numberOfTrees: 55 },
        { id: 7, monthYear: "Apr-2027", numberOfTrees: 55 },
        { id: 8, monthYear: "Apr-2028", numberOfTrees: 50 },
      ],
      totalTrees: 306,
    },
    {
      country: "Australia",
      avgCO2PerPersonPerYear: 17.1,
      purchases: [
        { id: 0, monthYear: "Apr-2023", numberOfTrees: 19 },
        { id: 1, monthYear: "Jun-2024", numberOfTrees: 10 },
        { id: 2, monthYear: "Jan-2025", numberOfTrees: 15 },
        { id: 3, monthYear: "Jan-2026", numberOfTrees: 15 },
        { id: 4, monthYear: "May-2027", numberOfTrees: 5 },
        { id: 5, monthYear: "Sep-2028", numberOfTrees: 10 },
      ],
      totalTrees: 74,
    },
  ],
  simulationMode: "Monthly",
  selectedCountry: "Singapore",
};
