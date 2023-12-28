import { AuthProviders } from './AuthFlow/AuthProviders'
import { VStack } from '@lib/ui/layout/Stack'
import { SignUpAgreement } from './AuthFlow/SignUpAgreement'
import { AuthView } from '@lib/ui/auth/AuthView'
import { productName } from '@increaser/entities'

export const SignUpContent = () => {
  return (
    <AuthView title={`Join ${productName}`}>
      <VStack fullWidth gap={24}>
        <AuthProviders />
        <SignUpAgreement />
      </VStack>
    </AuthView>
  )
}
