export function moveArrayElement<T>(array: T[], from: number, to: number): T[] {
  const newArray = [...array]

  const element = newArray[from]
  newArray.splice(from, 1)
  newArray.splice(to, 0, element)

  return newArray
}
