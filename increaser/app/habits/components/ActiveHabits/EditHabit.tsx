import { useUpdateHabitMutation } from '@increaser/app/habits/api/useUpdateHabitMutation'
import { Controller } from 'react-hook-form'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { Button } from '@lib/ui/buttons/Button'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { useCurrentHabit } from '../CurrentHabitProvider'
import { useHabitForm } from '../HabitForm/useHabitForm'
import { useHabits } from '../HabitsProvider'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { MinimalisticTextInput } from '@increaser/app/ui/MinimalisticTextInput'

interface EditHabitProps {
  onFinish: () => void
}

export const EditHabit = ({ onFinish }: EditHabitProps) => {
  const habit = useCurrentHabit()

  const {
    form: { register, handleSubmit, control },
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

  const { mutate: updateHabit } = useUpdateHabitMutation()

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
      <UniformColumnGrid gap={20}>
        <Button size="l" onClick={onFinish} kind="secondary">
          Cancel
        </Button>
        <Button
          size="l"
          onClick={handleSubmit((fields) => {
            updateHabit({
              id: habit.id,
              fields,
            })
            onFinish()
          })}
          kind="reversed"
        >
          Update
        </Button>
      </UniformColumnGrid>
    </VStack>
  )
}
