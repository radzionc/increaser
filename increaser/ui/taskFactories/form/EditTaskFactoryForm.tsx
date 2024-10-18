import { useCallback, useMemo, useState } from 'react'
import { HStack } from '@lib/ui/css/stack'
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
import { pick } from '@lib/utils/record/pick'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { NoValueFinishProps } from '@lib/ui/props'

export const EditTaskFactoryForm = ({ onFinish }: NoValueFinishProps) => {
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
            onChange={(cadence) => {
              const deadlineIndex = cadenceDefaultDeadlineIndex[cadence]
              return setValue((prev) => ({ ...prev, cadence, deadlineIndex }))
            }}
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
          <PanelFormDeleteButton
            onClick={() => {
              deleteTaskFactory(id)
              onFinish()
            }}
          />
        </HStack>
      </HStack>
    </Panel>
  )
}
