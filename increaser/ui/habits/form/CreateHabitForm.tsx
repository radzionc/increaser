import { useCallback, useState } from 'react'
import { OptionalValueFinishProps } from '@lib/ui/props'
import { HabitFormShape } from '@increaser/ui/habits/form/HabitFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsHabitFormDisabled } from './useIsHabitFormDisabled'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { getId } from '@increaser/entities-utils/shared/getId'
import { useCreateUserEntityMutation } from '@increaser/ui/userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '@increaser/ui/form/ListItemForm'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { Habit } from '@increaser/entities/Habit'
import { HabitFormFields } from './HabitFormFields'
import { useHabits } from '../hooks/useHabits'

export const CreateHabitForm = ({
  onFinish,
}: OptionalValueFinishProps<Habit>) => {
  const habits = useHabits()
  const usedColors = habits.map(({ color }) => color)
  const [value, setValue] = useState<HabitFormShape>({
    name: '',
    emoji: randomlyPick(defaultEmojis),
    color: randomlyPickOption({
      options: range(labelColorsCount),
      used: usedColors,
    }),
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
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
