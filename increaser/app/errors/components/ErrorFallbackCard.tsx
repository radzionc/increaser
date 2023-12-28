import { SupportContacts } from '@increaser/app/communication/components/SupportContacts'
import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@increaser/app/ui/EmojiTextPrefix'
import { ModalTitleText } from '@lib/ui/modal/ModalTitleText'

export const ErrorFallbackCard = () => {
  return (
    <Panel width={320}>
      <VStack gap={40} fullWidth alignItems="center">
        <ModalTitleText>Something went wrong</ModalTitleText>
        <VStack alignItems="center" gap={12} fullWidth>
          <Text height="small" size={120}>
            🤷‍♂️
          </Text>
          <Button onClick={() => location.reload()}>Reload the page</Button>
        </VStack>
        <VStack alignItems="center" gap={12} fullWidth>
          <Text color="supporting">
            <EmojiTextPrefix emoji="🚨" /> Message us if reload didn't help
          </Text>
          <SupportContacts />
        </VStack>
      </VStack>
    </Panel>
  )
}
