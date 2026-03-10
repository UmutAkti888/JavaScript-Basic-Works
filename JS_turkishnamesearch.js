// TURKISH NAME SEARCH - A SCRIPT TO EXTRACT TURKISH NAMES FROM A WEBPAGE - 10th of March 2026
// PART 1 - TARGETING SPEFICIC DOM ELEMENTS TO SEARCH FOR NAMES
// BAD; reading entire page into memory and then searching for the name
document.body.innerText

// GOOD; Target likely "locations"
const selector = [
    'h1', 'h2', 'h3',       // Headings - professor name
    '[class*="name"]',      // Name-related classes
    '[class*="faculty"]',   // Faculty listings
    '[class*="professor"]', // Professor sections
    '[class*="staff"]',     // Staff directories
    'table td',             // Table cells, often used in directories
    'ul li, ol li'          // List items, common in directories 
];

const text = selectors
    .map(s => [...document.querySelectorAll(s)]
       .map(el => el.textContent.trim())
       .join('\n'))
    .join('\n');   

// PART 2 - PRE-FILTER FOR TURKISH CHARACTERS
// Define a regex to match Turkish characters

const turkishPattern = /[ğĞıİöÖüÜşŞçÇ]/; // Those characters reeking with Turkishness
const relevantText = document.body.innerText //
    .split('\n') // splitting into lines
    .filter(line => turkishPattern.test(line)) // keeping lines with Turkish characters
    .join('\n'); // Joining back into a single string for further processing
    
    
// PART 3 - STRUCTURED EXTRACTION PATTERN
// Extract potential names using context

const namePatterns = [
  /(?:Prof\.|Dr\.|Doç\.|Yrd\.)\s+([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)+)/g,
  /([A-ZÇĞİÖŞÜ][a-zçğıöşü]+\s+[A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜa-zçğıöşü]+)/g
];

const candidates = [];
namePatterns.forEach(pattern => {
    const matches = document.body.textContent.matchAll(pattern);
    for (const match of matches) {
        candidates.push(match[1] || match[0]);
    }
});

return [...new Set(candidates)]; // Removing duplicates 
