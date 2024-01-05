import { VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { endOfDay } from 'date-fns'
import { useState } from 'react'
import { SessionEndTimeInput } from './SessionEndTimeInput'
import { Modal } from '@lib/ui/modal'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'

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
