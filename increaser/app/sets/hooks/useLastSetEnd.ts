import { getLastItem } from '@lib/utils/array/getLastItem'
import { useSets } from '@increaser/ui/sets/hooks/useSets'

export const useLastSetEnd = () => {
  const sets = useSets()

  return getLastItem(sets)?.end || null
}
