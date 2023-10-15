const monthNames = [
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
];

export const formatMonthYear = (month, year) => {
  const shortYear = year.toString().substring(2);
  return `${monthNames[month - 1]}-${shortYear}`;
};

export const getMonthlyOffset = (month, year, purchases) => {
  let totalOffset = 0;

  for (const purchase of purchases) {
    const [purchaseMonthStr, purchaseYearStr] = purchase.monthYear.split("-");
    const purchaseMonth = monthNames.indexOf(purchaseMonthStr) + 1;
    const purchaseYear = parseInt(purchaseYearStr, 10);

    if (purchaseYear === year && purchaseMonth <= month) {
      totalOffset += purchase.numberOfTrees * (28.5 / 12);
    } else if (purchaseYear < year) {
      totalOffset += purchase.numberOfTrees * (28.5 / 12);
    }
  }
  return totalOffset;
};

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

export const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Network response was not ok. Response body: ${text}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    const text = await response.text();
    throw new Error(
      `Received content is not valid JSON. Response body: ${text}`
    );
  }
};
