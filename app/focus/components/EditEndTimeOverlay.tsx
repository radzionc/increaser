import { VStack } from '@increaser/ui/layout/Stack'
import { Button } from '@increaser/ui/buttons/Button'
import { useFocus } from 'focus/hooks/useFocus'
import { useCurrentFocus } from './CurrentFocusProvider'
import { endOfDay } from 'date-fns'
import { useState } from 'react'
import { SessionEndTimeInput } from './SessionEndTimeInput'
import { Modal } from '@increaser/ui/modal'

export const EditEndTimeOverlay = () => {
  const { cancel, stop } = useFocus()
  const { startedAt, projectId } = useCurrentFocus()

  const max = Math.min(endOfDay(startedAt).getTime(), Date.now())

  const [endedAt, setEndedAt] = useState(() => Math.min(Date.now(), max))

  return (
    <Modal
      onClose={stop}
      title="Forgot to stop the session?"
      subTitle="Your session may have gone on too long. Update the duration or discard it to continue."
      footer={
        <VStack gap={4}>
          <Button
            onClick={() => {
              stop({
                setOverride: {
                  end: endedAt,
                },
              })
            }}
            kind="reversed"
            size="l"
          >
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
