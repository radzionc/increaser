export const onboardingSteps = [
  'projects',
  'workBudget',
  'projectsBudget',
  'schedule',
  'dailyHabits',
  'tasks',
  'focus',
] as const
export type OnboardingStep = (typeof onboardingSteps)[number]

export const onboardingStepTargetName: Record<OnboardingStep, string> = {
  projects: 'Add projects',
  workBudget: 'Define work budget',
  projectsBudget: 'Set projects budget',
  schedule: 'Arrange schedule',
  dailyHabits: 'Establish daily habits',
  tasks: 'List tasks',
  focus: 'Start focus session',
}
