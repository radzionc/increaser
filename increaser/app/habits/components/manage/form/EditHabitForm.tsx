import { useCallback, useMemo, useState } from 'react'
import { HabitFormShape } from './HabitFormShape'
import { EmojiColorTextInputFrame } from '@increaser/ui/form/EmojiColorTextInputFrame'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '@increaser/ui/userEntity/api/useDeleteUserEntityMutation'
import { EmojiInput } from '@increaser/ui/form/emoji-input/EmojiInput'
import { pick } from '@lib/utils/record/pick'
import { useLazySync } from '@lib/ui/hooks/useLazySync'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { Panel } from '@lib/ui/css/panel'
import { PanelFormCloseButton } from '@increaser/ui/form/panel/PanelFormCloseButton'
import { HStack } from '@lib/ui/css/stack'
import { Button } from '@lib/ui/buttons/Button'

export const EditHabitForm = () => {
  const habit = useCurrentHabit()
  const { id } = habit
  const { habits } = useHabits()
  const usedColors = habits.map(({ color }) => color)

  const initialValue = useMemo(
    () => pick(habit, ['name', 'emoji', 'color']),
    [habit],
  )

  const [value, setValue] = useState<HabitFormShape>(initialValue)

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')
  const { mutate: deleteHabit } = useDeleteUserEntityMutation('habit')

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useLazySync<Partial<HabitFormShape>>({
    value: useMemo(
      () =>
        getUpdatedValues({
          before: initialValue,
          after: value,
        }),
      [initialValue, value],
    ),
    sync: useCallback(
      (fields) =>
        updateHabit({
          id,
          fields,
        }),
      [id, updateHabit],
    ),
  })

  return (
    <Panel style={{ width: '100%' }} withSections kind="secondary">
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
          placeholder="Habit name"
        />
        <PanelFormCloseButton onClick={onFinish} />
      </EmojiColorTextInputFrame>
      <HStack fullWidth>
        <Button
          kind="alert"
          type="button"
          onClick={() => {
            deleteHabit(id)
            onFinish()
          }}
        >
          Delete
        </Button>
      </HStack>
    </Panel>
  )
}
