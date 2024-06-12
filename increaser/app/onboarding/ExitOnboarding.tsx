import { Button } from '@lib/ui/buttons/Button'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { LogOutIcon } from '@lib/ui/icons/LogOutIcon'
import { Opener } from '@lib/ui/base/Opener'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import styled from 'styled-components'
import { productName } from '@increaser/config'
import { useRouter } from 'next/router'
import { getAppPath } from '@increaser/ui/navigation/app'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

const Content = styled(VStack)`
  gap: 8px;
  line-height: 1.5;
`

export const ExitOnboarding = () => {
  const { mutate: updateUser } = useUpdateUserMutation()
  const { push } = useRouter()

  const analytics = useAnalytics()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button onClick={onOpen} size="l" kind="outlined">
          <HStack alignItems="center" gap={8}>
            <IconWrapper style={{ transform: 'rotateZ(180deg)' }}>
              <LogOutIcon />
            </IconWrapper>
            <Text>Exit</Text>
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <ConfirmationModal
          title="Exit Onboarding?"
          onClose={onClose}
          confirmActionText="Exit"
          width={480}
          onConfirm={() => {
            analytics.trackEvent('Exited onboarding')
            updateUser({ finishedOnboardingAt: Date.now() })
            push(getAppPath('focus'))
          }}
        >
          <Content>
            <Text>
              You’re about to exit the onboarding process. Completing it will
              help you set up your account for the best experience with{' '}
              {productName}, making you more organized and productive from the
              start.
            </Text>
            <Text>
              Are you sure you want to exit? You can always finish later, but we
              recommend completing it now for a seamless experience.
            </Text>
          </Content>
        </ConfirmationModal>
      )}
    />
  )
}
