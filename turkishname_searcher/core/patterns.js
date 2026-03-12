// patterns.js — Turkish phonological patterns for name detection

export const suffixes = [
  "oğlu",
  "oglu",
  "gil",
  "ler",
  "lar",
];

export const prefixes = [
  "er",
  "öz",
  "oz",
  "ay",
  "al",
  "de",
  "ak",
  "kara",
  "yıl",
  "yil",
];

export const turkishChars = ["ç", "ğ", "ı", "ş", "ö", "ü", "Ç", "Ğ", "İ", "Ş", "Ö", "Ü"];

// Common Turkish vowel harmony sequences (front/back vowel pairs)
export const vowelPatterns = {
  front: ["e", "i", "ö", "ü"],
  back:  ["a", "ı", "o", "u"],
};
