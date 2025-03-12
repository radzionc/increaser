import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { InitialValueProp, OnFinishProp } from '@lib/ui/props'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { otherProject } from '@product/entities/Project'
import { Task } from '@product/entities/Task'
import { TaskTemplate } from '@product/entities/TaskTemplate'
import { getId } from '@product/entities-utils/shared/getId'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { TaskTemplateFormShape } from '../../taskTemplates/form/TaskTemplateFormShape'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { TaskDeadlineInput } from '../deadline/TaskDeadlineInput'

import { TaskFormHeader } from './TaskFormHeader'
import { TaskFormShape } from './TaskFormShape'
import { TaskStatusInput } from './TaskStatusInput'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'

export const CreateTaskForm: React.FC<
  Partial<InitialValueProp<Partial<TaskTemplateFormShape>>> &
    Partial<OnFinishProp<TaskTemplate, 'optional'>>
> = ({ onFinish, initialValue }) => {
  const [value, setValue] = useState<TaskFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    description: '',
    deadlineAt: null,
    status: 'todo',
    ...initialValue,
  })
  const { tasks } = useUser()
  const { mutate, isPending } = useCreateUserEntityMutation('task', {
    onOptimisticUpdate: onFinish,
  })

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    if (isDisabled) return

    const order = getLastItemOrder(
      Object.values(tasks)
        .filter((task) => task.status === value.status)
        .map((task) => task.order),
    )

    const deadlineOrder = getLastItemOrder(
      Object.values(tasks)
        .filter((task) => task.deadlineAt === value.deadlineAt)
        .map((task) => task.deadlineOrder),
    )

    const startedAt = Date.now()

    const task: Task = {
      id: getId(),
      ...value,
      startedAt,
      order,
      deadlineOrder,
    }

    mutate(task)
  }

  return (
    <ListItemForm
      onClose={() => onFinish?.()}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        hasProjectAutoFocus={!initialValue?.projectId}
        onSubmit={isDisabled ? undefined : onSubmit}
        onClose={() => onFinish?.()}
      />
      <HStack
        wrap="wrap"
        fullWidth
        alignItems="center"
        gap={20}
        justifyContent="space-between"
      >
        <HStack wrap="wrap" alignItems="center" gap={8}>
          <TaskStatusInput
            value={value.status}
            onChange={(status) =>
              setValue((prev) => ({
                ...prev,
                status,
              }))
            }
          />
          <TaskDeadlineInput
            value={value.deadlineAt}
            onChange={(deadlineAt) =>
              setValue((prev) => ({
                ...prev,
                deadlineAt,
              }))
            }
          />
        </HStack>
        <Button type="submit" isLoading={isPending} isDisabled={isDisabled}>
          Submit
        </Button>
      </HStack>
    </ListItemForm>
  )
}
