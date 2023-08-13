import { AuthProviders } from './AuthFlow/AuthProviders'
import { AuthDestination } from 'auth/AuthDestination'
import { AuthDestinationProvider } from './AuthDestinationProvider'
import { AuthView } from './AuthView'

export const SignInContent = () => {
  return (
    <AuthDestinationProvider value={AuthDestination.App}>
      <AuthView title="Welcome back!">
        <AuthProviders />
      </AuthView>
    </AuthDestinationProvider>
  )
}
