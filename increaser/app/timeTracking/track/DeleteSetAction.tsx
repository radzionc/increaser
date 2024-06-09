import { Button } from '@lib/ui/buttons/Button'

import { useTrackTime } from './state/TrackTimeContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useDeleteSetMutation } from '../../sets/hooks/useDeleteSetMutation'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

export const DeleteSetAction = () => {
  const { sets, setState, currentSet } = useTrackTime()

  const { mutate: deleteSet } = useDeleteSetMutation()

  const analytics = useAnalytics()

  return (
    <Button
      onClick={() => {
        deleteSet(sets[shouldBePresent(currentSet?.index)])
        analytics.trackEvent('Delete session')
        setState((state) => ({
          ...state,
          currentSet: null,
        }))
      }}
      kind="alert"
    >
      Delete
    </Button>
  )
}
