import { Button } from '@lib/ui/buttons/Button'

import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useDeleteSetMutation } from '../../../hooks/useDeleteSetMutation'
import { useActiveSet } from '../ActiveSetProvider'

export const DeleteSetAction = () => {
  const [activeSet, setActiveSet] = useActiveSet()
  const { mutate: deleteSet } = useDeleteSetMutation()

  const { start, end } = shouldBePresent(activeSet)

  return (
    <Button
      onClick={() => {
        deleteSet({
          start,
          end,
        })
        setActiveSet(null)
      }}
      kind="alert"
    >
      Delete
    </Button>
  )
}
