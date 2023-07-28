import { AuthDestination } from 'auth/components/AuthFlow/AuthFlowContext'
import { AuthFlowProvider } from 'auth/components/AuthFlow/AuthFlowProvider'
import { AuthProviders } from 'auth/components/AuthFlow/AuthProviders'
import { SignUpAgreement } from 'auth/components/AuthFlow/SignUpAgreement'
import { VStack } from '@increaser/ui/ui/Stack'

export const AppSumoAuth = () => {
  return (
    <AuthFlowProvider
      destination={AuthDestination.AppSumo}
      authFlowPurpose="signUp"
    >
      <VStack fullWidth gap={20}>
        <AuthProviders />
        <SignUpAgreement />
      </VStack>
    </AuthFlowProvider>
  )
}
