import { useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Task } from '@increaser/entities/Task'
import { otherProject } from '@increaser/entities/Project'
import { TaskFormShape } from './TaskFormShape'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { useUser } from '@increaser/ui/user/state/user'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { HStack } from '@lib/ui/css/stack'
import { TaskDeadlineInput } from '../deadline/TaskDeadlineInput'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskStatusInput } from './TaskStatusInput'
import { TaskFormHeader } from './TaskFormHeader'
import { AddTaskLink } from './links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from './checklist/AddTaskChecklist'
import { Button } from '@lib/ui/buttons/Button'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import {
  ComponentWithInitialValueProps,
  OptionalValueFinishProps,
} from '@lib/ui/props'
import { TaskTemplateFormShape } from '../../taskTemplates/form/TaskTemplateFormShape'
import { TaskTemplatesWidget } from '../../taskTemplates/widget/TaskTemplatesWidget'

export const CreateTaskForm: React.FC<
  Partial<ComponentWithInitialValueProps<Partial<TaskTemplateFormShape>>> &
    Partial<OptionalValueFinishProps<TaskTemplate>>
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
      style={{ gap: 0 }}
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

          <TaskTemplatesWidget projectId={value.projectId} />

          <AddTaskLink
            onFinish={(link) =>
              setValue((prev) => ({ ...prev, links: [...prev.links, link] }))
            }
          />
          {isEmpty(value.checklist) && (
            <AddTaskChecklist
              onFinish={(checklist) =>
                setValue((prev) => ({
                  ...prev,
                  checklist,
                }))
              }
            />
          )}
        </HStack>
        <Button type="submit" isLoading={isPending} isDisabled={isDisabled}>
          Submit
        </Button>
      </HStack>
    </ListItemForm>
  )
}
