import { getLastItem } from '@lib/utils/array/getLastItem'
import { useUser } from '@increaser/ui/user/state/user'

export const useLastSet = () => {
  const { sets } = useUser()

  return getLastItem(sets)
}
