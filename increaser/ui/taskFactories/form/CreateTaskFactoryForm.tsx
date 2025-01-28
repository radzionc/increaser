import { useCallback, useEffect, useState } from 'react'
import { getId } from '@increaser/entities-utils/shared/getId'
import { HStack } from '@lib/ui/css/stack'
import { otherProject } from '@increaser/entities/Project'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useIsTaskFactoryFormDisabled } from './useIsTaskFactoryFormDisabled'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { cadenceDefaultDeadlineIndex } from '@increaser/entities-utils/taskFactory/cadenceDefaultDeadlineIndex'
import { FirstTaskDeadlineForecast } from './FirstTaskDeadlineForecast'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { InitialValueProp, OnFinishOptionalValueProp } from '@lib/ui/props'
import { TaskFactoryScheduleInput } from './TaskFactoryScheduleInput'

const defaultCadence = 'week'

export const CreateTaskFactoryForm: React.FC<
  Partial<InitialValueProp<Partial<TaskFactoryFormShape>>> &
    Partial<OnFinishOptionalValueProp<TaskFactory>>
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
        onClose={onFinish}
      />
      <HStack alignItems="center" gap={20} wrap="wrap">
        <TaskFactoryScheduleInput
          value={value}
          onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        />
        <FirstTaskDeadlineForecast
          cadence={value.cadence}
          deadlineIndex={value.deadlineIndex ?? null}
        />
      </HStack>
      <CancelSubmitFormFooter
        isPending={isPending}
        onCancel={() => onFinish?.()}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
