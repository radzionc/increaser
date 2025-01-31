import { useCallback, useState } from 'react'
import { OnFinishProp } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { GoalFormShape } from './GoalFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { GoalFormFields } from './GoalFormFields'
import { useGoalStatusFilter } from '../filter/useGoalStatusFilter'
import { ListItemForm } from '@increaser/ui/form/ListItemForm'
import { HStack } from '@lib/ui/css/stack'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useGoalFormCorrector } from './useGoalFormCorrector'

export const CreateGoalForm = ({ onFinish }: OnFinishProp) => {
  const [statusFilter] = useGoalStatusFilter()

  const [value, setValue] = useStateCorrector(
    useState<GoalFormShape>({
      name: '',
      status: statusFilter || 'inProgress',
      deadlineAt: null,
      emoji: randomlyPick(defaultEmojis),
      target: null,
      plan: '',
      taskFactories: [],
      habits: [],
      principles: [],
      vision: [],
    }),
    useGoalFormCorrector(),
  )
  const { mutate } = useCreateUserEntityMutation('goal')

  const isDisabled = useIsGoalFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      id: getId(),
      ...value,
    })
    onFinish()
  }, [isDisabled, mutate, onFinish, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <GoalFormFields
        onClose={onFinish}
        actions={
          <HStack flexGrow justifyContent="end">
            <CancelSubmitFormFooter
              onCancel={onFinish}
              isDisabled={isDisabled}
            />
          </HStack>
        }
        value={value}
        onChange={setValue}
        onSubmit={onSubmit}
      />
    </ListItemForm>
  )
}
