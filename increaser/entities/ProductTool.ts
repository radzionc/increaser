import { productName } from '@increaser/config'

export const productTools = [
  'vision',
  'goals',
  'habits',
  'focus',
  'tasks',
  'trackTime',
] as const
export type ProductTool = (typeof productTools)[number]

export const productToolPurposeRecord: Record<ProductTool, string> = {
  trackTime: 'Track time',
  tasks: 'Manage tasks',
  focus: 'Rich deep focus',
  habits: 'Track daily habits',
  vision: 'Have a vision',
  goals: 'Set and achieve goals',
}

export const productToolNameRecord: Record<ProductTool, string> = {
  trackTime: 'Time tracking',
  tasks: 'Task management',
  focus: 'Deep work timer',
  habits: 'Habit tracking',
  vision: 'Vision board',
  goals: 'Goals',
}

export const productToolKeyWordRecord: Record<ProductTool, string> = {
  trackTime: 'track',
  tasks: 'tasks',
  focus: 'focus',
  habits: 'habits',
  vision: 'vision',
  goals: 'goals',
}

export const productToolShortNameRecord: Record<ProductTool, string> = {
  trackTime: 'Tracking',
  tasks: 'Tasks',
  focus: 'Focus',
  habits: 'Habits',
  vision: 'Vision',
  goals: 'Goals',
}

export const productToolDescription: Record<ProductTool, string> = {
  focus: 'Stay in the zone, get more done',
  habits: 'Build habits that last',
  tasks: 'Conquer tasks, stay on top',
  trackTime: 'Turn time into progress',
  vision: 'Craft the life you want',
  goals: 'Reach your goals faster',
}

export const productToolTitle: Record<ProductTool, string> = {
  focus: 'Achieve More with Sharper Focus',
  habits: 'Build Success with Daily Habits',
  tasks: 'Master Your Tasks and Deadlines',
  trackTime: 'Transform Time into Achievements',
  vision: 'Create Your Ideal Future',
  goals: 'Realize Your Ambitions with Clear Goals',
}

export const productToolSubtitle: Record<ProductTool, string> = {
  focus: `${productName} helps you stay deeply focused to boost your productivity`,
  habits: `Develop life-changing habits effortlessly with ${productName}'s intuitive tracking`,
  tasks: `Keep track of your tasks and meet your deadlines with ${productName}`,
  trackTime: `Utilize ${productName} to turn every minute into meaningful progress`,
  vision: `Visualize and pursue your perfect life with ${productName}'s Vision Board`,
  goals: `Set, track, and accomplish your goals with ${productName} to achieve your dreams`,
}
