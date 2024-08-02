import { useCallback, useEffect, useState } from 'react'
import { HStack } from '@lib/ui/layout/Stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useCurrentTaskFactory } from '../CurrentTaskFactoryProvider'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { fixLinks } from '../../tasks/form/fixLinks'
import { TaskCadenceInput } from './TaskCadenceInput'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { fixChecklist } from '../../tasks/form/checklist/fixChecklist'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { TaskDescriptionInput } from '../../tasks/form/TaskDescriptionInput'
import { useIsTaskFactoryFormDisabled } from './useIsTaskFactoryFormDisabled'
import { cadenceDefaultDeadlineIndex } from '@increaser/entities-utils/taskFactory/cadenceDefaultDeadlineIndex'
import { doesCadenceSupportDeadlineIndex } from '@increaser/entities-utils/taskFactory/doesCadenceSupportDeadlineIndex'
import { TaskDeadlineIndexInput } from './TaskDeadlineIndexInput'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'

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
          placeholder="Task name"
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
