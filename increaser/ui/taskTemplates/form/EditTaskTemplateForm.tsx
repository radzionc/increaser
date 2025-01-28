import { useCallback, useMemo, useState } from 'react'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useCurrentTaskTemplate } from '../CurrentTaskTemplateProvider'
import { omit } from '@lib/utils/record/omit'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { Panel } from '@lib/ui/css/panel'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { OnFinishNoValueProp } from '@lib/ui/props'

export const EditTaskTemplateForm = ({ onFinish }: OnFinishNoValueProp) => {
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
