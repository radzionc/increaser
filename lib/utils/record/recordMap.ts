export const recordMap = <T>(
  record: Record<string, T>,
  fn: (value: T, index: number) => T,
) => {
  return Object.fromEntries(
    Object.entries(record).map(([key, value], index) => [
      key,
      fn(value, index),
    ]),
  )
}
