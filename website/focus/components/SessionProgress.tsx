import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { MS_IN_MIN } from '@increaser/utils/time'

import { FillingBlock } from './FillingBlock'
import { useCurrentFocus } from './CurrentFocusProvider'

export const SessionProgress = () => {
  const now = useRhythmicRerender()

  const { focusDuration } = useFocus()
  const { startedAt, projectId } = useCurrentFocus()

  const { projectsRecord } = useProjects()
  const color = projectsRecord[projectId].hslaColor

  const msPassed = now - startedAt

  return (
    <FillingBlock
      completion={msPassed / (focusDuration * MS_IN_MIN)}
      color={color}
    />
  )
}
