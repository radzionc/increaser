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
  Capacity = '/capacity',
  CreateProject = '/projects/create',
  Community = '/community',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  EmailConfirm = '/email-confirm',
  Onboarding = '/onboarding',
}

export const getProjectPath = (projectId: string) => `/projects/${projectId}`
