import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { OnFinishProp } from '@lib/ui/props'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { areChecklistItemsEqual } from '@product/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@product/entities-utils/task/links'
import { useUser } from '@product/ui/user/state/user'
import { useCallback, useMemo, useState } from 'react'

import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import {
  UpdateUserEntityInput,
  useUpdateUserEntityMutation,
} from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentTask } from '../CurrentTaskProvider'
import { TaskDeadlineInput } from '../deadline/TaskDeadlineInput'
import { StartTaskFocus } from '../focus/StartTaskFocus'

import { TaskFormHeader } from './TaskFormHeader'
import { TaskFormShape } from './TaskFormShape'
import { TaskStatusInput } from './TaskStatusInput'

type EditTaskFormContentProps = OnFinishProp

export const EditTaskFormContent = ({ onFinish }: EditTaskFormContentProps) => {
  const task = useCurrentTask()
  const { id } = task
  const initialValue = pick(task, [
    'name',
    'projectId',
    'links',
    'checklist',
    'description',
    'deadlineAt',
    'status',
  ])
  const [value, setValue] = useState<TaskFormShape>(initialValue)
  const { tasks } = useUser()

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

      if ('status' in result) {
        result = {
          ...result,
          order: getLastItemOrder(
            Object.values(tasks)
              .filter((task) => task.status === value.status)
              .map((task) => task.order),
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
    <Panel style={{ width: '100%' }} withSections kind="secondary">
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />

      <HStack alignItems="center" gap={8}>
        <TaskStatusInput
          value={value.status}
          onChange={(status) => setValue((prev) => ({ ...prev, status }))}
        />
        <TaskDeadlineInput
          value={value.deadlineAt}
          onChange={(deadlineAt) =>
            setValue((prev) => ({ ...prev, deadlineAt }))
          }
        />
        <StartTaskFocus onFinish={onFinish} />
        <PanelFormDeleteButton
          onClick={() => {
            deleteTask(id)
            onFinish()
          }}
        />
      </HStack>
    </Panel>
  )
}
