import { getLastItem } from '@increaser/utils/array/getLastItem'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useLastSetEnd = () => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)?.end || null
}
