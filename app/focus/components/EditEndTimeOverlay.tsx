import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useFocus } from 'focus/hooks/useFocus'
import { useCurrentFocus } from './CurrentFocusProvider'
import { endOfDay, startOfHour } from 'date-fns'
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

  const startHour = startOfHour(startedAt).getHours()
  console.log(startHour)

  return (
    <Modal
      title={
        <VStack gap={4}>
          <Text>Forgot to stop the session?</Text>
          <Text color="supporting" size={16} weight="regular">
            Your session may have gone on too long. Update the duration or
            discard it to continue.
          </Text>
        </VStack>
      }
      renderContent={() => (
        <SessionEndTimeInput
          projectId={projectId}
          startedAt={startedAt}
          value={endedAt}
          onChange={setEndedAt}
        />
      )}
      footer={
        <VStack gap={4}>
          <Button
            kind="reversed"
            size="l"
            onClick={() => {
              stop({
                setOverride: {
                  end: endedAt,
                },
              })
            }}
          >
            Update duration
          </Button>
          <Button kind="ghostSecondary" size="l" onClick={cancel}>
            Discard session
          </Button>
        </VStack>
      }
    />
  )
}
