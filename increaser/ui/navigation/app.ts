export const primaryAppNavigationPages = [
  'focus',
  'tasks',
  'projects',
  'goals',
  'habits',
  'ideas',
  'principles',
  'vision',
  'preferences',
] as const

export const secondaryAppNavigationPages = ['community', 'roadmap'] as const

const appNavigationPages = [
  ...primaryAppNavigationPages,
  ...secondaryAppNavigationPages,
] as const
export type AppNavigationPage = (typeof appNavigationPages)[number]

const appPages = [
  ...appNavigationPages,
  'oauth',
  'signIn',
  'signUp',
  'emailConfirm',
  'updates',
  'profile',
  'membership',
] as const

export type AppPage = (typeof appPages)[number]

export const appPagePath: Record<AppPage, string> = {
  focus: '',
  habits: 'habits',
  tasks: 'tasks',
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
  profile: 'profile',
  preferences: 'preferences',
}

export const appPageViews = {
  vision: ['my', 'ideas'],
  habits: ['my', 'ideas'],
  principles: ['my', 'ideas'],
  tasks: ['tasks', 'automation', 'templates'],
  preferences: ['schedule', 'work-budget'],
  projects: ['projects', 'plan', 'report'],
} as const

export type AppPageVisionView = (typeof appPageViews)['vision'][number]
export type AppPageHabitsView = (typeof appPageViews)['habits'][number]
export type AppPagePrinciplesView = (typeof appPageViews)['principles'][number]
export type AppPageTasksView = (typeof appPageViews)['tasks'][number]
export type AppPagePreferencesView =
  (typeof appPageViews)['preferences'][number]
export type AppPageProjectsView = (typeof appPageViews)['projects'][number]

export type AppPageViews = typeof appPageViews
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

export const appPageViewName: {
  [K in AppPageWithView]: Record<AppPageViews[K][number], string>
} = {
  vision: {
    my: 'Vision',
    ideas: 'Explore',
  },
  habits: {
    my: 'Habits',
    ideas: 'Explore',
  },
  principles: {
    my: 'Principles',
    ideas: 'Explore',
  },
  tasks: {
    tasks: 'Tasks',
    automation: 'Automation',
    templates: 'Templates',
  },
  preferences: {
    schedule: 'Schedule',
    'work-budget': 'Work Budget',
  },
  projects: {
    projects: 'Projects',
    plan: 'Plan',
    report: 'Report',
  },
}
