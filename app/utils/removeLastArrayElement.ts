export function removeLastArrayElement<T>(array: Array<T>): Array<T> {
  if (!array.length) return array

  return array.slice(0, array.length - 1)
}
