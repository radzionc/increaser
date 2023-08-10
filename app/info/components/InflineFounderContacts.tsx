import copyToClipboard from 'copy-to-clipboard'
import { ExternalLink } from 'router/Link/ExternalLink'
import {
  AUTHOR_EMAIL,
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from 'shared/externalResources'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import {
  IconButton,
  IconButtonProps,
} from '@increaser/ui/ui/buttons/IconButton'
import { CopyIcon } from '@increaser/ui/ui/icons/CopyIcon'
import { LinkedinIcon } from '@increaser/ui/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@increaser/ui/ui/icons/TelegramIcon'
import { TwitterIcon } from '@increaser/ui/ui/icons/TwitterIcon'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { interactiveCSS } from '@increaser/ui/ui/utils/interactiveCSS'
import { useSnackbar } from 'ui/Snackbar/useSnackbar'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'

const CopyEmail = styled(UnstyledButton)`
  ${interactiveCSS};
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  ${defaultTransitionCSS}

  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

type InlineFounderContactsSize = 'm' | 's'

interface InlineFounderContactsProps {
  size?: InlineFounderContactsSize
}

export const InlineFounderContacts = ({
  size = 'm',
}: InlineFounderContactsProps) => {
  const { showSnackbar } = useSnackbar()

  const iconButtonSharedProps: Partial<IconButtonProps> = {
    size: size,
    as: 'div',
  }

  return (
    <HStack gap={16} alignItems="center" wrap="wrap">
      <CopyEmail
        onClick={() => {
          showSnackbar({ text: 'Email copied to clipboard' })
          copyToClipboard(AUTHOR_EMAIL)
        }}
      >
        <HStack alignItems="center" gap={4}>
          <Text size={size === 'm' ? 16 : 14}>{AUTHOR_EMAIL}</Text>
          <Text style={{ display: 'flex' }} size={size === 'm' ? 14 : 12}>
            <CopyIcon />
          </Text>
        </HStack>
      </CopyEmail>
      <ExternalLink to={AUTHOR_TWITTER}>
        <IconButton
          {...iconButtonSharedProps}
          title="Twitter"
          icon={<TwitterIcon />}
        />
      </ExternalLink>
      <ExternalLink to={AUTHOR_LINKEDIN}>
        <IconButton
          {...iconButtonSharedProps}
          title="LinkedIn"
          icon={<LinkedinIcon />}
        />
      </ExternalLink>
      <ExternalLink to={AUTHOR_TELEGRAM}>
        <IconButton
          {...iconButtonSharedProps}
          title="Telegram"
          icon={<TelegramIcon />}
        />
      </ExternalLink>
    </HStack>
  )
}
