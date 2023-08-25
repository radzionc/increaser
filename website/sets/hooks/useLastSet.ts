import { getLastItem } from '@increaser/utils/getLastItem'
import { Set } from 'sets/Set'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useLastSet = (): Set | null => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)
}
