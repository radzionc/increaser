import { useCallback, useMemo, useState } from 'react'
import { HStack } from '@lib/ui/css/stack'
import { useCurrentTask } from '../CurrentTaskProvider'
import { TaskDeadlineInput } from '../deadline/TaskDeadlineInput'
import { TaskFormShape } from './TaskFormShape'
import { NoValueFinishProps } from '@lib/ui/props'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import {
  UpdateUserEntityInput,
  useUpdateUserEntityMutation,
} from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { TaskStatusInput } from './TaskStatusInput'
import { TaskFormHeader } from './TaskFormHeader'
import { AddTaskLink } from './links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from './checklist/AddTaskChecklist'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { Panel } from '@lib/ui/css/panel'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useUser } from '@increaser/ui/user/state/user'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { TaskTemplatesWidget } from '../../taskTemplates/widget/TaskTemplatesWidget'

type EditTaskFormContentProps = NoValueFinishProps

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
    <Panel style={{ width: '100%', gap: 0 }} withSections kind="secondary">
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />
      <HStack
        alignItems="center"
        gap={20}
        wrap="wrap"
        justifyContent="space-between"
      >
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
          <AddTaskLink
            onFinish={(link) =>
              setValue((prev) => ({ ...prev, links: [...prev.links, link] }))
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
              onFinish()
            }}
          />
        </HStack>
      </HStack>
    </Panel>
  )
}
