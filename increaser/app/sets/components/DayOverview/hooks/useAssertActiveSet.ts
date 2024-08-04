import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useActiveSet } from '../ActiveSetProvider'

export const useAssertActiveSet = () => {
  const [activeSet] = useActiveSet()

  return shouldBePresent(activeSet)
}
