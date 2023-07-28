import { useFocus } from 'focus/hooks/useFocus'
import { useProjects } from 'projects/hooks/useProjects'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { assertDefined } from 'shared/utils/assertDefined'
import { MS_IN_MIN } from 'utils/time'

import { FillingBlock } from './FillingBlock'

export const SessionProgress = () => {
  const now = useRhythmicRerender()

  const { currentSet: optionalCurrentSet, focusDuration } = useFocus()
  const { startedAt, projectId } = assertDefined(optionalCurrentSet)

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
