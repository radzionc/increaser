import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

export const useLastSetEnd = () => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)?.end || null
}
