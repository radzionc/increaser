import { useMemo } from 'react'
import { useFocusTaskGroups } from './useFocusTaskGroups'

export const useFocusTasks = () => {
  const groups = useFocusTaskGroups()

  return useMemo(() => groups.flatMap(({ tasks }) => tasks), [groups])
}
