import { useCreateHabitMutation } from 'habits/api/useCreateHabitMutation'
import { Controller } from 'react-hook-form'
import { Button } from '@increaser/ui/buttons/Button'
import { ColorLabelInput } from '@increaser/ui/inputs/ColorLabelInput'
import { SameWidthChildrenRow } from '@increaser/ui/Layout/SameWidthChildrenRow'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { useHabitForm } from '../HabitForm/useHabitForm'
import { useHabits } from '../HabitsProvider'
import { ListCard } from 'ui/ListCard'
import { EmojiInput } from 'ui/EmojiInput'
import { MinimalisticTextInput } from 'ui/MinimalisticTextInput'

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
        <SameWidthChildrenRow gap={20}>
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
        </SameWidthChildrenRow>
      </VStack>
    </ListCard>
  )
}
