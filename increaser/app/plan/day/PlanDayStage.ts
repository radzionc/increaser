export const planDayStages = ['habits', 'goals', 'tasks'] as const
export type PlanDayStage = (typeof planDayStages)[number]

export const planDayStageTarget: Record<PlanDayStage, string> = {
  habits: 'Review yesterday habits',
  goals: 'Review goals',
  tasks: `Clear overdue tasks and organize today's to-dos`,
}
