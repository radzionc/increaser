import { useCallback, useMemo, useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import {
  UpdateUserEntityInput,
  useUpdateUserEntityMutation,
} from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { Panel } from '@lib/ui/css/panel'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { TaskFormHeader } from '@increaser/ui/tasks/form/TaskFormHeader'
import { HStack } from '@lib/ui/css/stack'
import { TaskDeadlineInput } from '@increaser/ui/tasks/deadline/TaskDeadlineInput'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useUser } from '@increaser/ui/user/state/user'
import { useDeleteUserEntityMutation } from '@increaser/ui/userEntity/api/useDeleteUserEntityMutation'
import { PanelFormDeleteButton } from '@increaser/ui/form/panel/PanelFormDeleteButton'
import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'

type TaskFormShape = Pick<
  Task,
  'name' | 'links' | 'checklist' | 'description' | 'projectId' | 'deadlineAt'
>

export const FocusTaskOverview = () => {
  const task = useCurrentTask()

  const { id } = task
  const { tasks } = useUser()

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
  const { mutate: deleteTask } = useDeleteUserEntityMutation('task')

  useLazySync<Partial<UpdateUserEntityInput<'task'>['fields']>>({
    value: useMemo(() => {
      let result: Partial<UpdateUserEntityInput<'task'>['fields']> | undefined =
        getUpdatedValues({
          before: initialValue,
          after: value,
          comparators: {
            links: (one, another) =>
              areArraysEqual(one, another, areLinkItemsEqual),
            checklist: (one, another) =>
              areArraysEqual(one, another, areChecklistItemsEqual),
          },
        })

      if (!result) return result

      if ('deadlineAt' in result) {
        result = {
          ...result,
          deadlineOrder: getLastItemOrder(
            Object.values(tasks)
              .filter((task) => task.deadlineAt === value.deadlineAt)
              .map((task) => task.deadlineOrder),
          ),
        }
      }

      return result
    }, [initialValue, tasks, value]),
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
        <PanelFormDeleteButton
          onClick={() => {
            deleteTask(id)
          }}
        />
      </HStack>
    </Panel>
  )
}
