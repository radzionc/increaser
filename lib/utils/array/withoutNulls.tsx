export function withoutNulls<T>(items: Array<T | null>): T[] {
  return items.filter((item) => item !== null) as T[]
}
