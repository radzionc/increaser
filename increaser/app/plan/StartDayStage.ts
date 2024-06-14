export const startDayStages = ['yesterdayHabits', 'todayTasks'] as const
export type StartDayStage = (typeof startDayStages)[number]

export const startDayNames: Record<StartDayStage, string> = {
  yesterdayHabits: 'Review yesterday habits',
  todayTasks: `Clear overdue tasks and organize today's to-dos`,
}
