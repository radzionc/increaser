import { Button } from '@lib/ui/buttons/Button'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useMemo } from 'react'

import { useAddSetMutation } from '../../sets/hooks/useAddSetMutation'
import { analytics } from '../../analytics'
import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { useTrackTime } from './TrackTimeProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const ConfirmTrackAction = () => {
  const { interval, sets, projectId, setState } = useTrackTime()

  const isDisabled = useMemo(() => {
    if (!interval) {
      return 'Add a session interval'
    }
    if (sets.some((set) => areIntersecting(set, interval))) {
      return 'This session intersects with another session'
    }
    return false
  }, [interval, sets])

  const { mutate: addSet } = useAddSetMutation()

  const onSubmit = () => {
    addSet({ projectId, ...shouldBePresent(interval) })
    analytics.trackEvent('Add session')
    setState((state) => ({
      ...state,
      currentAction: null,
    }))
  }

  return (
    <VStack>
      <HStack style={{ alignSelf: 'end' }} gap={12}>
        <Button
          onClick={() =>
            setState((state) => ({
              ...state,
              currentAction: null,
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
    </VStack>
  )
}
