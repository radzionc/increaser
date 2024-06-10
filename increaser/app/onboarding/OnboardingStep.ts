export const onboardingSteps = [
  'vision',
  'goals',
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
  vision: 'Describe your vision',
  goals: 'Set your goals',
  projects: 'Add projects',
  workBudget: 'Define work budget',
  projectsBudget: 'Set projects budget',
  schedule: 'Arrange schedule',
  dailyHabits: 'Establish daily habits',
  tasks: 'List tasks',
  focus: 'Start focus session',
}
