import { ExternalLink } from 'router/Link/ExternalLink'
import { MEMBERS_TELEGRAM_GROUP } from 'shared/externalResources'
import { ShyTextButton } from '@increaser/ui/buttons/ShyTextButton'
import { TelegramIcon } from '@increaser/ui/icons/TelegramIcon'
import { HStack } from '@increaser/ui/layout/Stack'
import { useIsPayingUser } from 'membership/hooks/useIsPayingUser'

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
