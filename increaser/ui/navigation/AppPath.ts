export const timeTrackingBasePath = 'time-tracking'
export const timeTrackingViews = ['report', 'track'] as const
export type TimeTrackingView = (typeof timeTrackingViews)[number]
export const getTimeTrackingPath = (view: TimeTrackingView) =>
  `/${timeTrackingBasePath}/${view}`

export const getEditSetPath = (hash: string) => {
  return `${getTimeTrackingPath('track')}?edit=${hash}`
}

export const visionBasePath = 'vision'
export const visionViews = ['my', 'ideas'] as const
export type VisionView = (typeof visionViews)[number]
export const getVisionPath = (view: VisionView) => `/${visionBasePath}/${view}`

export const goalsBasePath = 'goals'
export const goalsViews = ['active', 'done'] as const
export type GoalsView = (typeof goalsViews)[number]
export const getGoalsPath = (view: GoalsView) =>
  `/${goalsBasePath}/${view}` as const

export enum AppPath {
  OAuth = '/oauth',
  Tasks = '/tasks',
  EmailAuth = '/email-auth',
  Home = '/',
  Projects = '/projects',
  Sessions = '/sessions',
  Focus = '/focus',
  AppSumo = '/appsumo',
  Account = '/account',
  Habits = '/habits',
  Community = '/community',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  EmailConfirm = '/email-confirm',
  Onboarding = '/onboarding',
  TimeTracking = `/${timeTrackingBasePath}/report`,
  TrackTime = `/${timeTrackingBasePath}/track`,
  WorkBudget = '/work-budget',
  ProjectsBudget = '/projects-budget',
  Plan = '/plan',
  MyVision = `/${visionBasePath}/my`,
  VisionIdeas = `/${visionBasePath}/ideas`,
  Goals = `/${goalsBasePath}/active`,
  Membership = '/membership',
}
