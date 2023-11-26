import { Modal } from '@increaser/ui/modal'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { Button } from '@increaser/ui/buttons/Button'
import { useFocus } from 'focus/hooks/useFocus'
import { useCurrentFocus } from './CurrentFocusProvider'
import { endOfDay } from 'date-fns'
import { MS_IN_MIN } from '@increaser/utils/time'
import { useState } from 'react'
import { SessionEndTimeInput } from './SessionEndTimeInput'

export const EditEndTimeOverlay = () => {
  const { cancel, stop } = useFocus()
  const { startedAt, projectId } = useCurrentFocus()

  const max = Math.min(endOfDay(startedAt).getTime(), Date.now())

  const [endedAt, setEndedAt] = useState(() =>
    Math.min(max, startedAt + 90 * MS_IN_MIN),
  )

  return (
    <Modal
      onClose={cancel}
      title={
        <VStack gap={4}>
          <Text>Forgot to stop the session?</Text>
          <Text color="supporting" size={16} weight="regular">
            Your session may have gone on too long. Update the duration or
            discard it to continue.
          </Text>
        </VStack>
      }
      onSubmit={() => {
        stop({
          setOverride: {
            end: endedAt,
          },
        })
      }}
      footer={
        <VStack gap={4}>
          <Button kind="reversed" size="l">
            Update duration
          </Button>
          <Button kind="ghostSecondary" size="l" onClick={cancel}>
            Discard session
          </Button>
        </VStack>
      }
    >
      <SessionEndTimeInput
        projectId={projectId}
        startedAt={startedAt}
        value={endedAt}
        onChange={setEndedAt}
      />
    </Modal>
  )
}
