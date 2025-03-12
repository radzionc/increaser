import { TaskFactoryFormShape } from './TaskFactoryFormShape'

export const useIsTaskFactoryFormDisabled = ({
  name,
}: TaskFactoryFormShape) => {
  if (!name.trim()) {
    return 'Name is required'
  }
}
