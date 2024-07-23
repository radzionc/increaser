import { useCallback, useEffect, useRef, useState } from 'react'
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
import { cadenceDefaultDeadlineIndex } from '@increaser/entities-utils/taskFactory/cadenceDefaultDeadlineIndex'
import { TaskDeadlineIndexInput } from './TaskDeadlineIndexInput'
import { doesCadenceSupportDeadlineIndex } from '@increaser/entities-utils/taskFactory/doesCadenceSupportDeadlineIndex'
import { FirstTaskDeadlineForecast } from './FirstTaskDeadlineForecast'

type CreateTaskFormProps = {
  onFinish?: (id?: string) => void
  onMutationFinish?: (id?: string) => void
}

const defaultCadence = 'week'

export const CreateTaskFactoryForm = ({
  onFinish,
  onMutationFinish,
}: CreateTaskFormProps) => {
  const [value, setValue] = useState<TaskFactoryFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    cadence: defaultCadence,
    checklist: [],
    description: '',
    deadlineIndex: cadenceDefaultDeadlineIndex[defaultCadence],
  })
  const { mutate, isPending } = useCreateTaskFactoryMutation()

  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      deadlineIndex: cadenceDefaultDeadlineIndex[prev.cadence],
    }))
  }, [value.cadence])

  const isDisabled = useIsTaskFactoryFormDisabled(value)

  const onSubmit = useCallback(() => {
    const taskFactory: TaskFactory = {
      id: getId(),
      task: {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
      deadlineIndex: value.deadlineIndex,
      cadence: value.cadence,
    }
    onFinish?.(taskFactory.id)
    mutate(taskFactory, {
      onSuccess: () => onMutationFinish?.(taskFactory.id),
    })
  }, [mutate, onFinish, onMutationFinish, value])

  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: () => onFinish?.(),
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
      <HStack alignItems="center" gap={20} wrap="wrap">
        <HStack gap={8}>
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
        <FirstTaskDeadlineForecast
          cadence={value.cadence}
          deadlineIndex={value.deadlineIndex}
        />
      </HStack>
      <CreateFormFooter
        isPending={isPending}
        onCancel={() => onFinish?.()}
        isDisabled={isDisabled}
      />
    </Panel>
  )
}
