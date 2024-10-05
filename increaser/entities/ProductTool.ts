import { productName } from '@increaser/config'

export const productTools = [
  'vision',
  'goals',
  'focus',
  'trackTime',
  'tasks',
  'workBudget',
  'timePlanner',
  'habits',
  'schedule',
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
  goals: 'Set and achieve goals',
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
  goals: 'Goals',
}

export const productToolShortNameRecord: Record<ProductTool, string> = {
  trackTime: 'Tracking',
  tasks: 'Tasks',
  workBudget: 'Budgeting',
  timePlanner: 'Planning',
  focus: 'Focus',
  habits: 'Habits',
  schedule: 'Scheduling',
  vision: 'Vision',
  goals: 'Goals',
}

export const productToolDescription: Record<ProductTool, string> = {
  focus: 'Stay in the zone, get more done',
  habits: 'Build habits that last',
  timePlanner: 'Master your schedule with ease',
  schedule: 'Structure your day your way',
  tasks: 'Conquer tasks, stay on top',
  trackTime: 'Turn time into progress',
  vision: 'Craft the life you want',
  workBudget: 'Balance work, live better',
  goals: 'Reach your goals faster',
}

// export const productToolColorRecord: Record<ProductTool, number> = makeRecord(
//   productTools,
//   (tool, index) => index + 2,
// )

export const productToolTitle: Record<ProductTool, string> = {
  focus: 'Achieve More with Sharper Focus',
  habits: 'Build Success with Daily Habits',
  timePlanner: 'Maximize Efficiency with Balanced Time',
  schedule: 'Craft Your Perfect Daily Routine',
  tasks: 'Master Your Tasks and Deadlines',
  trackTime: 'Transform Time into Achievements',
  vision: 'Create Your Ideal Future',
  workBudget: 'Achieve Balance with Smart Work Budgets',
  goals: 'Realize Your Ambitions with Clear Goals',
}

export const productToolSubtitle: Record<ProductTool, string> = {
  focus: `${productName} helps you stay deeply focused to boost your productivity`,
  habits: `Develop life-changing habits effortlessly with ${productName}'s intuitive tracking`,
  timePlanner: `Balance your time effectively across all projects with ${productName}`,
  schedule: `Design a daily schedule that enhances your productivity and well-being`,
  tasks: `Keep track of your tasks and meet your deadlines with ${productName}`,
  trackTime: `Utilize ${productName} to turn every minute into meaningful progress`,
  vision: `Visualize and pursue your perfect life with ${productName}'s Vision Board`,
  workBudget: `Manage your work hours and achieve a healthy work-life balance with ${productName}`,
  goals: `Set, track, and accomplish your goals with ${productName} to achieve your dreams`,
}
