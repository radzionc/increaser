import { ExternalLink } from 'router/Link/ExternalLink'
import {
  AUTHOR_EMAIL,
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from 'shared/externalResources'
import {
  IconButton,
  IconButtonProps,
} from '@increaser/ui/ui/buttons/IconButton'
import { LinkedinIcon } from '@increaser/ui/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@increaser/ui/ui/icons/TelegramIcon'
import { TwitterIcon } from '@increaser/ui/ui/icons/TwitterIcon'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { CopyText } from '@increaser/ui/ui/CopyText'

type InlineFounderContactsSize = 'm' | 's'

interface InlineFounderContactsProps {
  size?: InlineFounderContactsSize
}

export const InlineFounderContacts = ({
  size = 'm',
}: InlineFounderContactsProps) => {
  const iconButtonSharedProps: Partial<IconButtonProps> = {
    size: size,
    as: 'div',
  }

  return (
    <HStack gap={16} alignItems="center" wrap="wrap">
      <CopyText content={AUTHOR_EMAIL}>
        <Text as="span" size={size === 'm' ? 16 : 14}>
          {AUTHOR_EMAIL}
        </Text>
      </CopyText>
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
