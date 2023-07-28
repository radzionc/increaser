import { ExternalLink } from 'router/Link/ExternalLink'
import { MEMBERS_TELEGRAM_GROUP } from 'shared/externalResources'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { TelegramIcon } from '@increaser/ui/ui/icons/TelegramIcon'
import { HStack } from '@increaser/ui/ui/Stack'

export const MembersTelegram = () => {
  return (
    <ExternalLink to={MEMBERS_TELEGRAM_GROUP}>
      <HStack alignItems="center" gap={8}>
        <TelegramIcon />
        <ShyTextButton as="span" text="Group for members" />
      </HStack>
    </ExternalLink>
  )
}
