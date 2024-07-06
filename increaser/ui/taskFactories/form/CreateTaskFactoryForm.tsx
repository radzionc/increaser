import { useCallback, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { otherProject } from '@increaser/entities/Project'
import { TaskNameInput } from '../../tasks/TaskNameInput'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useIsTaskFactoryFormDisabled } from './useIsTaskFactoryFormDisabled'
import { fixLinks } from '../../tasks/form/fixLinks'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { useCreateTaskFactoryMutation } from '../api/useCreateTaskFactoryMutation'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { TaskCadenceInput } from './TaskCadenceInput'
import { TaskChecklistInput } from '../../tasks/form/checklist/TaskChecklistInput'
import { fixChecklist } from '../../tasks/form/checklist/fixChecklist'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'

type CreateTaskFormProps = {
  onFinish: (id?: string) => void
}

export const CreateTaskFactoryForm = ({ onFinish }: CreateTaskFormProps) => {
  const [value, setValue] = useState<TaskFactoryFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    cadence: 'week',
    checklist: [],
  })
  const { mutate } = useCreateTaskFactoryMutation()

  const isDisabled = useIsTaskFactoryFormDisabled(value)

  const onSubmit = useCallback(() => {
    const taskFactory: TaskFactory = {
      id: getId(),
      task: {
        name: value.name,
        projectId: value.projectId,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
      cadence: value.cadence,
    }
    mutate(taskFactory)
    onFinish(taskFactory.id)
  }, [mutate, onFinish, value])

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: () => onFinish(),
        isDisabled,
        onSubmit,
      })}
    >
      <TaskNameInput
        placeholder="Task name"
        autoFocus
        value={value.name}
        onChange={(name) => setValue((prev) => ({ ...prev, name }))}
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
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </Panel>
  )
}
