import { ExternalLink } from 'router/Link/ExternalLink'
import {
  AUTHOR_EMAIL,
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from 'shared/externalResources'
import { IconButton, IconButtonProps } from '@increaser/ui/buttons/IconButton'
import { LinkedinIcon } from '@increaser/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@increaser/ui/icons/TelegramIcon'
import { TwitterIcon } from '@increaser/ui/icons/TwitterIcon'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { CopyText } from '@increaser/ui/text/CopyText'

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
        <Text color="regular" as="span" size={size === 'm' ? 16 : 14}>
          {AUTHOR_EMAIL}
        </Text>
      </CopyText>
      <ExternalLink to={AUTHOR_TWITTER}>
        <IconButton
          {...iconButtonSharedProps}
          kind="secondary"
          title="Twitter"
          icon={<TwitterIcon />}
        />
      </ExternalLink>
      <ExternalLink to={AUTHOR_LINKEDIN}>
        <IconButton
          {...iconButtonSharedProps}
          kind="secondary"
          title="LinkedIn"
          icon={<LinkedinIcon />}
        />
      </ExternalLink>
      <ExternalLink to={AUTHOR_TELEGRAM}>
        <IconButton
          kind="secondary"
          {...iconButtonSharedProps}
          title="Telegram"
          icon={<TelegramIcon />}
        />
      </ExternalLink>
    </HStack>
  )
}
