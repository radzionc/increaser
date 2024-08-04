import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useActiveSet } from '../ActiveSetProvider'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

type ActiveSetType = 'new' | 'existing'

export const useActiveSetType = (): ActiveSetType => {
  const { sets } = useAssertUserState()
  const [activeSet] = useActiveSet()

  const existingSet = sets.find((set) =>
    areEqualIntervals(shouldBePresent(activeSet), set),
  )

  return existingSet ? 'existing' : 'new'
}
