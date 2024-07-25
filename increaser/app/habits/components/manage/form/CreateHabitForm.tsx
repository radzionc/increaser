import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { HabitFormShape } from './HabitFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsHabitFormDisabled } from './useIsHabitFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { useCreateHabitMutation } from '../../../api/useCreateHabitMutation'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'
import { EmojiColorTextInputFrame } from '@increaser/ui/form/EmojiColorTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { getId } from '@increaser/entities-utils/shared/getId'
import { MS_IN_SEC } from '@lib/utils/time'

export const CreateHabitForm = ({ onFinish }: FinishableComponentProps) => {
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
  const { mutate } = useCreateHabitMutation()

  const isDisabled = useIsHabitFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) return

    mutate({
      ...value,
      order: getLastItemOrder(habits.map(({ order }) => order)),
      id: getId(),
      startedAt: Math.round(Date.now() / MS_IN_SEC),
      successes: [],
    })
    onFinish()
  }, [habits, isDisabled, mutate, onFinish, value])

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
      <HStack justifyContent="space-between" fullWidth alignItems="center">
        <div />
        <HStack alignItems="center" gap={8}>
          <Button type="button" onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Submit</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
