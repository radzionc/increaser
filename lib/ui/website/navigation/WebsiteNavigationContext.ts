import { getValueProviderSetup } from '../../state/getValueProviderSetup'

type WebsiteNavigationState = {
  footerHeight: number
}

export const {
  useValue: useWebsiteNavigation,
  provider: WebsiteNavigationProvider,
} = getValueProviderSetup<WebsiteNavigationState>('WebsiteNavigation')
