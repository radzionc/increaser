import { AuthProviders } from './AuthFlow/AuthProviders'
import { AuthDestination } from 'auth/AuthDestination'
import { AuthDestinationProvider } from './AuthDestinationProvider'
import { VStack } from '@increaser/ui/ui/Stack'
import { SignUpAgreement } from './AuthFlow/SignUpAgreement'
import { AuthView } from './AuthView'

export const SignUpContent = () => {
  return (
    <AuthDestinationProvider value={AuthDestination.App}>
      <AuthView title="Join Increaser">
        <VStack alignItems="center" fullWidth gap={24}>
          <AuthProviders />
          <SignUpAgreement />
        </VStack>
      </AuthView>
    </AuthDestinationProvider>
  )
}
