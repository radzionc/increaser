export const onboardingSteps = [
  'projects',
  'workBudget',
  'weeklyGoals',
  'schedule',
  'dailyHabits',
  'tasks',
  'focus',
] as const
export type OnboardingStep = (typeof onboardingSteps)[number]

export const onboardingStepTargetName: Record<OnboardingStep, string> = {
  projects: 'Add projects',
  workBudget: 'Define work budget',
  weeklyGoals: 'Outline weekly goals',
  schedule: 'Arrange schedule',
  dailyHabits: 'Establish daily habits',
  tasks: 'List tasks',
  focus: 'Start focus session',
}
