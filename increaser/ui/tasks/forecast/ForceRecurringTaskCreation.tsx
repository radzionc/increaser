import { Button } from '@lib/ui/buttons/Button'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { useCurrentForecastedTask } from './state/currentForecastedTask'
import { useUser } from '../../user/state/user'
import { generateTask } from '@increaser/entities-utils/taskFactory/generateTask'

export const ForceRecurringTaskCreation = () => {
  const task = useCurrentForecastedTask()

  const { mutate: updateTaskFactory } =
    useUpdateUserEntityMutation('taskFactory')
  const { mutate: createTask } = useCreateUserEntityMutation('task')

  const { tasks } = useUser()

  const handleSubmit = () => {
    updateTaskFactory({
      id: task.factoryId,
      fields: {
        lastOutputAt: task.willBeCreatedAt,
      },
    })

    createTask(generateTask({ task, tasks: Object.values(tasks) }))
  }

  return (
    <Button onClick={handleSubmit} size="xs">
      Create now
    </Button>
  )
}
