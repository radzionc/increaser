import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { AuthProviders } from './AuthFlow/AuthProviders'
import { AuthView } from '@lib/ui/auth/AuthView'
import { productName } from '@increaser/config'

export const SignInContent = () => {
  return (
    <AuthView title="Welcome back!">
      <PageMetaTags title={['Sign in', productName].join(' | ')} />
      <AuthProviders />
    </AuthView>
  )
}
