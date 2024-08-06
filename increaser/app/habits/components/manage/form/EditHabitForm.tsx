import { useCallback, useState } from 'react'
import { Habit } from '@increaser/entities/Habit'
import { HabitFormShape } from './HabitFormShape'
import { useIsHabitFormDisabled } from './useIsHabitFormDisabled'
import { EmojiColorTextInputFrame } from '@increaser/ui/form/EmojiColorTextInputFrame'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '@increaser/ui/userEntity/api/useDeleteUserEntityMutation'
import { ListItemForm } from '@increaser/ui/form/ListItemForm'
import { EditDeleteFormFooter } from '@lib/ui/form/components/EditDeleteFormFooter'
import { EmojiInput } from '@increaser/ui/form/emoji-input/EmojiInput'

export const EditHabitForm = () => {
  const habit = useCurrentHabit()
  const { habits } = useHabits()
  const usedColors = habits.map(({ color }) => color)

  const [value, setValue] = useState<HabitFormShape>({
    name: habit.name,
    emoji: habit.emoji,
    color: habit.color,
  })

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')
  const { mutate: deleteHabit } = useDeleteUserEntityMutation('habit')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  const isDisabled = useIsHabitFormDisabled(value)

  const onSubmit = useCallback(() => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Habit, 'id'>> = {}
    if (value.name !== habit.name) {
      fields.name = value.name
    }
    if (value.color !== habit.color) {
      fields.color = value.color
    }
    if (value.emoji !== habit.emoji) {
      fields.emoji = value.emoji
    }

    updateHabit({
      id: habit.id,
      fields,
    })
    onFinish()
  }, [habit, isDisabled, onFinish, updateHabit, value])

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
      <EditDeleteFormFooter
        onDelete={() => {
          deleteHabit(habit.id)
          onFinish()
        }}
        onCancel={onFinish}
        isDisabled={isDisabled}
      />
    </ListItemForm>
  )
}
