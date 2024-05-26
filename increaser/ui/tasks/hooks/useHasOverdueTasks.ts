import { useOverdueTasks } from './useOverdueTasks'
import { isEmpty } from '@lib/utils/array/isEmpty'

export const useHasOverdueTasks = () => {
  const overdueTasks = useOverdueTasks()

  return !isEmpty(overdueTasks)
}
