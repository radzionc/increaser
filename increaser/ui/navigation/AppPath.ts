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
  CreateProject = '/projects/create',
  Community = '/community',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  EmailConfirm = '/email-confirm',
  Onboarding = '/onboarding',
  TimeTracking = '/time-tracking',
  WorkBudget = '/work-budget',
  ProjectsBudget = '/projects-budget',
}

export const getProjectPath = (projectId: string) => `/projects/${projectId}`
