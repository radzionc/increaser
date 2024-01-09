import { useState } from 'react'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ClosableComponentProps } from '@lib/ui/props'
import { Button } from '@lib/ui/buttons/Button'
import { TimeInput } from '@lib/ui/timeline/TimeInput'
import { MS_IN_HOUR } from '@lib/utils/time'
import { startOfHour } from 'date-fns'
import { Modal } from '@lib/ui/modal'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'

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
      placement="top"
      onClose={onClose}
      footer={
        <Button onClick={() => onSubmit(value)} kind="reversed" size="l">
          Update
        </Button>
      }
    >
      <TimeInput
        intialValue={startedAt}
        timelineStartsAt={timelineStartsAt}
        timelineEndsAt={now}
        color={projectsRecord[projectId].hslaColor}
        value={value}
        onChange={setValue}
      />
    </Modal>
  )
}
