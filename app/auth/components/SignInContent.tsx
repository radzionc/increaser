import { AuthProviders } from './AuthFlow/AuthProviders'
import { AuthView } from './AuthView'

export const SignInContent = () => {
  return (
    <AuthView title="Welcome back!">
      <AuthProviders />
    </AuthView>
  )
}
