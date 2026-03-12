// scorer.js — Confidence scoring for unknown Turkish surnames

import { suffixes, prefixes, turkishChars } from "./patterns.js";

const THRESHOLD = 7;

/**
 * Score a candidate surname based on contextual and phonological signals.
 * @param {string} surname - The surname to evaluate.
 * @param {object} context - Supporting context from the page.
 * @param {string[]} context.affiliations - Affiliation strings found near the name.
 * @param {string}   context.pageText     - Raw page text for keyword scanning.
 * @param {string[]} context.institutions - Known Turkish institution keywords.
 * @returns {{ score: number, reasons: string[] }}
 */
export function scoreSurname(surname, context = {}) {
  let score = 0;
  const reasons = [];
  const lower = surname.toLowerCase();

  // +5 — -oğlu / -oglu suffix
  if (suffixes.some((s) => lower.endsWith(s))) {
    score += 5;
    reasons.push("-oğlu/-oglu suffix detected");
  }

  // +3 — Turkish special characters present
  if (turkishChars.some((c) => surname.includes(c))) {
    score += 3;
    reasons.push("Turkish character(s) found");
  }

  // +1 — Common Turkish prefix
  if (prefixes.some((p) => lower.startsWith(p))) {
    score += 1;
    reasons.push("Common Turkish prefix matched");
  }

  // +4 — Turkish institution in affiliation
  const { affiliations = [], institutions = [] } = context;
  const affText = affiliations.join(" ").toLowerCase();
  if (institutions.some((inst) => affText.includes(inst))) {
    score += 4;
    reasons.push("Turkish institution found in affiliation");
  }

  // +3 — "Turkey" mentioned in surrounding page text
  if ((context.pageText || "").toLowerCase().includes("turkey")) {
    score += 3;
    reasons.push('"Turkey" found in page context');
  }

  return { score, reasons, isCandidate: score >= THRESHOLD };
}
