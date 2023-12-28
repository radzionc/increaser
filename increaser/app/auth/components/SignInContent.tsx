import { AuthProviders } from './AuthFlow/AuthProviders'
import { AuthView } from '@lib/ui/auth/AuthView'

export const SignInContent = () => {
  return (
    <AuthView title="Welcome back!">
      <AuthProviders />
    </AuthView>
  )
}
