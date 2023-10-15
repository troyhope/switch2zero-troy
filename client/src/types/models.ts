export type SimulationMode = "Monthly" | "Yearly";

export type Purchase = {
  id: number;
  monthYear: string;
  numberOfTrees: number;
};

export type CountryData = {
  country: string;
  avgCO2PerPersonPerYear: number;
  purchases: Purchase[];
  totalTrees: number;
};

export type SimulationData = {
  countries: CountryData[];
  simulationMode: SimulationMode;
  selectedCountry: string;
};
