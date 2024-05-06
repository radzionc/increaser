import { getLastItem } from '@lib/utils/array/getLastItem'
import { Set } from '@increaser/entities/User'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useLastSet = (): Set | null => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)
}
