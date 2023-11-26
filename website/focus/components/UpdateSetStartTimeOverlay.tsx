import { useProjects } from 'projects/hooks/useProjects'
import { useState } from 'react'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { ClosableComponentProps } from '@increaser/ui/props'
import { Button } from '@increaser/ui/buttons/Button'
import { Modal } from '@increaser/ui/modal'
import { TimeInput } from '@increaser/ui/timeline/TimeInput'
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
      onSubmit={() => {
        onSubmit(value)
      }}
      footer={
        <Button kind="reversed" size="l">
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
