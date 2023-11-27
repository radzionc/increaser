export interface Month {
  year: number
  month: number
}

export const monthToString = ({ year, month }: Month) => `${year}-${month}`

export const stringToMonth = (string: string): Month => {
  const [year, month] = string.split('-').map(Number)

  return { year, month }
}
