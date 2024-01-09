import { getDaySets } from '@increaser/app/sets/helpers/getDaySets'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useTodaySets = () => {
  const { sets } = useAssertUserState()

  return getDaySets(sets, Date.now())
}
