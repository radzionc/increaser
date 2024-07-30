import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentFocus } from '../CurrentFocusProvider'

export const useFocusProjectId = () => {
  const { intervals } = useCurrentFocus()

  const { projectId } = shouldBePresent(getLastItem(intervals))

  return projectId
}
