const { google } = require("googleapis");

export async function handler (event) {
  try {
    // Check if the request method is POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    // Parse the request body
    const requestData = JSON.parse(event.body);

    // Authenticate with Google Sheets API
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    // Define spreadsheet and range
    const spreadsheetId = process.env.SPREADSHEET_ID; // Store in Netlify environment variables
    const range = "orders!A2:R"; // Adjust range as needed

    // Update Google Sheets with provided data
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values: requestData.data },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data updated successfully", response }),
    };
  } catch (error) {
    console.error("Error updating Google Sheets:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update Google Sheets", details: error.message }),
    };
  }
};
