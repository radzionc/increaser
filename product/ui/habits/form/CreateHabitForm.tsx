import { CancelSubmitFormFooter } from '@lib/ui/form/components/CancelSubmitFormFooter'
import { OnFinishProp } from '@lib/ui/props'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { Habit } from '@product/entities/Habit'
import { getId } from '@product/entities-utils/shared/getId'
import { ListItemForm } from '@product/ui/form/ListItemForm'
import { HabitFormShape } from '@product/ui/habits/form/HabitFormShape'
import { useCreateUserEntityMutation } from '@product/ui/userEntity/api/useCreateUserEntityMutation'
import { useCallback, useState } from 'react'

import { useHabits } from '../hooks/useHabits'

import { HabitFormFields } from './HabitFormFields'
import { useIsHabitFormDisabled } from './useIsHabitFormDisabled'

export const CreateHabitForm = ({
  onFinish,
}: OnFinishProp<Habit, 'optional'>) => {
  const habits = useHabits()
  const [value, setValue] = useState<HabitFormShape>({
    name: '',
    emoji: randomlyPick(defaultEmojis),
  })
  const { mutate } = useCreateUserEntityMutation('habit', {
    onOptimisticUpdate: onFinish,
  })

  const isDisabled = useIsHabitFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    const habit = {
      ...value,
      order: getLastItemOrder(habits.map(({ order }) => order)),
      id: getId(),
      startedAt: Date.now(),
      successes: [],
    }

    mutate(habit)
  }, [habits, isDisabled, mutate, value])

  return (
    <ListItemForm
      onClose={onFinish}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
    >
      <HabitFormFields
        value={value}
        onChange={(value) => setValue((prev) => ({ ...prev, ...value }))}
        onClose={onFinish}
        onSubmit={onFinish}
      />
      <CancelSubmitFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
