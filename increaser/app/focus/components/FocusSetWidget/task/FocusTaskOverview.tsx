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
import { AddTaskLink } from '@increaser/ui/tasks/form/links/AddTaskLink'
import { AddTaskChecklist } from '@increaser/ui/tasks/form/checklist/AddTaskChecklist'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useUser } from '@increaser/ui/user/state/user'
import { useDeleteUserEntityMutation } from '@increaser/ui/userEntity/api/useDeleteUserEntityMutation'
import { PanelFormDeleteButton } from '@increaser/ui/form/panel/PanelFormDeleteButton'
import { TaskTemplatesWidget } from '@increaser/ui/taskTemplates/widget/TaskTemplatesWidget'
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
    <Panel style={{ gap: 0 }} withSections kind="secondary">
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
        <TaskTemplatesWidget
          onChange={(template) =>
            setValue((prev) => ({ ...prev, ...template }))
          }
          value={value}
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
        <PanelFormDeleteButton
          onClick={() => {
            deleteTask(id)
          }}
        />
      </HStack>
    </Panel>
  )
}
