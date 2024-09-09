import { useEffect, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Task } from '@increaser/entities/Task'
import { otherProject } from '@increaser/entities/Project'
import { TaskFormShape } from './TaskFormShape'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskLinksInput } from './TaskLinksInput'
import { fixLinks } from './fixLinks'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { fixChecklist } from './checklist/fixChecklist'
import { useAssertUserState } from '../../user/UserStateContext'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { HStack } from '@lib/ui/css/stack'
import { TaskDeadlineInput } from '../deadline/TaskDeadlineInput'
import { ExportFromTemplate } from './ExportFromTemplate'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskStatusInput } from './TaskStatusInput'
import { TaskFormHeader } from './TaskFormHeader'
import { AddTaskLink } from './links/AddTaskLink'

type CreateTaskFormProps = {
  defaultValue?: Partial<TaskFormShape>
  onFinish?: (task?: Task) => void
  onMutationFinish?: (task: Task) => void
}

export const CreateTaskForm = ({
  onFinish,
  onMutationFinish,
  defaultValue,
}: CreateTaskFormProps) => {
  const [value, setValue] = useState<TaskFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    description: '',
    deadlineAt: null,
    status: 'todo',
    ...defaultValue,
  })
  const { tasks } = useAssertUserState()
  const { mutate, isPending, variables } = useCreateUserEntityMutation('task')
  useEffect(() => {
    if (!variables) return

    const task = tasks[variables.id]
    if (task) {
      onFinish?.(task)
    }
  }, [onFinish, tasks, variables])

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    if (isDisabled) return

    const orders = Object.values(tasks)
      .filter((task) => task.deadlineAt === value.deadlineAt)
      .map((task) => task.order)
    const order = getLastItemOrder(orders)

    const startedAt = Date.now()
    const task: Task = {
      id: getId(),
      ...value,
      links: fixLinks(value.links),
      checklist: fixChecklist(value.checklist),
      startedAt,
      order,
    }
    mutate(task, {
      onSuccess: () => {
        onMutationFinish?.(task)
      },
    })
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
        hasProjectAutoFocus={!defaultValue?.projectId}
        onSubmit={isDisabled ? undefined : onSubmit}
      />
      <ExportFromTemplate
        projectId={value.projectId}
        onFinish={(template) => {
          setValue((prev) => ({
            ...prev,
            ...template,
            name: prev.name || template.name,
          }))
        }}
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <HStack
        wrap="wrap"
        fullWidth
        alignItems="center"
        gap={20}
        justifyContent="space-between"
      >
        <HStack gap={8}>
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
          <AddTaskLink
            onFinish={(link) =>
              setValue((prev) => ({ ...prev, links: [...prev.links, link] }))
            }
          />
        </HStack>
        <CreateFormFooter
          isPending={isPending}
          isDisabled={isDisabled}
          onCancel={() => {
            onFinish?.()
          }}
        />
      </HStack>
    </ListItemForm>
  )
}
