import { google } from 'googleapis';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeLabel, parseCountFromLabel } from '../shared/sheetUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SHEET_RANGE = 'B3:C200';
const DEFAULT_SHEET_ID = '1YUC5tefU6Cuq6WaR-75Mua_L6mn4NahGH0_jAcUwy6Q';

function getCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  }

  const credentialsPath = path.join(__dirname, '..', 'credentials.json');
  return JSON.parse(readFileSync(credentialsPath, 'utf8'));
}

function getAuthClient() {
  const credentials = getCredentials();
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheetsClient() {
  const auth = getAuthClient();
  return google.sheets({ version: 'v4', auth });
}

function getSpreadsheetId() {
  return process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
}

function isSkippableRow(label) {
  const normalized = normalizeLabel(label);
  if (!normalized) return true;

  const skipPrefixes = [
    'familias',
    'amigos',
    'confirmados',
    'total',
    'total lista',
  ];

  return skipPrefixes.some((prefix) => normalized.startsWith(prefix));
}

export async function readSheetRows() {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: SHEET_RANGE,
  });

  const values = response.data.values || [];

  return values
    .map((row, index) => {
      const label = (row[0] || '').trim();
      const confirmationRaw = (row[1] || '').trim();
      const confirmation = confirmationRaw === '' ? null : Number(confirmationRaw);

      return {
        rowNumber: index + 3,
        label,
        confirmation: Number.isFinite(confirmation) ? confirmation : null,
      };
    })
    .filter((row) => row.label && !isSkippableRow(row.label));
}

export async function getConfirmationsMap() {
  const rows = await readSheetRows();
  const confirmations = {};

  rows.forEach((row) => {
    if (row.confirmation !== null) {
      confirmations[row.label] = row.confirmation;
    }
  });

  return confirmations;
}

export async function writeConfirmation(rowNumber, count) {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `C${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[count]],
    },
  });
}

export async function appendManualGuest(label, count) {
  const sheets = getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'B:C',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[label, count]],
    },
  });
}

export function resolveCount(guestPayload) {
  if (Number.isFinite(guestPayload.count) && guestPayload.count > 0) {
    return guestPayload.count;
  }

  if (guestPayload.sheetLabel) {
    return parseCountFromLabel(guestPayload.sheetLabel);
  }

  return 1;
}
