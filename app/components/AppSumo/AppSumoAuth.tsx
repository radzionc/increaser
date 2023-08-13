import { AuthProviders } from 'auth/components/AuthFlow/AuthProviders'
import { SignUpAgreement } from 'auth/components/AuthFlow/SignUpAgreement'
import { VStack } from '@increaser/ui/ui/Stack'
import { AuthDestinationProvider } from 'auth/components/AuthDestinationProvider'
import { AuthDestination } from 'auth/AuthDestination'

export const AppSumoAuth = () => {
  return (
    <AuthDestinationProvider value={AuthDestination.AppSumo}>
      <VStack fullWidth gap={20}>
        <AuthProviders />
        <SignUpAgreement />
      </VStack>
    </AuthDestinationProvider>
  )
}
