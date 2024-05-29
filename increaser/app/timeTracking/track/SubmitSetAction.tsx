import { Button } from '@lib/ui/buttons/Button'
import { useMemo } from 'react'

import { useAddSetMutation } from '../../sets/hooks/useAddSetMutation'
import { analytics } from '../../analytics'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useTrackTime } from './state/TrackTimeContext'
import { useUpdateSetMutation } from '../../sets/hooks/useUpdateSetMutation'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const SubmitSetAction = () => {
  const { sets, setState, currentSet: potentialCurrentSet } = useTrackTime()
  const currentSet = shouldBePresent(potentialCurrentSet)

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

  const onSubmit = () => {
    if (currentSet.index === undefined) {
      addSet(currentSet)
      analytics.trackEvent('Add session')
    } else {
      const newValue = { ...currentSet }
      const oldValue = sets[currentSet.index]
      if (oldValue.isEndEstimated) {
        newValue.isEndEstimated = null
      }

      updateSet({
        old: oldValue,
        new: newValue,
      })
      analytics.trackEvent('Update session')
    }

    setState((state) => ({
      ...state,
      currentSet: null,
    }))
  }

  return (
    <Button onClick={onSubmit} isDisabled={isDisabled}>
      Submit
    </Button>
  )
}
