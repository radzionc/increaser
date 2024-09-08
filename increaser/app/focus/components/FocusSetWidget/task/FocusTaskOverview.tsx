import { useEffect, useMemo, useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useIsTaskFormDisabled } from '@increaser/ui/tasks/form/useIsTaskFormDisabled'
import { Panel } from '@lib/ui/css/panel'
import { TaskLinksInput } from '@increaser/ui/tasks/form/TaskLinksInput'
import { TaskChecklistInput } from '@increaser/ui/tasks/form/checklist/TaskChecklistInput'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { fixLinks } from '@increaser/ui/tasks/form/fixLinks'
import { fixChecklist } from '@increaser/ui/tasks/form/checklist/fixChecklist'
import { useFocusTargetTask } from '../../../tasks/hooks/useFocusTargetTask'
import { TaskFormHeader } from '@increaser/ui/tasks/form/TaskFormHeader'

type TaskFormShape = Pick<
  Task,
  'name' | 'links' | 'checklist' | 'description' | 'projectId'
>

export const FocusTaskOverview = () => {
  const task = shouldBePresent(useFocusTargetTask())

  const initialValue = useMemo(
    () =>
      pick(task, ['name', 'links', 'checklist', 'description', 'projectId']),
    [task],
  )

  const [value, setValue] = useState<TaskFormShape>(initialValue)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const isDisabled = useIsTaskFormDisabled(value)

  useEffect(() => {
    if (isDisabled) {
      return
    }

    const newFields = getUpdatedValues({
      before: initialValue,
      after: {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
      comparators: {
        links: (one, another) =>
          areArraysEqual(one, another, areLinkItemsEqual),
        checklist: (one, another) =>
          areArraysEqual(one, another, areChecklistItemsEqual),
      },
    })

    if (isRecordEmpty(newFields)) {
      return
    }

    const timeout = setTimeout(() => {
      console.log('update task', newFields)
      updateTask({
        id: task.id,
        fields: newFields,
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [initialValue, isDisabled, task.id, updateTask, value])

  return (
    <Panel withSections kind="secondary">
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
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
