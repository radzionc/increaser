import { Button } from '@lib/ui/buttons/Button'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { useCurrentForecastedTask } from './state/currentForecastedTask'
import { useUser } from '../../user/state/user'
import { generateTask } from '@increaser/entities-utils/taskFactory/generateTask'
import { getNextCadencePeriodStart } from '@increaser/entities-utils/taskFactory/getNextCadencePeriodStart'
import { useMemo } from 'react'

export const ForceRecurringTaskCreation = () => {
  const task = useCurrentForecastedTask()

  const { cadence, lastOutputAt } = task

  const nextTaskWillBeCreatedAt = useMemo(
    () =>
      getNextCadencePeriodStart({ cadence, at: lastOutputAt ?? Date.now() }),
    [cadence, lastOutputAt],
  )

  const isDisabled =
    task.willBeCreatedAt > nextTaskWillBeCreatedAt
      ? 'To create this task, you first need to create the task that comes before it.'
      : undefined

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
    <Button kind="ghostPrimary" isDisabled={isDisabled} onClick={handleSubmit}>
      Create now
    </Button>
  )
}
