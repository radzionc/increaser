import { TaskFormShape } from './TaskFormShape'

export const useIsTaskFormDisabled = ({
  name,
}: Pick<TaskFormShape, 'name'>) => {
  if (!name.trim()) {
    return 'Name is required'
  }
}
