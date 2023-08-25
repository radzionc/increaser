import { Controller } from 'react-hook-form'
import { usePaletteColorOptions } from 'shared/hooks/usePaletteColorOptions'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { ColorLabelInput } from '@increaser/ui/ui/inputs/ColorLabelInput'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { useCurrentHabit } from '../CurrentHabitProvider'
import { useHabitForm } from '../HabitForm/useHabitForm'
import { useHabits } from '../HabitsProvider'
import { EmojiInput } from 'ui/EmojiInput'
import { MinimalisticTextInput } from 'ui/MinimalisticTextInput'

interface EditHabitProps {
  onFinish: () => void
}

export const EditHabit = ({ onFinish }: EditHabitProps) => {
  const habit = useCurrentHabit()

  const {
    form: { register, control },
  } = useHabitForm({
    initialValues: {
      name: habit.name,
      emoji: habit.emoji,
      color: habit.color,
    },
  })

  const { habits } = useHabits()
  const { usedColors } = usePaletteColorOptions(
    habits.filter((habit) => habit.id !== habit.id),
  )

  return (
    <VStack gap={20}>
      <Text color="supporting" size={18} weight="semibold">
        Edit habit
      </Text>
      <HStack wrap="wrap" alignItems="center" gap={8}>
        <Controller
          control={control}
          name="emoji"
          render={({ field: { value, onChange } }) => (
            <EmojiInput value={value} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="color"
          render={({ field: { value, onChange } }) => (
            <ColorLabelInput
              usedValues={new Set(usedColors)}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <MinimalisticTextInput
          autoFocus
          placeholder="Habit name"
          {...register('name', { required: true })}
        />
      </HStack>
      <SameWidthChildrenRow gap={20}>
        <Button size="l" onClick={onFinish} kind="secondary">
          Cancel
        </Button>
        <Button size="l" kind="reversed">
          Update
        </Button>
      </SameWidthChildrenRow>
    </VStack>
  )
}
