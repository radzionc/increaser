import { removeLastArrayElement } from './removeLastArrayElement'

export function updateLastArrayElement<T>(
  array: Array<T>,
  element: T,
): Array<T> {
  if (!array.length) return array

  return [...removeLastArrayElement(array), element]
}
