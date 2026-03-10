PROJECT: Turkish Name Detector - Modular Architecture

OVERVIEW:
Build a JavaScript-based tool to detect Turkish names (Romanized) on foreign university 
websites. The system should use pattern matching with semi-automated candidate collection 
for continuous improvement.

ARCHITECTURE:
Create a modular file structure with separate concerns:

/turkish-name-detector
├── core/
│   ├── detector.js          # Main detection logic
│   ├── scorer.js            # Confidence scoring
│   └── patterns.js          # Phonological patterns
├── data/
│   ├── surnames.json        # Curated Turkish surnames (seed: ~50 common)
│   ├── institutions.json    # Turkish universities
│   └── patterns.json        # Prefixes, suffixes, vowel patterns
├── workflows/
│   ├── scan.js              # Scan university page for Turkish names
│   ├── review.js            # CLI tool to review candidates
│   └── merge.js             # Merge approved candidates to surnames.json
├── candidates/
│   ├── pending.json         # Auto-collected, needs review
│   ├── approved.json        # Human-verified
│   └── rejected.json        # False positives
├── tests/
│   └── validate.js          # Test against known cases
├── package.json
├── README.md
└── index.js                 # Main entry point

CORE FUNCTIONALITY:

1. detector.js
   - Extract names from HTML (target h3, .researcher-name, etc.)
   - Match against surnames.json
   - Score unknown names using patterns (see SCORING below)
   - Flag candidates with Turkish institution affiliations

2. scorer.js
   Confidence scoring for unknown surnames:
   - Turkish institution in affiliation: +4 points
   - "Turkey" mentioned in context: +3 points
   - -oğlu/-oglu suffix: +5 points
   - Turkish characters (ç,ğ,ı,ş,ö,ü): +3 points
   - Common prefixes (er-,öz-,ay-,al-,de-): +1 point
   - Threshold: score >= 7 = candidate

3. workflows/scan.js
   - Accept URL as CLI argument
   - Run detector on page
   - Save high-confidence unknowns to candidates/pending.json
   - Log scan results

4. workflows/review.js
   - Load candidates/pending.json
   - Display interactive CLI: surname, score, evidence
   - Prompt: "Approve which? (e.g., 1,3,5): "
   - Move approved → candidates/approved.json
   - Move rejected → candidates/rejected.json

5. workflows/merge.js
   - Load candidates/approved.json
   - Merge into data/surnames.json (deduplicate)
   - Clear approved.json
   - Log merge to audit trail

INITIAL DATA:
Seed data/surnames.json with common Turkish surnames:
yilmaz, kilic, celik, ozturk, kaya, dogan, aydin, arslan, demir, sahin, 
polat, yildiz, yildirim, kurt, aslan, erdogan, akin, guler, ozdemir, 
kara, yavuz, ozkan, aksoy, sonmez, erdem, yildirim, turan, unal, korkmaz

Seed data/institutions.json with:
bogazici, metu, odtu, istanbul, ankara, hacettepe, bilkent, koc, sabanci, 
istanbul technical, middle east technical

NPM SCRIPTS:
{
  "scan": "node workflows/scan.js",
  "review": "node workflows/review.js", 
  "merge": "node workflows/merge.js",
  "test": "node tests/validate.js"
}

USAGE EXAMPLES:
npm run scan https://university.edu/faculty
npm run review
npm run merge

REQUIREMENTS:
- ES6 modules (import/export)
- No external dependencies initially (vanilla JS + Node built-ins)
- Clear console output with colors (if possible)
- Validate JSON files before writing
- Handle errors gracefully

README should include:
- Purpose: Detect Turkish researchers on foreign university sites
- Quick start guide
- Architecture overview
- Contribution guidelines for adding surnames

DEVELOPMENT PHASES:
Phase 1: Core detection + manual scan
Phase 2: Auto-candidate collection + review workflow
Phase 3: Stats tracking + accuracy validation

Start with Phase 1. Create the file structure, implement core detection logic, 
and a basic scan.js that accepts a URL and outputs matched names.