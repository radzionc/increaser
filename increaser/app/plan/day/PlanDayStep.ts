export const planDaySteps = ['vision', 'goals', 'habits', 'tasks'] as const
export type PlanDayStep = (typeof planDaySteps)[number]

export const planDayStepTarget: Record<PlanDayStep, string> = {
  vision: 'Visualize your ideal future',
  habits: 'Review your habits',
  goals: 'Revisit your goals',
  tasks: 'Clear overdue tasks and plan today’s priorities',
}

export const planDayStepName: Record<PlanDayStep, string> = {
  vision: 'Vision',
  habits: 'Habits',
  goals: 'Goals',
  tasks: 'Tasks',
}
