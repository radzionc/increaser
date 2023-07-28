import { Set } from 'sets/Set'
import { getLast } from 'shared/utils/getLast'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useLastSet = (): Set | null => {
  const { sets } = useAssertUserState()

  return getLast(sets)
}
