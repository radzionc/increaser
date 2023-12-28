import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { MS_IN_MIN } from '@lib/utils/time'

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
