import { useActiveSet } from '../ActiveSetProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'

type ActiveSetType = 'new' | 'edit'

export const useActiveSetType = (): ActiveSetType => {
  const [{ initialSet }] = usePresentState(useActiveSet())

  return initialSet ? 'edit' : 'new'
}
