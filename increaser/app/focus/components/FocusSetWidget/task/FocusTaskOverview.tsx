import { useCallback, useEffect, useMemo, useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { Panel } from '@lib/ui/css/panel'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { fixLinks } from '@increaser/ui/tasks/form/fixLinks'
import { fixChecklist } from '@increaser/ui/tasks/form/checklist/fixChecklist'
import { useFocusTargetTask } from '../../../tasks/hooks/useFocusTargetTask'
import { TaskFormHeader } from '@increaser/ui/tasks/form/TaskFormHeader'
import { HStack } from '@lib/ui/css/stack'
import { TaskDeadlineInput } from '@increaser/ui/tasks/deadline/TaskDeadlineInput'
import { AddTaskLink } from '@increaser/ui/tasks/form/links/AddTaskLink'
import { AddTaskChecklist } from '@increaser/ui/tasks/form/checklist/AddTaskChecklist'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useUnmount } from 'react-use'
import { useValueRef } from '@lib/ui/hooks/useValueRef'

type TaskFormShape = Pick<
  Task,
  'name' | 'links' | 'checklist' | 'description' | 'projectId' | 'deadlineAt'
>

export const FocusTaskOverview = () => {
  const task = shouldBePresent(useFocusTargetTask())

  const initialValue = useMemo(
    () =>
      pick(task, [
        'name',
        'links',
        'checklist',
        'description',
        'projectId',
        'deadlineAt',
      ]),
    [task],
  )

  const [value, setValue] = useState<TaskFormShape>(initialValue)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')

  const changedFields = useMemo(() => {
    return getUpdatedValues({
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
  }, [initialValue, value])
  const changedFieldsRef = useValueRef(changedFields)

  const sync = useCallback(() => {
    const fields = changedFieldsRef.current
    if (!fields) return

    console.log('update task: ', fields)
    updateTask({
      id: task.id,
      fields,
    })
  }, [changedFieldsRef, task.id, updateTask])

  useEffect(() => {
    const timeout = setTimeout(sync, 500)

    return () => clearTimeout(timeout)
  }, [sync, changedFields])

  useUnmount(sync)

  return (
    <Panel withSections kind="secondary">
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
      />
      <HStack alignItems="center" gap={8}>
        <TaskDeadlineInput
          value={value.deadlineAt}
          onChange={(deadlineAt) =>
            setValue((prev) => ({ ...prev, deadlineAt }))
          }
        />
        <AddTaskLink
          onFinish={(value) =>
            setValue((prev) => ({ ...prev, links: [...prev.links, value] }))
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
    </Panel>
  )
}
