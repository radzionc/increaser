import { useEffect, useState } from 'react'
import { UIComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { DeadlineType, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { useCreateTaskMutation } from '@increaser/ui/tasks/api/useCreateTaskMutation'
import { TaskNameInput } from '../TaskNameInput'
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

type CreateTaskFormProps = UIComponentProps & {
  deadlineType: DeadlineType | null
  order: number
  defaultValue?: Partial<TaskFormShape>
  onFinish: (task?: Task) => void
}

export const CreateTaskForm = ({
  onFinish,
  deadlineType,
  order,
  defaultValue,
  ...rest
}: CreateTaskFormProps) => {
  const [value, setValue] = useState<TaskFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    checklist: [],
    ...defaultValue,
  })
  const { tasks } = useAssertUserState()
  const { mutate, isPending, variables } = useCreateTaskMutation()
  useEffect(() => {
    if (!variables) return

    const task = tasks[variables.id]
    if (task) {
      onFinish(task)
    }
  }, [onFinish, tasks, variables])

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    if (isDisabled) return

    const startedAt = Date.now()
    const task: Task = {
      id: getId(),
      ...value,
      links: fixLinks(value.links),
      checklist: fixChecklist(value.checklist),
      startedAt,
      deadlineAt: deadlineType
        ? getDeadlineAt({ now: startedAt, deadlineType })
        : null,
      order,
    }
    mutate(task)
  }

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
            value={value.projectId}
            onChange={(projectId) =>
              setValue((prev) => ({ ...prev, projectId }))
            }
          />
        </div>

        <TaskNameInput
          placeholder="Task name"
          autoFocus
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <CreateFormFooter
        isPending={isPending}
        isDisabled={isDisabled}
        onCancel={onFinish}
      />
    </Panel>
  )
}
