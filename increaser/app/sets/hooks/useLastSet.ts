import { getLastItem } from '@lib/utils/array/getLastItem'
import { Set } from '@increaser/app/sets/Set'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const useLastSet = (): Set | null => {
  const { sets } = useAssertUserState()

  return getLastItem(sets)
}
