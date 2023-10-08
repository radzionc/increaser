import { AuthProviders } from './AuthFlow/AuthProviders'
import { AuthView } from '@increaser/ui/auth/AuthView'

export const SignInContent = () => {
  return (
    <AuthView title="Welcome back!">
      <AuthProviders />
    </AuthView>
  )
}
