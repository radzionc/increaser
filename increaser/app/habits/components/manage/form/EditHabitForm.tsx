import { useCallback, useEffect, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { Habit } from '@increaser/entities/Habit'
import { HabitNameInput } from './HabitNameInput'
import { HabitFormShape } from './HabitFormShape'
import { useIsHabitFormDisabled } from './useIsHabitFormDisabled'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { HabitFormHeader } from './HabitFormHeader'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useDeleteHabitMutation } from '../../../api/useDeleteHabitMutation'
import { useUpdateHabitMutation } from '../../../api/useUpdateHabitMutation'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useHabits } from '@increaser/ui/habits/HabitsContext'

export const EditHabitForm = () => {
  const habit = useCurrentHabit()
  const { habits } = useHabits()
  const usedColors = habits.map(({ color }) => color)

  const [value, setValue] = useState<HabitFormShape>({
    name: habit.name,
    emoji: habit.emoji,
    color: habit.color,
  })

  const { mutate: updateHabit } = useUpdateHabitMutation()
  const { mutate: deleteHabit } = useDeleteHabitMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useEffect(() => {
    return () => {
      onFinish()
    }
  }, [onFinish])

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
    <Panel
      withSections
      kind="secondary"
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
      style={{ width: '100%' }}
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
      <HStack
        wrap="wrap"
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={20}
      >
        <Button
          kind="alert"
          type="button"
          onClick={() => {
            deleteHabit({ id: habit.id })
            onFinish()
          }}
        >
          Delete
        </Button>
        <HStack alignItems="center" gap={8}>
          <Button isDisabled={isDisabled} onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
