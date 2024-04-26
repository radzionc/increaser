export type WorkBudget = {
  workdayHours: number
  weekendHours: number
}

export const defaultWorkBudget: WorkBudget = {
  workdayHours: 5,
  weekendHours: 4,
}
