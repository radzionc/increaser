import { Panel } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { OnFinishProp } from '@lib/ui/props'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { pick } from '@lib/utils/record/pick'
import { areChecklistItemsEqual } from '@product/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@product/entities-utils/task/links'
import { useCallback, useMemo, useState } from 'react'

import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentTaskFactory } from '../CurrentTaskFactoryProvider'

import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { TaskFactoryScheduleInput } from './TaskFactoryScheduleInput'

export const EditTaskFactoryForm = ({ onFinish }: OnFinishProp) => {
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

      <HStack alignItems="center" gap={20} wrap="wrap">
        <TaskFactoryScheduleInput
          value={value}
          onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        />
        <PanelFormDeleteButton
          onClick={() => {
            deleteTaskFactory(id)
            onFinish()
          }}
        />
      </HStack>
    </Panel>
  )
}
