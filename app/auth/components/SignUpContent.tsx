import { AuthProviders } from './AuthFlow/AuthProviders'
import { VStack } from '@increaser/ui/ui/Stack'
import { SignUpAgreement } from './AuthFlow/SignUpAgreement'
import { AuthView } from './AuthView'

export const SignUpContent = () => {
  return (
    <AuthView title="Join Increaser">
      <VStack fullWidth gap={24}>
        <AuthProviders />
        <SignUpAgreement />
      </VStack>
    </AuthView>
  )
}
