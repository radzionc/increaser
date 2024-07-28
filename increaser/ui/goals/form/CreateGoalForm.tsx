import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { getId } from '@increaser/entities-utils/shared/getId'
import { Panel } from '@lib/ui/panel/Panel'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { GoalFormShape } from './GoalFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsGoalFormDisabled } from './useIsGoalFormDisabled'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { useCreateUserEntityMutation } from '../../userEntity/api/useCreateUserEntityMutation'
import { goalViewStatus, useGoalsView } from '@increaser/app/goals/GoalsView'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { GoalFormFields } from './GoalFormFields'

export const CreateGoalForm = ({ onFinish }: FinishableComponentProps) => {
  const [view] = useGoalsView()
  const [value, setValue] = useState<GoalFormShape>({
    name: '',
    status: goalViewStatus[view],
    deadlineAt: null,
    emoji: randomlyPick(defaultEmojis),
    target: null,
    plan: '',
    taskFactories: [],
  })
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
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
    >
      <GoalFormFields value={value} onChange={setValue} onSubmit={onSubmit} />
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </Panel>
  )
}
