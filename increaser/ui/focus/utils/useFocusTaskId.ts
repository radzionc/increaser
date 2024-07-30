import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentFocus } from '../CurrentFocusProvider'

export const useFocusTaskId = () => {
  const { intervals } = useCurrentFocus()

  const { taskId } = shouldBePresent(getLastItem(intervals))

  return taskId
}
