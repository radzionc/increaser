import { getLastItem } from '@increaser/utils/getLastItem'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useLastSetEnd = () => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)?.end || null
}
