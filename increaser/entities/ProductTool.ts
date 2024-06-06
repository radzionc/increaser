export const productTools = [
  'focus',
  'trackTime',
  'tasks',
  'workBudget',
  'timePlanner',
  'habits',
  'schedule',
  'vision',
] as const
export type ProductTool = (typeof productTools)[number]

export const productToolPurposeRecord: Record<ProductTool, string> = {
  trackTime: 'Track time',
  tasks: 'Manage tasks',
  workBudget: 'Have a work budget',
  timePlanner: 'Plan time',
  focus: 'Rich deep focus',
  habits: 'Track daily habits',
  schedule: 'Set a schedule',
  vision: 'Have a vision',
}

export const productToolNameRecord: Record<ProductTool, string> = {
  trackTime: 'Time tracking',
  tasks: 'Task management',
  workBudget: 'Work budgeting',
  timePlanner: 'Time planning',
  focus: 'Deep work timer',
  habits: 'Habit tracking',
  schedule: 'Scheduling',
  vision: 'Vision board',
}

export const productToolColorRecord: Record<ProductTool, number> = {
  trackTime: 4,
  tasks: 2,
  workBudget: 6,
  timePlanner: 7,
  habits: 3,
  focus: 5,
  schedule: 10,
  vision: 3,
}
