import { Panel } from '@lib/ui/css/panel'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { OnFinishProp } from '@lib/ui/props'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { omit } from '@lib/utils/record/omit'
import { areChecklistItemsEqual } from '@product/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@product/entities-utils/task/links'
import { useCallback, useMemo, useState } from 'react'

import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useCurrentTaskTemplate } from '../CurrentTaskTemplateProvider'

import { TaskTemplateFormShape } from './TaskTemplateFormShape'

export const EditTaskTemplateForm = ({ onFinish }: OnFinishProp) => {
  const taskTemplate = useCurrentTaskTemplate()
  const { id } = taskTemplate
  const initialValue = useMemo(() => omit(taskTemplate, 'id'), [taskTemplate])
  const [value, setValue] = useState<TaskTemplateFormShape>(initialValue)
  const { mutate: updateTaskTemplate } =
    useUpdateUserEntityMutation('taskTemplate')
  const { mutate: deleteTaskTemplate } =
    useDeleteUserEntityMutation('taskTemplate')

  useLazySync<Partial<TaskTemplateFormShape>>({
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
        updateTaskTemplate({
          id,
          fields,
        }),
      [id, updateTaskTemplate],
    ),
  })

  return (
    <Panel style={{ width: '100%' }} withSections kind="secondary">
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />
      <div>
        <PanelFormDeleteButton
          onClick={() => {
            deleteTaskTemplate(id)
            onFinish()
          }}
        />
      </div>
    </Panel>
  )
}
