import { useCallback, useState } from 'react'
import { OptionalValueFinishProps } from '@lib/ui/props'
import { HabitFormShape } from './HabitFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsHabitFormDisabled } from './useIsHabitFormDisabled'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { EmojiColorTextInputFrame } from '@increaser/ui/form/EmojiColorTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { getId } from '@increaser/entities-utils/shared/getId'
import { MS_IN_SEC } from '@lib/utils/time'
import { useCreateUserEntityMutation } from '@increaser/ui/userEntity/api/useCreateUserEntityMutation'
import { ListItemForm } from '@increaser/ui/form/ListItemForm'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EmojiInput } from '@increaser/ui/form/emoji-input/EmojiInput'
import { Habit } from '@increaser/entities/Habit'

export const CreateHabitForm = ({
  onFinish,
}: OptionalValueFinishProps<Habit>) => {
  const { habits } = useHabits()
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
      startedAt: Math.round(Date.now() / MS_IN_SEC),
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
      <EmojiColorTextInputFrame>
        <div>
          <EmojiInput
            value={value.emoji}
            onChange={(emoji) => setValue((prev) => ({ ...prev, emoji }))}
          />
        </div>
        <div>
          <ColorLabelInput
            usedValues={new Set(usedColors)}
            value={value.color}
            onChange={(color) => setValue((prev) => ({ ...prev, color }))}
          />
        </div>
        <EmbeddedTitleInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
          placeholder="Habit name"
        />
      </EmojiColorTextInputFrame>
      <CreateFormFooter onCancel={onFinish} isDisabled={isDisabled} />
    </ListItemForm>
  )
}
