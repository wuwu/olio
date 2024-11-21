import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

export const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.getClient() as any;
  const sheets = google.sheets({ version: "v4", auth: authClient });

  return sheets;
};

export const updateStockData = async (data: (string | number)[][]) => {
  try {
    const sheets = await getGoogleSheetsClient();

    const spreadsheetId = process.env.SPREADSHEET_ID!;
    const range = "orders!A2:R"; // Referencing 'orders' sheet specifically

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: data,
      },
    });

    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating stock data:", error);
    throw error;
  }
};
