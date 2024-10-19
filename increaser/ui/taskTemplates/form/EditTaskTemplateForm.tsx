import { useCallback, useMemo, useState } from 'react'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useCurrentTaskTemplate } from '../CurrentTaskTemplateProvider'
import { omit } from '@lib/utils/record/omit'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { HStack } from '@lib/ui/css/stack'
import { AddTaskLink } from '../../tasks/form/links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from '../../tasks/form/checklist/AddTaskChecklist'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { areChecklistItemsEqual } from '@increaser/entities-utils/task/checklist'
import { areLinkItemsEqual } from '@increaser/entities-utils/task/links'
import { areArraysEqual } from '@lib/utils/array/areArraysEqual'
import { Panel } from '@lib/ui/css/panel'
import { PanelFormDeleteButton } from '../../form/panel/PanelFormDeleteButton'
import { NoValueFinishProps } from '@lib/ui/props'

export const EditTaskTemplateForm = ({ onFinish }: NoValueFinishProps) => {
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
      />
      <HStack
        alignItems="center"
        gap={20}
        wrap="wrap"
        justifyContent="space-between"
      >
        <HStack alignItems="center" gap={8}>
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
              deleteTaskTemplate(id)
              onFinish()
            }}
          />
        </HStack>
      </HStack>
    </Panel>
  )
}
