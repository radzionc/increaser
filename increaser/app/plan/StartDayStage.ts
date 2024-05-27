export const startDayStages = [
  'yesterdayHabits',
  'overdueTasks',
  'todayTasks',
] as const
export type StartDayStage = (typeof startDayStages)[number]

export const startDayNames: Record<StartDayStage, string> = {
  yesterdayHabits: 'Review yesterday habits',
  overdueTasks: 'Review overdue tasks',
  todayTasks: 'Plan today tasks',
}
