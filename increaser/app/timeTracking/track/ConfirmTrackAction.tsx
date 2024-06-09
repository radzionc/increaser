import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/layout/Stack'
import { useMemo } from 'react'

import { useAddSetMutation } from '../../sets/hooks/useAddSetMutation'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useTrackTime } from './state/TrackTimeContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUpdateSetMutation } from '../../sets/hooks/useUpdateSetMutation'
import { useDeleteSetMutation } from '../../sets/hooks/useDeleteSetMutation'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'

export const ConfirmTrackAction = () => {
  const { sets, setState, currentSet: potentialCurrentSet } = useTrackTime()
  const currentSet = shouldBePresent(potentialCurrentSet)

  const analytics = useAnalytics()

  const isDisabled = useMemo(() => {
    const hasIntersection = sets.some((set, index) =>
      currentSet.index === index ? false : areIntersecting(set, currentSet),
    )
    if (hasIntersection) {
      return 'This session intersects with another session'
    }

    return false
  }, [currentSet, sets])

  const { mutate: addSet } = useAddSetMutation()
  const { mutate: updateSet } = useUpdateSetMutation()
  const { mutate: deleteSet } = useDeleteSetMutation()

  const onComplete = () => {
    setState((state) => ({
      ...state,
      interval: null,
      currentSetIndex: null,
    }))
  }

  const onSubmit = () => {
    if (currentSet.index === undefined) {
      addSet(currentSet)
      analytics.trackEvent('Add session')
    } else {
      updateSet({
        old: sets[currentSet.index],
        new: currentSet,
      })
      analytics.trackEvent('Update session')
    }

    onComplete()
  }

  return (
    <HStack gap={12} wrap="wrap" fullWidth justifyContent="space-between">
      {currentSet.index === undefined ? (
        <div />
      ) : (
        <Button
          onClick={() => {
            deleteSet(sets[shouldBePresent(currentSet.index)])
            analytics.trackEvent('Delete session')
            onComplete()
          }}
          kind="alert"
        >
          Delete
        </Button>
      )}
      <HStack gap={12}>
        <Button
          onClick={() =>
            setState((state) => ({
              ...state,
              interval: null,
              currentSetIndex: null,
            }))
          }
          kind="secondary"
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} isDisabled={isDisabled}>
          Submit
        </Button>
      </HStack>
    </HStack>
  )
}
