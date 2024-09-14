import { useCallback, useMemo, useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { Panel } from '@lib/ui/css/panel'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { useFocusTargetTask } from '../../../tasks/hooks/useFocusTargetTask'
import { TaskFormHeader } from '@increaser/ui/tasks/form/TaskFormHeader'
import { HStack } from '@lib/ui/css/stack'
import { TaskDeadlineInput } from '@increaser/ui/tasks/deadline/TaskDeadlineInput'
import { AddTaskLink } from '@increaser/ui/tasks/form/links/AddTaskLink'
import { AddTaskChecklist } from '@increaser/ui/tasks/form/checklist/AddTaskChecklist'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useLazySync } from '@lib/ui/hooks/useLazySync'

type TaskFormShape = Pick<
  Task,
  'name' | 'links' | 'checklist' | 'description' | 'projectId' | 'deadlineAt'
>

export const FocusTaskOverview = () => {
  const task = shouldBePresent(useFocusTargetTask())
  const { id } = task

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

  useLazySync<Partial<TaskFormShape>>({
    value: useMemo(
      () =>
        getUpdatedValues({
          before: initialValue,
          after: value,
          comparators: {
            links: (one, another) =>
              areArraysEqual(one, another, areLinkItemsEqual),
            checklist: (one, another) =>
              areArraysEqual(one, another, areChecklistItemsEqual),
          },
        }),
      [initialValue, value],
    ),
    sync: useCallback(
      (fields) =>
        updateTask({
          id,
          fields,
        }),
      [id, updateTask],
    ),
  })

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
