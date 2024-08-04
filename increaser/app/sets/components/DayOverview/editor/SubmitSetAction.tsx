import { Button } from '@lib/ui/buttons/Button'
import { useMemo } from 'react'

import { areIntersecting } from '@lib/utils/interval/areIntersecting'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useAddSetMutation } from '../../../hooks/useAddSetMutation'
import { useUpdateSetMutation } from '../../../hooks/useUpdateSetMutation'
import { useActiveSet } from '../ActiveSetProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { useActiveSetType } from '../hooks/useActiveSetType'

export const SubmitSetAction = () => {
  const [activeSet, setActiveSet] = useActiveSet()
  const type = useActiveSetType()
  const { start, end, projectId, initialSet } = shouldBePresent(activeSet)
  const { sets } = useAssertUserState()

  const isDisabled = useMemo(() => {
    const hasIntersection = sets.some((set) => {
      if (initialSet && areEqualIntervals(initialSet, set)) {
        return false
      }

      return areIntersecting(set, { start, end })
    })
    if (hasIntersection) {
      return 'This session intersects with another session'
    }

    return false
  }, [end, initialSet, sets, start])

  const { mutate: addSet } = useAddSetMutation()
  const { mutate: updateSet } = useUpdateSetMutation()

  const onSubmit = () => {
    const set = {
      start,
      end,
      projectId,
    }
    if (type === 'new') {
      addSet(set)
    } else {
      updateSet({
        old: shouldBePresent(initialSet),
        new: set,
      })
    }

    setActiveSet(null)
  }

  return (
    <Button onClick={onSubmit} isDisabled={isDisabled}>
      {type === 'new' ? 'Add' : 'Update'}
    </Button>
  )
}
