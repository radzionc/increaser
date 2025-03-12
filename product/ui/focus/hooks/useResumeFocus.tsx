import { usePresentState } from '@lib/ui/state/usePresentState'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCallback } from 'react'

import { useFocusIntervals } from '../state/focusIntervals'
import { useFocusTarget } from '../state/focusTarget'

export const useResumeFocus = () => {
  const [, setIntervals] = usePresentState(useFocusIntervals())

  const { projectId, taskId } = useFocusTarget()

  return useCallback(() => {
    setIntervals((prev) => [
      ...prev,
      {
        start: Date.now(),
        end: null,
        projectId: shouldBePresent(projectId),
        taskId,
      },
    ])
  }, [projectId, setIntervals, taskId])
}
