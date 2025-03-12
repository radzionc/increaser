import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { AuthView } from '@lib/ui/auth/AuthView'
import { VStack } from '@lib/ui/css/stack'
import { productName } from '@product/config'

import { AuthProviders } from './AuthFlow/AuthProviders'
import { SignUpAgreement } from './AuthFlow/SignUpAgreement'

export const SignUpContent = () => {
  return (
    <AuthView title={`Join ${productName}`}>
      <PageMetaTags title={['Sign up', productName].join(' | ')} />
      <VStack fullWidth gap={24}>
        <AuthProviders />
        <SignUpAgreement />
      </VStack>
    </AuthView>
  )
}
