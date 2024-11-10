import { scoreboardPeriodInDays } from '@increaser/entities/PerformanceScoreboard'

export const primaryAppNavigationPages = [
  'focus',
  'tasks',
  'projects',
  'timesheet',
  'goals',
  'habits',
  'ideas',
  'principles',
  'vision',
] as const

export const secondaryAppNavigationPages = [
  'info',
  'community',
  'roadmap',
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
  'profile',
  'membership',
  'preferences',
] as const

export type AppPage = (typeof appPages)[number]

export const appPageName: Record<AppPage, string> = {
  focus: 'Focus',
  habits: 'Habits',
  tasks: 'Tasks',
  vision: 'Vision',
  goals: 'Goals',
  projects: 'Projects',
  community: `Last ${scoreboardPeriodInDays.week} days top performers`,
  membership: 'Membership',
  oauth: 'OAuth',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  emailConfirm: 'Email Confirm',
  ideas: 'Ideas',
  roadmap: 'Roadmap',
  principles: 'Principles',
  updates: `What's New`,
  profile: 'Public Profile',
  preferences: 'Preferences',
  info: 'Info',
  timesheet: 'Timesheet',
}

export const appPageEmoji: Record<AppPage, string> = {
  focus: '🔍',
  habits: '🧘',
  tasks: '📝',
  vision: '🔮',
  goals: '🎯',
  projects: '🚀',
  community: '👥',
  membership: '🎓',
  oauth: '🔒',
  signIn: '🔑',
  signUp: '🔑',
  emailConfirm: '📧',
  ideas: '💡',
  roadmap: '🗺️',
  principles: '📜',
  updates: '📰',
  profile: '👤',
  preferences: '⚙️',
  info: 'ℹ️',
  timesheet: '📊',
}

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
  info: 'info',
  timesheet: 'timesheet',
}

export const appPageViews = {
  vision: ['manage', 'board', 'ideas'],
  habits: ['track', 'ideas'],
  principles: ['my', 'categories', 'ideas'],
  tasks: ['tasks', 'upcoming', 'automation', 'templates'],
  roadmap: ['ideas', 'done'],
  info: ['focus', 'track', 'tasks', 'habits', 'goals'],
  timesheet: ['day', 'week', 'month', 'year'],
} as const

export type AppPageVisionView = (typeof appPageViews)['vision'][number]
export type AppPageHabitsView = (typeof appPageViews)['habits'][number]
export type AppPagePrinciplesView = (typeof appPageViews)['principles'][number]
export type AppPageTasksView = (typeof appPageViews)['tasks'][number]

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
    manage: 'Vision',
    board: 'Board',
    ideas: 'Explore',
  },
  habits: {
    track: 'Track',
    ideas: 'Explore',
  },
  principles: {
    my: 'Principles',
    categories: 'Categories',
    ideas: 'Explore',
  },
  tasks: {
    tasks: 'Tasks',
    upcoming: 'Upcoming',
    automation: 'Automation',
    templates: 'Templates',
  },
  roadmap: {
    ideas: 'Ideas',
    done: 'Done',
  },
  info: {
    focus: 'Focus',
    track: 'Track Time',
    tasks: 'Manage Tasks',
    habits: 'Build Habits',
    goals: 'Achieve Goals',
  },
  timesheet: {
    day: 'Days',
    week: 'Weeks',
    month: 'Months',
    year: 'Years',
  },
}
