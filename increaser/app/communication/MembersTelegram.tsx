import { MEMBERS_TELEGRAM_GROUP } from '@increaser/app/shared/externalResources'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { HStack } from '@lib/ui/css/stack'
import { useIsPayingUser } from '@increaser/app/membership/hooks/useIsPayingUser'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

export const MembersTelegram = () => {
  const isPayingUser = useIsPayingUser()
  if (!isPayingUser) return null

  return (
    <ExternalLink to={MEMBERS_TELEGRAM_GROUP}>
      <HStack alignItems="center" gap={8}>
        <TelegramIcon />
        <ShyTextButton as="span" text="Members Telegram Group" />
      </HStack>
    </ExternalLink>
  )
}
