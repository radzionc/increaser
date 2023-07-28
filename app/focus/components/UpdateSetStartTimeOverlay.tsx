import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { useState } from 'react'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { ClosableComponentProps } from 'shared/props'
import { assertDefined } from 'shared/utils/assertDefined'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Modal } from '@increaser/ui/ui/Modal'
import { TimeInput } from '@increaser/ui/ui/timeline/TimeInput'
import { MS_IN_HOUR } from 'utils/time'
interface Props extends ClosableComponentProps {
  onSubmit: (value: number) => void
}

export const UpdateSetStartTimeOverlay = ({ onClose, onSubmit }: Props) => {
  const { currentSet: optionalCurrentSet } = useFocus()
  const currentSet = assertDefined(optionalCurrentSet)

  const now = useRhythmicRerender(10000)
  const startOfDay = useStartOfDay()
  const newLocal = now - startOfDay
  const msToday = newLocal

  const endHour = Math.ceil(msToday / MS_IN_HOUR)
  const startHour = Math.max(endHour - 2, 0)

  const { projectsRecord } = useProjects()

  const [value, setValue] = useState(currentSet.startedAt)

  return (
    <Modal
      title="Session start time"
      width={380}
      placement="top"
      onClose={onClose}
      footer={
        <Button
          kind="reversed"
          onClick={() => {
            onSubmit(value)
          }}
          size="l"
        >
          Update
        </Button>
      }
      renderContent={() => (
        <TimeInput
          intialValue={currentSet.startedAt}
          pxInHour={180}
          startOfDay={startOfDay}
          startHour={startHour}
          endHour={endHour}
          color={projectsRecord[currentSet.projectId].hslaColor}
          value={value}
          onChange={setValue}
          max={now}
        />
      )}
    />
  )
}
