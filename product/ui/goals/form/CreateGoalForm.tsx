import { HStack } from '@lib/ui/css/stack'
import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { OnFinishProp } from '@lib/ui/props'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { getId } from '@product/entities-utils/shared/getId'
import { ListItemForm } from '@product/ui/form/ListItemForm'
import { useCallback, useState } from 'react'

import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { useGoalStatusFilter } from '../filter/useGoalStatusFilter'

import { GoalFormFields } from './GoalFormFields'
import { GoalFormShape } from './GoalFormShape'
import { useGoalFormCorrector } from './useGoalFormCorrector'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'

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
