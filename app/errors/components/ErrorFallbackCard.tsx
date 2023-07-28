import { SupportContacts } from 'communication/components/SupportContacts'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { ModalTitleText } from '@increaser/ui/ui/Modal/ModalTitleText'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

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
