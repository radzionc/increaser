import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertFocusIntervals } from '../FocusContext'

export const useIsFocusPaused = () => {
  const intervals = useAssertFocusIntervals()

  return getLastItem(intervals).end !== null
}
