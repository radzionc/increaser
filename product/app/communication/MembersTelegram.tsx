import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { HStack } from '@lib/ui/css/stack'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { MEMBERS_TELEGRAM_GROUP } from '@product/app/shared/externalResources'

export const MembersTelegram = () => {
  return (
    <ExternalLink to={MEMBERS_TELEGRAM_GROUP}>
      <HStack alignItems="center" gap={8}>
        <TelegramIcon />
        <ShyTextButton as="span">Members Telegram Group</ShyTextButton>
      </HStack>
    </ExternalLink>
  )
}
