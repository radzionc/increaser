export const recordMap = <K extends string | number, T, V>(
  record: Record<K, T>,
  fn: (value: T, index: number) => V,
): Record<K, V> => {
  return Object.fromEntries(
    Object.entries(record).map(([key, value], index) => [
      key,
      fn(value as T, index),
    ]),
  ) as Record<K, V>
}
