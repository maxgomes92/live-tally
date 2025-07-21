export const fontFamilyList = [
  "arial",
  "times new roman",
  "brush script mt",
  "copperplate",
  "helvética",
  "verdana",
  "georgia",
  "decorative",
  "impact",
  "teko",
  "russo one",
];

export const capitalizeEachWord = (word: string) => {
  return word
    .split(" ")
    .map((w) => String(w).charAt(0).toUpperCase() + String(w).slice(1))
    .join(" ");
};
