import { useCallback, useEffect, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { HStack } from '@lib/ui/css/stack'
import { otherProject } from '@increaser/entities/Project'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useIsTaskFactoryFormDisabled } from './useIsTaskFactoryFormDisabled'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { TaskCadenceInput } from './TaskCadenceInput'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { ExportFromTemplate } from '../../tasks/form/ExportFromTemplate'
import { cadenceDefaultDeadlineIndex } from '@increaser/entities-utils/taskFactory/cadenceDefaultDeadlineIndex'
import { TaskDeadlineIndexInput } from './TaskDeadlineIndexInput'
import { doesCadenceSupportDeadlineIndex } from '@increaser/entities-utils/taskFactory/doesCadenceSupportDeadlineIndex'
import { FirstTaskDeadlineForecast } from './FirstTaskDeadlineForecast'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { AddTaskLink } from '../../tasks/form/links/AddTaskLink'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskChecklist } from '../../tasks/form/checklist/AddTaskChecklist'
import {
  ComponentWithInitialValueProps,
  OptionalValueFinishProps,
} from '@lib/ui/props'
import { TaskTemplatesWidget } from '../../taskTemplates/widget/TaskTemplatesWidget'

const defaultCadence = 'week'

export const CreateTaskFactoryForm: React.FC<
  Partial<ComponentWithInitialValueProps<Partial<TaskFactoryFormShape>>> &
    Partial<OptionalValueFinishProps<TaskFactory>>
> = ({ onFinish, initialValue }) => {
  const [value, setValue] = useState<TaskFactoryFormShape>({
    name: '',
    projectId: otherProject.id,
    links: [],
    cadence: defaultCadence,
    checklist: [],
    description: '',
    deadlineIndex: cadenceDefaultDeadlineIndex[defaultCadence],
    ...initialValue,
  })
  const { mutate, isPending } = useCreateUserEntityMutation('taskFactory', {
    onOptimisticUpdate: onFinish,
  })

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
      ...value,
    }
    mutate(taskFactory)
  }, [mutate, value])

  return (
    <ListItemForm
      onClose={() => onFinish?.()}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <TaskFormHeader
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onSubmit={isDisabled ? undefined : onSubmit}
        hasProjectAutoFocus={!initialValue?.projectId}
      />
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
      <HStack alignItems="center" gap={20} wrap="wrap">
        <HStack gap={8}>
          <TaskCadenceInput
            value={value.cadence}
            onChange={(cadence) => setValue((prev) => ({ ...prev, cadence }))}
          />
          {doesCadenceSupportDeadlineIndex(value.cadence) && (
            <TaskDeadlineIndexInput
              value={value.deadlineIndex ?? null}
              cadence={value.cadence}
              onChange={(deadlineIndex) =>
                setValue((prev) => ({ ...prev, deadlineIndex }))
              }
            />
          )}
        </HStack>
        <FirstTaskDeadlineForecast
          cadence={value.cadence}
          deadlineIndex={value.deadlineIndex ?? null}
        />
      </HStack>
      <HStack
        wrap="wrap"
        fullWidth
        alignItems="center"
        gap={20}
        justifyContent="space-between"
      >
        <HStack gap={8}>
          <AddTaskLink
            onFinish={(link) =>
              setValue((prev) => ({ ...prev, links: [...prev.links, link] }))
            }
          />

          <TaskTemplatesWidget projectId={value.projectId} />

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

        <CreateFormFooter
          isPending={isPending}
          onCancel={() => onFinish?.()}
          isDisabled={isDisabled}
        />
      </HStack>
    </ListItemForm>
  )
}
