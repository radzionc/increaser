import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useActiveSet } from '../ActiveSetProvider'

type ActiveSetType = 'new' | 'edit'

export const useActiveSetType = (): ActiveSetType => {
  const [activeSet] = useActiveSet()
  const { initialSet } = shouldBePresent(activeSet)

  return initialSet ? 'edit' : 'new'
}
