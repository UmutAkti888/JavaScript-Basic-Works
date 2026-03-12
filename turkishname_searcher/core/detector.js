// detector.js — Main detection logic for Turkish names on web pages

import { scoreSurname } from "./scorer.js";

/**
 * Extract candidate name strings from raw HTML.
 * Targets common faculty/researcher markup patterns.
 * @param {string} html - Raw HTML content of the page.
 * @returns {string[]} Raw name strings found in the page.
 */
export function extractNames(html) {
  // TODO: implement HTML parsing
  // Target selectors: h3, .researcher-name, .faculty-name, [class*="name"]
  // For now returns empty array — parser to be wired in scan.js
  return [];
}

/**
 * Match a list of names against a known surnames list.
 * @param {string[]} names    - Names extracted from the page.
 * @param {string[]} surnames - Known Turkish surnames (from surnames.json).
 * @returns {{ matched: string[], unknown: string[] }}
 */
export function matchNames(names, surnames) {
  const knownSet = new Set(surnames.map((s) => s.toLowerCase()));
  const matched = [];
  const unknown = [];

  for (const name of names) {
    // Treat last token as surname
    const parts = name.trim().split(/\s+/);
    const surname = parts[parts.length - 1].toLowerCase();

    if (knownSet.has(surname)) {
      matched.push(name);
    } else {
      unknown.push(name);
    }
  }

  return { matched, unknown };
}

/**
 * Run full detection pipeline on a page.
 * @param {string} html         - Raw HTML of the target page.
 * @param {string[]} surnames   - Known Turkish surnames.
 * @param {string[]} institutions - Known Turkish institution keywords.
 * @param {string} pageText     - Plain text of the page for context scoring.
 * @returns {{ matched: string[], candidates: object[] }}
 */
export function detect(html, surnames, institutions, pageText = "") {
  const names = extractNames(html);
  const { matched, unknown } = matchNames(names, surnames);

  const candidates = [];

  for (const name of unknown) {
    const parts = name.trim().split(/\s+/);
    const surname = parts[parts.length - 1];

    // TODO: extract affiliations from HTML context near this name
    const affiliations = [];

    const result = scoreSurname(surname, { affiliations, institutions, pageText });

    if (result.isCandidate) {
      candidates.push({ name, surname, ...result });
    }
  }

  return { matched, candidates };
}
