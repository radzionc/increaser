import { useCallback, useState } from 'react'
import { FinishableComponentProps } from '@lib/ui/props'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { HabitNameInput } from './HabitNameInput'
import { HabitFormShape } from './HabitFormShape'
import { randomlyPick } from '@lib/utils/array/randomlyPick'
import { useIsHabitFormDisabled } from './useIsHabitFormDisabled'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { HabitFormHeader } from './HabitFormHeader'
import { randomlyPickOption } from '@lib/utils/array/randomlyPickOption'
import { range } from '@lib/utils/array/range'
import { labelColorsCount } from '@lib/ui/colors/generateLabelColorGetter'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { useCreateHabitMutation } from '../../../api/useCreateHabitMutation'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { defaultEmojis } from '@lib/utils/entities/EntityWithEmoji'

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
      <HabitFormHeader>
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
        <HabitNameInput
          autoFocus
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          value={value.name}
          onSubmit={onSubmit}
        />
      </HabitFormHeader>
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
