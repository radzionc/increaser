import { trackEvent } from 'analytics'
import copyToClipboard from 'copy-to-clipboard'
import { useProjects } from 'projects/hooks/useProjects'
import { useEffect, useMemo } from 'react'
import { ExternalLink } from 'router/Link/ExternalLink'
import {
  AUTHOR_EMAIL,
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from 'shared/externalResources'
import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentState } from 'state/persistentStorage'
import styled from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Center } from '@increaser/ui/ui/Center'
import { CopyIcon } from '@increaser/ui/ui/icons/CopyIcon'
import { EnvelopIcon } from '@increaser/ui/ui/icons/EnvelopIcon'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { Modal } from '@increaser/ui/ui/Modal'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { useSnackbar } from 'ui/Snackbar/useSnackbar'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'

const CopyEmail = styled(UnstyledButton)`
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  padding: 4px;

  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

export const SupportOnboarding = () => {
  const [supportOnboardingWasAt, setSupportOnboardingWasAt] =
    usePersistentState<number | null>(
      PersistentStorageKey.SupportOnboardingWasAt,
      null,
    )

  const onClose = () => {
    setSupportOnboardingWasAt(Date.now())
  }

  const { sets } = useAssertUserState()
  const { projects } = useProjects()

  const isFirstSession = useMemo(() => {
    if (projects.some((p) => p.weeks.length > 0)) return false
    return sets.length === 1
  }, [projects, sets.length])

  const shouldShow = !supportOnboardingWasAt && isFirstSession

  useEffect(() => {
    if (shouldShow) {
      trackEvent('Open support onboarding')
    }
  }, [shouldShow])

  const { showSnackbar } = useSnackbar()

  if (!shouldShow) return null

  return (
    <Modal
      title={
        <Text>
          <EmojiTextPrefix emoji="✅" />
          First Session
        </Text>
      }
      onClose={onClose}
      placement="top"
      width={400}
      footer={
        <VStack fullWidth gap={4}>
          <SameWidthChildrenRow gap={4}>
            <ExternalLink style={{ width: '100%' }} to={AUTHOR_TWITTER}>
              <Button kind="ghostSecondary" style={{ width: '100%' }}>
                Twitter
              </Button>
            </ExternalLink>
            <ExternalLink style={{ width: '100%' }} to={AUTHOR_LINKEDIN}>
              <Button kind="ghostSecondary" style={{ width: '100%' }}>
                LinkedIn
              </Button>
            </ExternalLink>
            <ExternalLink style={{ width: '100%' }} to={AUTHOR_TELEGRAM}>
              <Button kind="ghostSecondary" style={{ width: '100%' }}>
                Telegram
              </Button>
            </ExternalLink>
          </SameWidthChildrenRow>
          <VStack fullWidth gap={4}>
            <ExternalLink to={`mailto:${AUTHOR_EMAIL}`}>
              <Button kind="reversed" as="div">
                <HStack alignItems="center" gap={8}>
                  <Text size={18} as="span" style={{ display: 'flex' }}>
                    <EnvelopIcon />
                  </Text>
                  <Text>Say "Hi" to me</Text>
                </HStack>
              </Button>
            </ExternalLink>
            <Center>
              <CopyEmail
                onClick={() => {
                  showSnackbar({ text: 'Email copied to clipboard' })
                  copyToClipboard(AUTHOR_EMAIL)
                }}
              >
                <HStack alignItems="center" gap={4}>
                  <Text size={14}>{AUTHOR_EMAIL}</Text>
                  <Text style={{ display: 'flex' }} size={14}>
                    <CopyIcon />
                  </Text>
                </HStack>
              </CopyEmail>
            </Center>
          </VStack>
        </VStack>
      }
      renderContent={() => (
        <VStack fullWidth gap={16}>
          <Text color="supporting">
            <EmojiTextPrefix emoji="👋" />
            Hey! Radzion is here. Congrats on your first Increaser session!
          </Text>
          <Text height="large" color="supporting">
            <EmojiTextPrefix emoji="✨" />
            App's purpose is to help you{' '}
            <Text as="span" color="regular">
              achieve your perfect lifestyle
            </Text>
            . Some folks want more free time, while others want to work harder
            on their business or career. Increaser will give you a toolkit to
            track and manage the time so you can use it wisely and achieve your
            goals faster.
          </Text>
          <Text height="large">
            <EmojiTextPrefix emoji="❤️" />
            I'm excited to see you grow with Increaser and would love to hear
            your feedback or answer questions!
          </Text>
        </VStack>
      )}
    />
  )
}
