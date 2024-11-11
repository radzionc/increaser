import { getLastItem } from '@lib/utils/array/getLastItem'
import { useSets } from '@increaser/ui/sets/hooks/useSets'

export const useLastSet = () => {
  const sets = useSets()

  return getLastItem(sets)
}
