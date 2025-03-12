import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { AuthView } from '@lib/ui/auth/AuthView'
import { productName } from '@product/config'

import { AuthProviders } from './AuthFlow/AuthProviders'

export const SignInContent = () => {
  return (
    <AuthView title="Welcome back!">
      <PageMetaTags title={['Sign in', productName].join(' | ')} />
      <AuthProviders />
    </AuthView>
  )
}
