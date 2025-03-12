import { HStack } from '@lib/ui/css/stack'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { InitialValueProp, OnFinishProp } from '@lib/ui/props'
import { otherProject } from '@product/entities/Project'
import { TaskFactory } from '@product/entities/TaskFactory'
import { getId } from '@product/entities-utils/shared/getId'
import { cadenceDefaultDeadlineIndex } from '@product/entities-utils/taskFactory/cadenceDefaultDeadlineIndex'
import { useCallback, useEffect, useState } from 'react'

import { ListItemForm } from '../../form/ListItemForm'
import { TaskFormHeader } from '../../tasks/form/TaskFormHeader'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'

import { FirstTaskDeadlineForecast } from './FirstTaskDeadlineForecast'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { TaskFactoryScheduleInput } from './TaskFactoryScheduleInput'
import { useIsTaskFactoryFormDisabled } from './useIsTaskFactoryFormDisabled'

const defaultCadence = 'week'

export const CreateTaskFactoryForm: React.FC<
  Partial<InitialValueProp<Partial<TaskFactoryFormShape>>> &
    Partial<OnFinishProp<TaskFactory, 'optional'>>
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
