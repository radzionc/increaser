import { Button } from '@lib/ui/buttons/Button'

import { useDeleteSetMutation } from '../../../hooks/useDeleteSetMutation'
import { useActiveSet } from '../ActiveSetProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'

export const DeleteSetAction = () => {
  const [activeSet, setActiveSet] = usePresentState(useActiveSet())
  const { mutate: deleteSet } = useDeleteSetMutation()

  return (
    <Button
      onClick={() => {
        deleteSet(activeSet)
        setActiveSet(null)
      }}
      kind="alert"
    >
      Delete
    </Button>
  )
}
