import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useLastSet = () => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)
}
