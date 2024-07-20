import { EmbeddedDescriptionInput } from '@lib/ui/inputs/EmbeddedDescriptionInput'
import { InputProps } from '@lib/ui/props'

export const TaskDescriptionInput = ({
  value,
  onChange,
}: InputProps<string>) => {
  return (
    <EmbeddedDescriptionInput
      label="Description"
      placeholder="Describe your task"
      onChange={onChange}
      value={value}
    />
  )
}
