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

/**
 * Checks if a value is a numeric string.
 * @param str The value to check.
 * @returns True if the value is a string that represents a number, otherwise false.
 */
export function isNumeric(str: unknown): boolean {
  if (typeof str !== "string") {
    return false;
  }

  return (
    !isNaN(str as never) && 
    !isNaN(parseFloat(str))
  );
}
