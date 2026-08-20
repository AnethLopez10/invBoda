import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  appendManualGuest,
  getConfirmationsMap,
  readSheetRows,
  resolveCount,
  writeConfirmation,
} from './sheets.js';
import {
  buildManualAppendLabel,
  findApproximateMatch,
  findSheetRowIndex,
} from './matchGuest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT || 8080);

const app = express();
app.use(compression());
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/confirmations', async (_req, res) => {
  try {
    const confirmations = await getConfirmationsMap();
    res.json({ confirmations });
  } catch (error) {
    console.error('GET /api/confirmations', error);
    res.status(500).json({ error: 'No se pudieron leer las confirmaciones' });
  }
});

app.post('/api/rsvp', async (req, res) => {
  try {
    const guests = req.body?.guests;
    if (!Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({ error: 'Se requiere al menos un invitado' });
    }

    if (guests.length > 10) {
      return res.status(400).json({ error: 'Demasiados invitados en una sola confirmación' });
    }

    const sheetRows = await readSheetRows();
    const updated = [];
    const appended = [];
    const errors = [];

    for (const guest of guests) {
      const count = resolveCount(guest);
      const inputName = guest.inputName || guest.sheetLabel || guest.name || '';
      let targetLabel = guest.sheetLabel || inputName;

      let rowIndex = findSheetRowIndex(sheetRows, targetLabel);

      if (rowIndex === -1) {
        const approximate = findApproximateMatch(sheetRows, inputName, count);
        if (approximate) {
          targetLabel = approximate.sheetLabel;
          rowIndex = findSheetRowIndex(sheetRows, targetLabel);
        }
      }

      if (rowIndex === -1) {
        try {
          const manualLabel = buildManualAppendLabel(inputName);
          await appendManualGuest(manualLabel, count);
          appended.push({ label: manualLabel, count });
          sheetRows.push({ rowNumber: null, label: manualLabel, confirmation: count });
        } catch (error) {
          errors.push({ inputName, message: error.message });
        }
        continue;
      }

      const row = sheetRows[rowIndex];

      try {
        await writeConfirmation(row.rowNumber, count);
        updated.push({ label: row.label, count });
        sheetRows[rowIndex] = { ...row, confirmation: count };
      } catch (error) {
        errors.push({ label: row.label, message: error.message });
      }
    }

    res.json({ updated, appended, errors });
  } catch (error) {
    console.error('POST /api/rsvp', error);
    res.status(500).json({ error: 'No se pudo registrar la confirmación' });
  }
});

app.use(
  express.static(distPath, {
    maxAge: '1y',
    etag: true,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (filePath.includes(`${path.sep}images${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  })
);

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`InvBoda server listening on ${PORT}`);
});
