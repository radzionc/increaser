import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/layout/Stack'
import { useMemo } from 'react'

import { useAddSetMutation } from '../../sets/hooks/useAddSetMutation'
import { analytics } from '../../analytics'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useTrackTime } from './TrackTimeProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUpdateSetMutation } from '../../sets/hooks/useUpdateSetMutation'
import { useDeleteSetMutation } from '../../sets/hooks/useDeleteSetMutation'

export const ConfirmTrackAction = () => {
  const { interval, sets, projectId, setState, currentSetIndex } =
    useTrackTime()

  const isDisabled = useMemo(() => {
    if (!interval) {
      return 'Add a session interval'
    }
    if (
      sets.some((set, index) =>
        currentSetIndex === index ? false : areIntersecting(set, interval),
      )
    ) {
      return 'This session intersects with another session'
    }
    return false
  }, [currentSetIndex, interval, sets])

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
    const { start, end } = shouldBePresent(interval)
    const set = {
      start,
      end,
      projectId,
    }
    if (currentSetIndex === null) {
      addSet(set)
      analytics.trackEvent('Add session')
    } else {
      updateSet({
        old: sets[currentSetIndex],
        new: set,
      })
      analytics.trackEvent('Update session')
    }

    onComplete()
  }

  return (
    <HStack gap={12} wrap="wrap" fullWidth justifyContent="space-between">
      {currentSetIndex === null ? (
        <div />
      ) : (
        <Button
          onClick={() => {
            deleteSet(sets[currentSetIndex])
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
