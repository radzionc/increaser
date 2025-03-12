import { getLastItem } from '@lib/utils/array/getLastItem'
import { useSets } from '@product/ui/sets/hooks/useSets'

export const useLastSet = () => {
  const sets = useSets()

  return getLastItem(sets)
}
