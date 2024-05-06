import { Button } from '@lib/ui/buttons/Button'
import { useMemo } from 'react'

import { useAddSetMutation } from '../../sets/hooks/useAddSetMutation'
import { analytics } from '../../analytics'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useTrackTime } from './TrackTimeProvider'
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

  const onComplete = () => {
    setState((state) => ({
      ...state,
      currentSet: null,
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
    <Button onClick={onSubmit} isDisabled={isDisabled}>
      Submit
    </Button>
  )
}
