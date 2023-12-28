import { ExternalLink } from '@increaser/app/router/Link/ExternalLink'
import {
  AUTHOR_EMAIL,
  AUTHOR_LINKEDIN,
  AUTHOR_TELEGRAM,
  AUTHOR_TWITTER,
} from '@increaser/app/shared/externalResources'
import { IconButton, IconButtonProps } from '@lib/ui/buttons/IconButton'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { TwitterIcon } from '@lib/ui/icons/TwitterIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CopyText } from '@lib/ui/text/CopyText'

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
