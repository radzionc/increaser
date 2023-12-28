import { useCreateHabitMutation } from '@increaser/app/habits/api/useCreateHabitMutation'
import { Controller } from 'react-hook-form'
import { Button } from '@lib/ui/buttons/Button'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { useHabitForm } from '../HabitForm/useHabitForm'
import { useHabits } from '../HabitsProvider'
import { ListCard } from '@increaser/app/ui/ListCard'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { MinimalisticTextInput } from '@increaser/app/ui/MinimalisticTextInput'

interface CreateHabitCardProps {
  onFinish: () => void
}

export const CreateHabitCard = ({ onFinish }: CreateHabitCardProps) => {
  const {
    form: { register, handleSubmit, control },
  } = useHabitForm()
  const { habits } = useHabits()
  const usedColors = new Set((habits || []).map(({ color }) => color))
  const { mutateAsync: createHabit } = useCreateHabitMutation()

  return (
    <ListCard>
      <VStack gap={20}>
        <Text color="supporting" size={18} weight="semibold">
          New habit
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
                usedValues={usedColors}
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
            onClick={handleSubmit((habit) => {
              createHabit(habit)
              onFinish()
            })}
            kind="reversed"
          >
            Create
          </Button>
        </UniformColumnGrid>
      </VStack>
    </ListCard>
  )
}
