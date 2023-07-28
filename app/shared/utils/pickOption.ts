import { getRandomElement } from './getRandomElement'

export function pickOption<T>(allOptions: T[], usedOptions: T[]) {
  const freeOptions = allOptions.filter(
    (option) => !usedOptions.includes(option),
  )

  return getRandomElement(
    freeOptions.length > 0 ? freeOptions : usedOptions,
  ) as T
}
