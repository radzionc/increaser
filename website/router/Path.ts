export enum Path {
  Landing = '/',
  TermsOfService = '/terms-of-service',
  PrivacyPolicy = '/privacy-policy',
}

export const getProjectPath = (projectId: string) => `/projects/${projectId}`
