export const primaryAppNavigationPages = [
  'plan',
  'focus',
  'timeTracking',
  'workBudget',
  'timePlanning',
  'habits',
  'tasks',
  'schedule',
  'vision',
  'goals',
  'projects',
] as const

export const secondaryAppNavigationPages = [
  'community',
  'membership',
  'account',
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
  'onboarding',
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
  account: 'account',
  plan: 'plan',
  oauth: 'oauth',
  signIn: 'sign-in',
  signUp: 'sign-up',
  emailConfirm: 'email-confirm',
  onboarding: 'onboarding',
}

export const appPageViews = {
  timeTracking: ['report', 'track'],
  vision: ['my', 'ideas'],
  goals: ['active', 'done'],
} as const

export type AppPageVisionView = (typeof appPageViews)['vision'][number]

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
