import { useCallback, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskNameInput } from '../../tasks/TaskNameInput'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { useIsTaskFormDisabled } from '../../tasks/form/useIsTaskFormDisabled'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useCurrentTaskFactory } from '../CurrentTaskFactoryProvider'
import { useUpdateTaskFactoryMutation } from '../api/useUpdateTaskFactoryMutation'
import { useDeleteTaskFactoryMutation } from '../api/useDeleteTaskFactoryMutation'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { fixLinks } from '../../tasks/form/fixLinks'
import { TaskCadenceInput } from './TaskCadenceInput'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { fixChecklist } from '../../tasks/form/checklist/fixChecklist'
import { EditDeleteFormFooter as EditDeleteFormFooterProps } from '@lib/ui/form/components/EditDeleteFormFooter'

export const EditTaskFactoryForm = () => {
  const taskFactory = useCurrentTaskFactory()
  const [value, setValue] = useState<TaskFactoryFormShape>({
    name: taskFactory.task.name,
    projectId: taskFactory.task.projectId,
    links: taskFactory.task.links ?? [],
    cadence: taskFactory.cadence,
    checklist: taskFactory.task.checklist ?? [],
  })
  const { mutate: updateTaskFactory } = useUpdateTaskFactoryMutation()
  const { mutate: deleteTaskFactory } = useDeleteTaskFactoryMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    const fields: Partial<Omit<TaskFactory, 'id'>> = {
      task: {
        name: value.name,
        projectId: value.projectId,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
      cadence: value.cadence,
    }

    updateTaskFactory({
      id: taskFactory.id,
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
      <TaskNameInput
        placeholder="Task name"
        autoFocus
        onChange={(name) => setValue((prev) => ({ ...prev, name }))}
        value={value.name}
        onSubmit={onSubmit}
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
        <TaskProjectSelector
          value={value.projectId}
          onChange={(projectId) => setValue((prev) => ({ ...prev, projectId }))}
        />
        <TaskCadenceInput
          value={value.cadence}
          onChange={(cadence) => setValue((prev) => ({ ...prev, cadence }))}
        />
      </HStack>
      <EditDeleteFormFooterProps
        onDelete={() => {
          deleteTaskFactory({ id: taskFactory.id })
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
