import { productXUrl, productTelegramChannelUrl } from '@increaser/config'
import { SocialLink } from '@lib/ui/buttons/SocialLink'
import { TelegramIcon } from '@lib/ui/icons/TelegramIcon'
import { XIcon } from '@lib/ui/icons/XIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { EmojiTextPrefix } from '../../ui/EmojiTextPrefix'

export const SubscribeForUpdatesPrompt = () => {
  return (
    <Panel>
      <HStack justifyContent="space-between" alignItems="center" gap={16}>
        <SectionTitle>
          <EmojiTextPrefix emoji="🚀" />
          Don't miss new features
        </SectionTitle>
        <HStack gap={8} alignItems="center">
          <SocialLink to={productXUrl}>
            <XIcon />
          </SocialLink>
          <SocialLink to={productTelegramChannelUrl}>
            <TelegramIcon />
          </SocialLink>
        </HStack>
      </HStack>
    </Panel>
  )
}
