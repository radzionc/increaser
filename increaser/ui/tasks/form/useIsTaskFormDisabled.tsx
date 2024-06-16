import { TaskFormShape } from './TaskFormShape'

export const useIsTaskFormDisabled = ({ name }: TaskFormShape) => {
  if (!name.trim()) {
    return 'Name is required'
  }
}
