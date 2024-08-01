export const primaryAppNavigationPages = [
  'focus',
  'tasks',
  'goals',
  'timeTracking',
  'workBudget',
  'timePlanning',
  'habits',
  'schedule',
  'vision',
  'projects',
  'ideas',
  'principles',
] as const

export const secondaryAppNavigationPages = [
  'community',
  'roadmap',
  'membership',
] as const

const appNavigationPages = [
  ...primaryAppNavigationPages,
  ...secondaryAppNavigationPages,
] as const
export type AppNavigationPage = (typeof appNavigationPages)[number]

export const appPages = [
  ...appNavigationPages,
  'oauth',
  'signIn',
  'signUp',
  'emailConfirm',
  'updates',
] as const

export type AppPage = (typeof appPages)[number]

export const appPagePath: Record<AppPage, string> = {
  focus: '',
  timeTracking: 'time-tracking',
  workBudget: 'work-budget',
  timePlanning: 'time-planning',
  habits: 'habits',
  tasks: 'tasks',
  schedule: 'schedule',
  vision: 'vision',
  goals: 'goals',
  projects: 'projects',
  community: 'community',
  membership: 'membership',
  oauth: 'oauth',
  signIn: 'sign-in',
  signUp: 'sign-up',
  emailConfirm: 'email-confirm',
  ideas: 'ideas',
  roadmap: 'roadmap',
  principles: 'principles',
  updates: 'updates',
}

export const appPageViews = {
  timeTracking: ['report', 'track'],
  vision: ['my', 'ideas'],
  habits: ['my', 'ideas'],
  principles: ['my', 'ideas'],
} as const

export type AppPageVisionView = (typeof appPageViews)['vision'][number]
export type AppPageHabitsView = (typeof appPageViews)['habits'][number]
export type AppPagePrinciplesView = (typeof appPageViews)['principles'][number]

type AppPageViews = typeof appPageViews
export type AppPageWithView = keyof AppPageViews

export function getAppPath<P extends AppPageWithView>(
  page: P,
  subpage: AppPageViews[P][number],
): string
export function getAppPath(page: Exclude<AppPage, AppPageWithView>): string
export function getAppPath(page: AppPage, view?: string): string {
  const path = appPagePath[page]
  if (view) {
    return `/${path}/${view}`
  }
  return `/${path}`
}

export type AppPathViewOf<P extends AppPageWithView> = AppPageViews[P][number]

export const getPageDefaultPath = (page: AppPage): string =>
  page in appPageViews
    ? getAppPath(
        page as AppPageWithView,
        appPageViews[page as AppPageWithView][0],
      )
    : getAppPath(page as Exclude<AppPage, AppPageWithView>)
