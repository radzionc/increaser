import { AuthDestination } from 'auth/AuthDestination'
import { getValueProviderSetup } from 'shared/utils/getValueProviderSetup'

export const {
  useValue: useAuthDestination,
  provider: AuthDestinationProvider,
} = getValueProviderSetup<AuthDestination>('AuthDestination')
