export enum Path {
  OAuth = '/oauth',
  EmailAuth = '/email-auth',
  Home = '/',
  TimeAllocation = '/budget',
  Projects = '/projects',
  Sessions = '/sessions',
  Sleep = '/sleep',
  Focus = '/focus',
  AppSumo = '/appsumo',
  Account = '/account',
  Habits = '/habits',
  Capacity = '/capacity',
  Work = '/work',
  CreateProject = '/projects/create',
  Community = '/community',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  EmailConfirm = '/email-confirm',
}

export const getProjectPath = (projectId: string) => `/projects/${projectId}`
