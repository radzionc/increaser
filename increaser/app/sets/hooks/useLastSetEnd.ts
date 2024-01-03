import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useLastSetEnd = () => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)?.end || null
}
