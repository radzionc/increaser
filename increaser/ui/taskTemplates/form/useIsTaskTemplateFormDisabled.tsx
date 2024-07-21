import { TaskTemplateFormShape } from './TaskTemplateFormShape'

export const useIsTaskTemplateFormDisabled = ({
  name,
}: TaskTemplateFormShape) => {
  if (!name.trim()) {
    return 'Name is required'
  }
}
