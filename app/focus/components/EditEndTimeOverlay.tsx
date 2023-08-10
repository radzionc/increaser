import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useFocus } from 'focus/hooks/useFocus'

export const EditEndTimeOverlay = () => {
  const { cancel } = useFocus()
  return (
    <Modal
      title={
        <VStack gap={4}>
          <Text>Forgot to stop?</Text>
          <Text color="supporting" size={16} weight="regular">
            It looks like you forgot to stop the session. Please cancel the
            session and add a new one.
          </Text>
        </VStack>
      }
      renderContent={() => null}
      footer={<Button onClick={cancel}>Cancel session</Button>}
    />
  )
}
