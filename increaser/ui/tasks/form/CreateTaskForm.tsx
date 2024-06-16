import { FormEvent, useState } from 'react'
import { useKey } from 'react-use'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { DeadlineType, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { useCreateTaskMutation } from '@increaser/ui/tasks/api/useCreateTaskMutation'
import { TaskNameInput } from '../TaskNameInput'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { Button } from '@lib/ui/buttons/Button'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { otherProject } from '@increaser/entities/Project'
import { TaskFormShape } from './TaskFormShape'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskLinksInput } from './TaskLinksInput'
import { fixLinks } from './fixLinks'

type CreateTaskFormProps = FinishableComponentProps & {
  deadlineType: DeadlineType
  order: number
}

export const CreateTaskForm = ({
  onFinish,
  deadlineType,
  order,
}: CreateTaskFormProps) => {
  const [value, setValue] = useState<TaskFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
  })
  const { mutate } = useCreateTaskMutation()

  useKey('Escape', onFinish)

  const isDisabled = useIsTaskFormDisabled(value)

  const handleSubmit = () => {
    if (isDisabled) return

    const startedAt = Date.now()
    const task: Task = {
      id: getId(),
      ...value,
      links: fixLinks(value.links),
      startedAt,
      deadlineAt: getDeadlineAt({ now: startedAt, deadlineType }),
      order,
    }
    mutate(task)
    onFinish()
  }

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      onSubmit={preventDefault<FormEvent<HTMLFormElement>>(() => {
        handleSubmit()
      })}
    >
      <TaskNameInput
        placeholder="Task name"
        autoFocus
        value={value.name}
        onChange={(name) => setValue((prev) => ({ ...prev, name }))}
        onSubmit={handleSubmit}
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <TaskProjectSelector
          value={value.projectId}
          onChange={(projectId) => setValue((prev) => ({ ...prev, projectId }))}
        />
        <HStack alignItems="center" gap={8}>
          <Button onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Add task</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
