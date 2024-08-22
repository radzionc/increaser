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

export const appPages = [
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

export const appPageName: Record<AppPage, string> = {
  focus: 'Focus',
  habits: 'Habits',
  tasks: 'Tasks',
  vision: 'Vision',
  goals: 'Goals',
  projects: 'Projects',
  community: 'Community',
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
}

export const appPageViews = {
  vision: ['manage', 'board', 'ideas'],
  habits: ['my', 'ideas'],
  principles: ['my', 'categories', 'ideas'],
  tasks: ['tasks', 'upcoming', 'automation', 'templates'],
  preferences: ['schedule', 'work-budget'],
  projects: ['projects', 'plan', 'report'],
  goals: ['goals', 'wisdom'],
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
    manage: 'Manage',
    board: 'Board',
    ideas: 'Explore',
  },
  habits: {
    my: 'Habits',
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
  preferences: {
    schedule: 'Schedule',
    'work-budget': 'Work Budget',
  },
  projects: {
    projects: 'Projects',
    plan: 'Plan',
    report: 'Report',
  },
  goals: {
    goals: 'Goals',
    wisdom: 'Wisdom',
  },
}
