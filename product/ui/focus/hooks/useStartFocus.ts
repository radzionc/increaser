import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCallback } from 'react'

import { useFocusIntervals } from '../state/focusIntervals'
import { useFocusTarget } from '../state/focusTarget'

type StartFocusParams = {
  start?: number
}

export const useStartFocus = () => {
  const { projectId, taskId } = useFocusTarget()
  const [, setIntervals] = useFocusIntervals()

  const analytics = useAnalytics()

  return useCallback(
    ({ start }: StartFocusParams = {}) => {
      analytics.trackEvent('Start focus session')

      setIntervals([
        {
          start: start ?? Date.now(),
          taskId,
          projectId: shouldBePresent(projectId),
          end: null,
        },
      ])
    },
    [analytics, projectId, setIntervals, taskId],
  )
}
