import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { Task } from '@product/entities/Task'
import { areChecklistItemsEqual } from '@product/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@product/entities-utils/task/links'
import { PanelFormDeleteButton } from '@product/ui/form/panel/PanelFormDeleteButton'
import { useCurrentTask } from '@product/ui/tasks/CurrentTaskProvider'
import { TaskDeadlineInput } from '@product/ui/tasks/deadline/TaskDeadlineInput'
import { TaskFormHeader } from '@product/ui/tasks/form/TaskFormHeader'
import { useUser } from '@product/ui/user/state/user'
import { useDeleteUserEntityMutation } from '@product/ui/userEntity/api/useDeleteUserEntityMutation'
import {
  UpdateUserEntityInput,
  useUpdateUserEntityMutation,
} from '@product/ui/userEntity/api/useUpdateUserEntityMutation'
import { useCallback, useMemo, useState } from 'react'

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
