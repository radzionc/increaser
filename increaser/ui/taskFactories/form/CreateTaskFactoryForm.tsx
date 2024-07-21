import { useCallback, useRef, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { otherProject } from '@increaser/entities/Project'
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
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { TaskDescriptionInput } from '../../tasks/form/TaskDescriptionInput'
import { ExportFromTemplate } from '../../tasks/form/ExportFromTemplate'

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
    description: '',
  })
  const { mutate, isPending } = useCreateTaskFactoryMutation()

  const isDisabled = useIsTaskFactoryFormDisabled(value)

  const onSubmit = useCallback(() => {
    const taskFactory: TaskFactory = {
      id: getId(),
      task: {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
      cadence: value.cadence,
    }
    mutate(taskFactory, {
      onSuccess: () => onFinish(taskFactory.id),
    })
  }, [mutate, onFinish, value])

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

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
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            autoFocus
            value={value.projectId}
            onChange={(projectId) => {
              setValue((prev) => ({ ...prev, projectId }))
              nameInputRef.current?.focus()
            }}
          />
        </div>

        <EmbeddedTitleInput
          placeholder="Task name"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
          ref={nameInputRef}
        />
      </EmojiTextInputFrame>
      <ExportFromTemplate
        projectId={value.projectId}
        onFinish={(template) => {
          setValue((prev) => ({
            ...prev,
            ...template,
            name: prev.name || template.name,
          }))
        }}
      />
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
      </HStack>
      <CreateFormFooter
        isPending={isPending}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
