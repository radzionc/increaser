export function withoutLast<T>(array: T[]): T[] {
  return array.slice(0, array.length - 1)
}
