import { useCallback, useState } from 'react'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { TaskTemplateFormShape } from './TaskTemplateFormShape'
import { fixLinks } from '../../tasks/form/fixLinks'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { fixChecklist } from '../../tasks/form/checklist/fixChecklist'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { useCurrentTaskTemplate } from '../CurrentTaskTemplateProvider'
import { omit } from '@lib/utils/record/omit'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useIsTaskTemplateFormDisabled } from './useIsTaskTemplateFormDisabled'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { HStack } from '@lib/ui/css/stack'
import { AddTaskLink } from '../../tasks/form/links/AddTaskLink'

export const EditTaskTemplateForm = () => {
  const taskTemplate = useCurrentTaskTemplate()
  const initialValue = omit(taskTemplate, 'id')
  const [value, setValue] = useState<TaskTemplateFormShape>(initialValue)
  const { mutate: updateTaskTemplate } =
    useUpdateUserEntityMutation('taskTemplate')
  const { mutate: deleteTaskTemplate } =
    useDeleteUserEntityMutation('taskTemplate')

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
    const fields = getUpdatedValues({
      before: initialValue,
      after: newValue,
    })

    updateTaskTemplate({
      id: taskTemplate.id,
      fields,
    })
    onFinish()
  }

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, value }))}
        onSubmit={isDisabled ? undefined : onSubmit}
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <HStack alignItems="center" gap={8}>
        <AddTaskLink
          onFinish={(link) =>
            setValue((prev) => ({ ...prev, links: [...prev.links, link] }))
          }
        />
      </HStack>
      <EditDeleteFormFooter
        onDelete={() => {
          deleteTaskTemplate(taskTemplate.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
