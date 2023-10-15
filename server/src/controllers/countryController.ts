import { Request, Response } from "express";
import { mockDatabase } from "../mockData";
import { parseDate, generatePurchaseId } from "../utils/helpers";

interface Country {
  country: string;
  avgCO2PerPersonPerYear: number;
  purchases: Purchase[];
  totalTrees: number;
}

interface Purchase {
  id: number;
  monthYear: string;
  numberOfTrees: number;
}

export const getCountries = (req: Request, res: Response): void => {
  const countryNames: string[] = mockDatabase.countries.map(
    (country: Country) => country.country
  );
  res.json(countryNames);
};

export const getSimulationData = (req: Request, res: Response): void => {
  const countryName = req.params.country;
  const countryData = mockDatabase.countries.find(
    (country: Country) => country.country === countryName
  );

  if (countryData) {
    res.json(countryData);
  } else {
    res.status(404).json({ message: "Country not found." });
  }
};

export const deletePurchase = (req: Request, res: Response): void => {
  const countryName = req.params.country;
  const purchaseId = Number(req.params.id);

  if (isNaN(purchaseId)) {
    res.status(400).json({ message: "Invalid purchase ID." });
    return;
  }

  const countryData = mockDatabase.countries.find(
    (country: Country) => country.country === countryName
  );

  if (!countryData || !countryData.purchases) {
    res.status(404).json({ message: "Country not found." });
    return;
  }

  const originalLength = countryData.purchases.length;
  countryData.purchases = countryData.purchases.filter(
    (purchase: Purchase) => purchase.id !== purchaseId
  );

  if (originalLength === countryData.purchases.length) {
    res.status(404).json({ message: "Purchase not found." });
  } else {
    res.json({ message: "Purchase deleted successfully!" });
  }
};

export const addPurchase = (req: Request, res: Response): void => {
  const countryName = req.params.country;
  const newPurchase: Purchase = req.body as Purchase;

  const countryData = mockDatabase.countries.find(
    (country: Country) => country.country === countryName
  );

  if (!countryData || !countryData.purchases) {
    res.status(404).json({ message: "Country not found." });
    return;
  }

  newPurchase.id = generatePurchaseId(countryData);
  const position = countryData.purchases.findIndex(
    (purchase: Purchase) =>
      parseDate(purchase.monthYear) > parseDate(newPurchase.monthYear)
  );

  if (position === -1) {
    countryData.purchases.push(newPurchase);
  } else {
    countryData.purchases.splice(position, 0, newPurchase);
  }

  res.json(newPurchase);
};
