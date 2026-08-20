import { allGuests } from '../src/data/guestList.js';
import { formatSheetLabel, normalizeLabel } from '../shared/sheetUtils.js';

const knownLabels = allGuests.map((guest) => ({
  sheetLabel: formatSheetLabel(guest),
  count: guest.count,
  name: guest.name,
}));

export function findSheetRowIndex(sheetRows, targetLabel) {
  const normalizedTarget = normalizeLabel(targetLabel);
  return sheetRows.findIndex((row) => normalizeLabel(row.label) === normalizedTarget);
}

export function findApproximateMatch(sheetRows, inputName, preferredCount) {
  const normalizedInput = normalizeLabel(inputName);
  if (!normalizedInput) return null;

  const exactNameMatches = knownLabels.filter(
    (guest) => normalizeLabel(guest.name) === normalizedInput
  );

  if (exactNameMatches.length === 1) {
    const match = exactNameMatches[0];
    return { sheetLabel: match.sheetLabel, count: match.count, matchType: 'guestList' };
  }

  if (exactNameMatches.length > 1 && preferredCount) {
    const match = exactNameMatches.find((guest) => guest.count === preferredCount);
    if (match) {
      return { sheetLabel: match.sheetLabel, count: match.count, matchType: 'guestList' };
    }
  }

  const sheetMatch = sheetRows.find((row) => {
    const rowLabel = normalizeLabel(row.label);
    return rowLabel.includes(normalizedInput) || normalizedInput.includes(rowLabel);
  });

  if (sheetMatch) {
    return {
      sheetLabel: sheetMatch.label,
      count: preferredCount || sheetMatch.count || 1,
      matchType: 'sheetApprox',
    };
  }

  const guestApprox = knownLabels.find((guest) => {
    const guestName = normalizeLabel(guest.name);
    return guestName.includes(normalizedInput) || normalizedInput.includes(guestName);
  });

  if (guestApprox) {
    return {
      sheetLabel: guestApprox.sheetLabel,
      count: guestApprox.count,
      matchType: 'guestListApprox',
    };
  }

  return null;
}

export function buildManualAppendLabel(inputName) {
  const trimmed = String(inputName || '').trim();
  return trimmed.startsWith('[Otro]') ? trimmed : `[Otro] ${trimmed}`;
}

export { formatSheetLabel, knownLabels };
