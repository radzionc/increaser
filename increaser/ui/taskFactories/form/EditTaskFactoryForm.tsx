import { useCallback, useEffect, useMemo, useState } from 'react'
import { HStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useCurrentTaskFactory } from '../CurrentTaskFactoryProvider'
import { TaskCadenceInput } from './TaskCadenceInput'
import { cadenceDefaultDeadlineIndex } from '@increaser/entities-utils/taskFactory/cadenceDefaultDeadlineIndex'
import { doesCadenceSupportDeadlineIndex } from '@increaser/entities-utils/taskFactory/doesCadenceSupportDeadlineIndex'
import { TaskDeadlineIndexInput } from './TaskDeadlineIndexInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { AddTaskLink } from '../../tasks/form/links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from '../../tasks/form/checklist/AddTaskChecklist'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { Panel } from '@lib/ui/css/panel'
import { Button } from '@lib/ui/buttons/Button'
import { pick } from '@lib/utils/record/pick'

export const EditTaskFactoryForm = () => {
  const taskFactory = useCurrentTaskFactory()
  const { id } = taskFactory
  const initialValue = useMemo(
    () =>
      pick(taskFactory, [
        'cadence',
        'deadlineIndex',
        'checklist',
        'description',
        'links',
        'name',
        'projectId',
      ]),
    [taskFactory],
  )
  const [value, setValue] = useState<TaskFactoryFormShape>(initialValue)
  const { mutate: updateTaskFactory } =
    useUpdateUserEntityMutation('taskFactory')
  const { mutate: deleteTaskFactory } =
    useDeleteUserEntityMutation('taskFactory')

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      deadlineIndex: cadenceDefaultDeadlineIndex[prev.cadence],
    }))
  }, [value.cadence])

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useLazySync<Partial<TaskFactoryFormShape>>({
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
        updateTaskFactory({
          id,
          fields,
        }),
      [id, updateTaskFactory],
    ),
  })

  return (
    <Panel style={{ width: '100%' }} withSections kind="secondary">
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
      />
      <HStack
        alignItems="center"
        gap={20}
        wrap="wrap"
        justifyContent="space-between"
      >
        <HStack alignItems="center" gap={8}>
          <TaskCadenceInput
            value={value.cadence}
            onChange={(cadence) => setValue((prev) => ({ ...prev, cadence }))}
          />
          {doesCadenceSupportDeadlineIndex(value.cadence) && (
            <TaskDeadlineIndexInput
              value={value.deadlineIndex ?? null}
              cadence={value.cadence}
              onChange={(deadlineIndex) =>
                setValue((prev) => ({ ...prev, deadlineIndex }))
              }
            />
          )}
          <AddTaskLink
            onFinish={(link) =>
              setValue((prev) => ({ ...prev, links: [...prev.links, link] }))
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
        <Button
          kind="alert"
          onClick={() => {
            deleteTaskFactory(id)
            onFinish()
          }}
        >
          Delete
        </Button>
      </HStack>
    </Panel>
  )
}
