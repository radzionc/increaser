export const planDaySteps = ['habits', 'goals', 'tasks'] as const
export type PlanDayStep = (typeof planDaySteps)[number]

export const planDayStepTarget: Record<PlanDayStep, string> = {
  habits: 'Review yesterday habits',
  goals: 'Review goals',
  tasks: `Clear overdue tasks and organize today's to-dos`,
}
