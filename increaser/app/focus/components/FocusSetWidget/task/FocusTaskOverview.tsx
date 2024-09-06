import { useEffect, useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useFocusTask } from '../../../tasks/useFocusTask'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useIsTaskFormDisabled } from '@increaser/ui/tasks/form/useIsTaskFormDisabled'
import { Panel } from '@lib/ui/css/panel'
import { TaskDescriptionInput } from '@increaser/ui/tasks/form/TaskDescriptionInput'
import { TaskLinksInput } from '@increaser/ui/tasks/form/TaskLinksInput'
import { TaskChecklistInput } from '@increaser/ui/tasks/form/checklist/TaskChecklistInput'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

type TaskFormShape = Pick<Task, 'name' | 'links' | 'checklist' | 'description'>

export const FocusTaskOverview = () => {
  const task = shouldBePresent(useFocusTask())

  const initialValue = pick(task, ['name', 'links', 'checklist', 'description'])

  const [value, setValue] = useState<TaskFormShape>(initialValue)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const isDisabled = useIsTaskFormDisabled(value)

  useEffect(() => {
    if (isDisabled) {
      return
    }

    const newFields: Partial<Omit<Task, 'id'>> = getUpdatedValues(
      initialValue,
      value,
    )

    if (isRecordEmpty(newFields)) {
      return
    }

    const timeout = setTimeout(() => {
      console.log('update task fields', newFields)
      updateTask({
        id: task.id,
        fields: newFields,
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [initialValue, isDisabled, task.id, updateTask, value])

  return (
    <Panel withSections kind="secondary">
      <EmbeddedTitleInput
        placeholder="Task name"
        value={value.name}
        onChange={(name) => setValue((prev) => ({ ...prev, name }))}
      />
      <TaskDescriptionInput
        value={value.description}
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => {
          console.log('change links')
          setValue((prev) => ({ ...prev, links }))
        }}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
    </Panel>
  )
}
