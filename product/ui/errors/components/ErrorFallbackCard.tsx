import { Button } from '@lib/ui/buttons/Button'
import { Panel } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { ModalTitleText } from '@lib/ui/modal/ModalTitleText'
import { Text } from '@lib/ui/text'

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
      </VStack>
    </Panel>
  )
}
