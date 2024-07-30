import { getLastItem } from '@lib/utils/array/getLastItem'
import { useCurrentFocus } from '../CurrentFocusProvider'

export const useIsFocusPaused = () => {
  const { intervals } = useCurrentFocus()

  return getLastItem(intervals).end !== null
}
