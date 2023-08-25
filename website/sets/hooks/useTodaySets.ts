import { getDaySets } from 'sets/helpers/getDaySets'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useTodaySets = () => {
  const { sets } = useAssertUserState()

  return getDaySets(sets, Date.now())
}
