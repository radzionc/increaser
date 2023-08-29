import { useProjects } from 'projects/hooks/useProjects'
import { useState } from 'react'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { ClosableComponentProps } from '@increaser/ui/props'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Modal } from '@increaser/ui/ui/Modal'
import { TimeInput } from '@increaser/ui/ui/timeline/TimeInput'
import { MS_IN_HOUR } from '@increaser/utils/time'
import { useCurrentFocus } from './CurrentFocusProvider'
import { startOfHour } from 'date-fns'

interface Props extends ClosableComponentProps {
  onSubmit: (value: number) => void
}

export const UpdateSetStartTimeOverlay = ({ onClose, onSubmit }: Props) => {
  const now = useRhythmicRerender(10000)
  const startOfDay = useStartOfDay()

  const { projectsRecord } = useProjects()

  const { startedAt, projectId } = useCurrentFocus()

  const [value, setValue] = useState(startedAt)

  const timelineStartsAt = Math.max(
    startOfDay,
    startOfHour(now).getTime() - 2 * MS_IN_HOUR,
  )

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
          intialValue={startedAt}
          timelineStartsAt={timelineStartsAt}
          timelineEndsAt={now}
          color={projectsRecord[projectId].hslaColor}
          value={value}
          onChange={setValue}
        />
      )}
    />
  )
}
