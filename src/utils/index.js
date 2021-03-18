export function posToString(row, col) {
  return String.fromCharCode("a".charCodeAt(0) + col) + String(row + 1);
}
