import { AuthProviders } from './AuthFlow/AuthProviders'
import { VStack } from '@increaser/ui/layout/Stack'
import { SignUpAgreement } from './AuthFlow/SignUpAgreement'
import { AuthView } from '@increaser/ui/auth/AuthView'
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
