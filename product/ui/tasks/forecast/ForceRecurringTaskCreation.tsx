import { Button } from '@lib/ui/buttons/Button'
import { generateTask } from '@product/entities-utils/taskFactory/generateTask'
import { getNextCadencePeriodStart } from '@product/entities-utils/taskFactory/getNextCadencePeriodStart'
import { useMemo } from 'react'

import { useUser } from '../../user/state/user'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'

import { useCurrentForecastedTask } from './state/currentForecastedTask'

export const ForceRecurringTaskCreation = () => {
  const task = useCurrentForecastedTask()

  const { cadence, lastOutputAt } = task

  const nextTaskWillBeCreatedAt = useMemo(
    () =>
      getNextCadencePeriodStart({ cadence, at: lastOutputAt ?? Date.now() }),
    [cadence, lastOutputAt],
  )

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

  if (task.willBeCreatedAt > nextTaskWillBeCreatedAt) {
    return null
  }

  return (
    <Button size="xs" kind="ghostPrimary" onClick={handleSubmit}>
      Create now
    </Button>
  )
}
