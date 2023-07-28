import { getLast } from 'shared/utils/getLast'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useLastSetEnd = () => {
  const { sets } = useAssertUserState()

  return getLast(sets)?.end || null
}
