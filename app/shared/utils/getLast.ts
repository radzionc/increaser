export function getLast<T>(array: readonly T[]): T {
  return array[array.length - 1]
}
