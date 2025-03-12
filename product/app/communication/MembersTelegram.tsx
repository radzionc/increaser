import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { HStack } from '@lib/ui/css/stack'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { useIsPayingUser } from '@product/app/membership/hooks/useIsPayingUser'
import { MEMBERS_TELEGRAM_GROUP } from '@product/app/shared/externalResources'

export const MembersTelegram = () => {
  const isPayingUser = useIsPayingUser()
  if (!isPayingUser) return null

  return (
    <ExternalLink to={MEMBERS_TELEGRAM_GROUP}>
      <HStack alignItems="center" gap={8}>
        <TelegramIcon />
        <ShyTextButton as="span">Members Telegram Group</ShyTextButton>
      </HStack>
    </ExternalLink>
  )
}
