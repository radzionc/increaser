export const planDaySteps = ['habits', 'goals', 'tasks'] as const
export type PlanDayStep = (typeof planDaySteps)[number]

export const planDayStepTarget: Record<PlanDayStep, string> = {
  habits: 'Reflect on yesterday’s habits',
  goals: 'Revisit your goals',
  tasks: 'Clear overdue tasks and plan today’s priorities',
}

export const planDayStepName: Record<PlanDayStep, string> = {
  habits: 'Habits',
  goals: 'Goals',
  tasks: 'Tasks',
}
