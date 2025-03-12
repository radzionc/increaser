import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { ModalTitleText } from '@lib/ui/modal/ModalTitleText'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { SupportContacts } from '@product/app/communication/components/SupportContacts'

export const ErrorFallbackCard = () => {
  return (
    <Panel style={{ width: 320 }}>
      <VStack gap={40} fullWidth alignItems="center">
        <ModalTitleText>Something went wrong</ModalTitleText>
        <VStack alignItems="center" gap={12} fullWidth>
          <Text height="s" size={120}>
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
