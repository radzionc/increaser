import { Text } from '@lib/ui/text'
import { useCurrentTask } from './CurrentTaskProvider'

export const EditableTaskName = () => {
  const task = useCurrentTask()

  return <Text>{task.name}</Text>
}
