export enum Path {
  OAuth = '/oauth',
  EmailAuth = '/email-auth',
  Home = '/home',
  TimeAllocation = '/budget',
  Projects = '/projects',
  Sessions = '/sessions',
  Sleep = '/sleep',
  Landing = '/',
  Focus = '/focus',
  TermsOfService = '/terms-of-service',
  AppSumo = '/appsumo',
  PrivacyPolicy = '/privacy-policy',
  Account = '/account',
  Habits = '/habits',
  Capacity = '/capacity',
  Work = '/work',
  CreateProject = '/projects/create',
}

export const getProjectPath = (projectId: string) => `/projects/${projectId}`
