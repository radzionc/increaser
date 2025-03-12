import { usePresentState } from '@lib/ui/state/usePresentState'

import { useActiveSet } from '../../ActiveSetProvider'

type ActiveSetType = 'new' | 'edit'

export const useActiveSetType = (): ActiveSetType => {
  const [{ initialSet }] = usePresentState(useActiveSet())

  return initialSet ? 'edit' : 'new'
}
