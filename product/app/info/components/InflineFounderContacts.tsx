import { IconButton, IconButtonProps } from '@lib/ui/buttons/IconButton'
import { HStack } from '@lib/ui/css/stack'
import { LinkedinIcon } from '@lib/ui/icons/LinkedinIcon'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { XIcon } from '@lib/ui/icons/XIcon'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { Text } from '@lib/ui/text'
import { CopyText } from '@lib/ui/text/CopyText'
import {
  founderEmail,
  founderLinkedInUrl,
  founderTelegramUrl,
  founderXUrl,
} from '@product/config'

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
    <HStack
      gap={16}
      justifyContent="space-between"
      alignItems="center"
      wrap="wrap"
    >
      <CopyText content={founderEmail}>
        <Text color="contrast" as="span" size={size === 'm' ? 16 : 14}>
          {founderEmail}
        </Text>
      </CopyText>
      <HStack gap={16} alignItems="center">
        <ExternalLink to={founderXUrl}>
          <IconButton {...iconButtonSharedProps} title="X" icon={<XIcon />} />
        </ExternalLink>
        <ExternalLink to={founderLinkedInUrl}>
          <IconButton
            {...iconButtonSharedProps}
            title="LinkedIn"
            icon={<LinkedinIcon />}
          />
        </ExternalLink>
        <ExternalLink to={founderTelegramUrl}>
          <IconButton
            {...iconButtonSharedProps}
            title="Telegram"
            icon={<TelegramIcon />}
          />
        </ExternalLink>
      </HStack>
    </HStack>
  )
}
