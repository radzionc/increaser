export enum WebsitePath {
  Home = '/',
  TermsOfService = '/terms-of-service',
  PrivacyPolicy = '/privacy-policy',
}

export const getProjectPath = (projectId: string) => `/projects/${projectId}`
