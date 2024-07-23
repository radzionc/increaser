import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { useUpdateTaskTemplateMutation } from '../api/useUpdateTaskTemplateMutation'
import { useDeleteTaskTemplateMutation } from '../api/useDeleteTaskTemplateMutation'
import { fixLinks } from '../../tasks/form/fixLinks'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { fixChecklist } from '../../tasks/form/checklist/fixChecklist'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { TaskDescriptionInput } from '../../tasks/form/TaskDescriptionInput'
import { useCurrentTaskTemplate } from '../CurrentTaskTemplateProvider'
import { omit } from '@lib/utils/record/omit'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'

export const EditTaskTemplateForm = () => {
  const taskTemplate = useCurrentTaskTemplate()
  const initialValue = omit(taskTemplate, 'id')
  const [value, setValue] = useState<TaskTemplateFormShape>(initialValue)
  const { mutate: updateTaskTemplate } = useUpdateTaskTemplateMutation()
  const { mutate: deleteTaskTemplate } = useDeleteTaskTemplateMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsTaskTemplateFormDisabled(value)

  const onSubmit = () => {
    const newValue = {
      ...value,
      links: fixLinks(value.links),
      checklist: fixChecklist(value.checklist),
    }
    const fields = getUpdatedValues(initialValue, newValue)

    updateTaskTemplate({
      id: taskTemplate.id,
      fields,
    })
    onFinish()
  }

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      style={{ width: '100%' }}
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
    >
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            value={value.projectId}
            onChange={(projectId) =>
              setValue((prev) => ({ ...prev, projectId }))
            }
          />
        </div>

        <EmbeddedTitleInput
          autoFocus
          placeholder="Task template name"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <TaskDescriptionInput
        value={value.description}
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <EditDeleteFormFooter
        onDelete={() => {
          deleteTaskTemplate({ id: taskTemplate.id })
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
