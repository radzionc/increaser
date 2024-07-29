import { useEffect, useRef, useState } from 'react'
import { UIComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Task } from '@increaser/entities/Task'
import { Panel } from '@lib/ui/panel/Panel'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { otherProject } from '@increaser/entities/Project'
import { TaskFormShape } from './TaskFormShape'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskLinksInput } from './TaskLinksInput'
import { fixLinks } from './fixLinks'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { fixChecklist } from './checklist/fixChecklist'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useAssertUserState } from '../../user/UserStateContext'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { TaskDescriptionInput } from './TaskDescriptionInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { HStack } from '@lib/ui/layout/Stack'
import { TaskDeadlineInput } from '../TaskDeadlineInput'
import { ExportFromTemplate } from './ExportFromTemplate'
import { endOfDay } from 'date-fns'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'

type CreateTaskFormProps = UIComponentProps & {
  defaultValue?: Partial<TaskFormShape>
  onFinish?: (task?: Task) => void
  onMutationFinish?: (task: Task) => void
}

export const CreateTaskForm = ({
  onFinish,
  onMutationFinish,
  defaultValue,
  ...rest
}: CreateTaskFormProps) => {
  const [value, setValue] = useState<TaskFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    description: '',
    deadlineAt: endOfDay(Date.now()).getTime(),
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

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  const hasProjectSelectorAutoFocus = !defaultValue?.projectId

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
      {...rest}
    >
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            autoFocus={hasProjectSelectorAutoFocus}
            value={value.projectId}
            onChange={(projectId) => {
              setValue((prev) => ({ ...prev, projectId }))
              nameInputRef.current?.focus()
            }}
          />
        </div>

        <EmbeddedTitleInput
          placeholder="Task name"
          autoFocus={!hasProjectSelectorAutoFocus}
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
        />
      </EmojiTextInputFrame>
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
      <TaskDescriptionInput
        value={value.description}
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
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
        <TaskDeadlineInput
          value={value.deadlineAt}
          onChange={(deadlineAt) =>
            setValue((prev) => ({
              ...prev,
              deadlineAt,
            }))
          }
        />
        <CreateFormFooter
          isPending={isPending}
          isDisabled={isDisabled}
          onCancel={() => {
            onFinish?.()
          }}
        />
      </HStack>
    </Panel>
  )
}
