import { useCurrentTask } from './CurrentTaskProvider'
import { TaskNameInput } from './TaskNameInput'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'

export const EditableTaskName = () => {
  const task = useCurrentTask()

  const { mutate: updateTask } = useUpdateTaskMutation()

  return (
    <InputDebounce
      value={task.name}
      onChange={(name) => updateTask({ id: task.id, fields: { name } })}
      render={({ value, onChange }) => (
        <TaskNameInput value={value} onChange={onChange} />
      )}
    />
  )
}
