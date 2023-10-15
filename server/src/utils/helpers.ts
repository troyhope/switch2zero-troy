export const parseDate = (monthYear: string): Date => {
  const [month, year] = monthYear.split("-");
  const monthIndex = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].indexOf(month);
  if (monthIndex === -1) {
    throw new Error("Invalid month format");
  }
  return new Date(Number(year), monthIndex);
};

export const generatePurchaseId = (countryData: any) => {
  if (!countryData.purchases.length) return 0;
  return Math.max(...countryData.purchases.map((p: any) => p.id)) + 1;
};
