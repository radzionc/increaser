import { useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { FinishableComponentProps } from '@lib/ui/props'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useFocusTask } from '../../../tasks/useFocusTask'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useIsTaskFormDisabled } from '@increaser/ui/tasks/form/useIsTaskFormDisabled'
import { fixLinks } from '@increaser/ui/tasks/form/fixLinks'
import { fixChecklist } from '@increaser/ui/tasks/form/checklist/fixChecklist'
import { Panel } from '@lib/ui/css/panel'
import { TaskDescriptionInput } from '@increaser/ui/tasks/form/TaskDescriptionInput'
import { TaskLinksInput } from '@increaser/ui/tasks/form/TaskLinksInput'
import { TaskChecklistInput } from '@increaser/ui/tasks/form/checklist/TaskChecklistInput'

type EditTaskFormContentProps = FinishableComponentProps

type TaskFormShape = Pick<Task, 'name' | 'links' | 'checklist' | 'description'>

export const FocusTaskOverview = ({ onFinish }: EditTaskFormContentProps) => {
  const task = shouldBePresent(useFocusTask())

  const initialValue = pick(task, ['name', 'links', 'checklist', 'description'])

  const [value, setValue] = useState<TaskFormShape>(initialValue)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    if (isDisabled) {
      return
    }

    const newFields: Partial<Omit<Task, 'id'>> = getUpdatedValues(
      initialValue,
      {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
    )

    updateTask({
      id: task.id,
      fields: newFields,
    })
    onFinish()
  }

  return (
    <Panel withSections kind="secondary">
      <EmbeddedTitleInput
        placeholder="Task name"
        value={value.name}
        onChange={(name) => setValue((prev) => ({ ...prev, name }))}
        onSubmit={onSubmit}
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
    </Panel>
  )
}
