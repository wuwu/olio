// services/productsService.ts
import { getGoogleSheetsClient } from "./googleSheetClient";

export type Product = {
  pid: string;
  size: number; // Size in liters
  pricePerLiter: number; // Price per liter in euros
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: "Products!A2:C",
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.warn("No product data found.");
      return [];
    }

    return rows.map((row) => ({
      pid: row[0],
      size: parseFloat(row[1]),
      pricePerLiter: parseFloat(row[2]),
    }));
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch products");
  }
};
