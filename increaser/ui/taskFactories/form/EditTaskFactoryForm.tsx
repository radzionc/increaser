import { useCallback, useEffect, useState } from 'react'
import { HStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useCurrentTaskFactory } from '../CurrentTaskFactoryProvider'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { fixLinks } from '../../tasks/form/fixLinks'
import { TaskCadenceInput } from './TaskCadenceInput'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { fixChecklist } from '../../tasks/form/checklist/fixChecklist'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { useIsTaskFactoryFormDisabled } from './useIsTaskFactoryFormDisabled'
import { cadenceDefaultDeadlineIndex } from '@increaser/entities-utils/taskFactory/cadenceDefaultDeadlineIndex'
import { doesCadenceSupportDeadlineIndex } from '@increaser/entities-utils/taskFactory/doesCadenceSupportDeadlineIndex'
import { TaskDeadlineIndexInput } from './TaskDeadlineIndexInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { AddTaskLink } from '../../tasks/form/links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from '../../tasks/form/checklist/AddTaskChecklist'

export const EditTaskFactoryForm = () => {
  const taskFactory = useCurrentTaskFactory()
  const [value, setValue] = useState<TaskFactoryFormShape>({
    name: taskFactory.task.name,
    projectId: taskFactory.task.projectId,
    links: taskFactory.task.links ?? [],
    cadence: taskFactory.cadence,
    checklist: taskFactory.task.checklist ?? [],
    description: taskFactory.task.description ?? '',
    deadlineIndex: taskFactory.deadlineIndex ?? null,
  })
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

  const isDisabled = useIsTaskFactoryFormDisabled(value)

  const onSubmit = () => {
    const fields: Partial<Omit<TaskFactory, 'id'>> = {
      task: {
        name: value.name,
        projectId: value.projectId,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
        description: value.description,
      },
      cadence: value.cadence,
      deadlineIndex: value.deadlineIndex,
    }

    updateTaskFactory({
      id: taskFactory.id,
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
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onSubmit={isDisabled ? undefined : onSubmit}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <HStack alignItems="center" gap={8}>
        <TaskCadenceInput
          value={value.cadence}
          onChange={(cadence) => setValue((prev) => ({ ...prev, cadence }))}
        />
        {doesCadenceSupportDeadlineIndex(value.cadence) && (
          <TaskDeadlineIndexInput
            value={value.deadlineIndex}
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
      <EditDeleteFormFooter
        onDelete={() => {
          deleteTaskFactory(taskFactory.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
