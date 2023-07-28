import { TextButton } from '@increaser/ui/ui/buttons/TextButton'
import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { useAuthFlow } from './AuthFlowContext'
import { AuthProviders } from './AuthProviders'

export const SignInOverlay = () => {
  const { authFlowPurpose, setAuthFlowPurpose } = useAuthFlow()

  if (!authFlowPurpose) return null

  return (
    <Modal
      width={360}
      title={'Welcome back!'}
      hasImplicitClose={false}
      onClose={() => setAuthFlowPurpose(null)}
      renderContent={() => (
        <VStack gap={24}>
          <AuthProviders />
          <Text size={14}>
            No account?{' '}
            <TextButton
              onClick={() => setAuthFlowPurpose('signUp')}
              as="span"
              text="Create one"
            />
          </Text>
        </VStack>
      )}
    />
  )
}
