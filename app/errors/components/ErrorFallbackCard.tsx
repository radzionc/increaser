import { SupportContacts } from 'communication/components/SupportContacts'
import { Button } from '@increaser/ui/buttons/Button'
import { Panel } from '@increaser/ui/panel/Panel'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'
import { ModalTitleText } from '@increaser/ui/modal/ModalTitleText'

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
