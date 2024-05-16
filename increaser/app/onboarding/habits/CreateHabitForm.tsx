import { useCreateHabitMutation } from '@increaser/app/habits/api/useCreateHabitMutation'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import { getRandomElement } from '@lib/utils/array/getRandomElement'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { Habit } from '@increaser/entities/Habit'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { Button } from '@lib/ui/buttons/Button'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { useCallback, useState } from 'react'
import { defaultHabitEmojis } from '@increaser/ui/habits/EnhancedHabit'

type HabitFormShape = Pick<Habit, 'name' | 'emoji' | 'color'>

export const CreateHabitForm = () => {
  const { habits } = useHabits()

  const { mutate: createHabit } = useCreateHabitMutation()

  const { usedColors, defaultColorOption } = usePaletteColorOptions(habits)

  const getInitialValue = useCallback(
    () => ({
      name: '',
      emoji: getRandomElement(defaultHabitEmojis),
      color: defaultColorOption,
    }),
    [defaultColorOption],
  )

  const [value, setValue] = useState<HabitFormShape>(getInitialValue)
  const isValid = value.name.length > 0

  return (
    <InputContainer style={{ gap: 8 }} as="div">
      <LabelText size={16}>New habit</LabelText>
      <Panel kind="secondary" style={{ width: '100%' }}>
        <VStack
          gap={28}
          as="form"
          onSubmit={preventDefault(() => {
            if (!isValid) return
            createHabit(value)
            setValue(getInitialValue())
          })}
        >
          <HStack alignItems="center" gap={12}>
            <InputContainer style={{ width: 'fit-content' }} as="div">
              <LabelText>Emoji</LabelText>
              <EmojiInput
                value={value.emoji}
                onChange={(emoji) => setValue({ ...value, emoji })}
              />
            </InputContainer>
            <InputContainer style={{ width: 'fit-content' }} as="div">
              <LabelText>Color</LabelText>
              <ColorLabelInput
                usedValues={new Set(usedColors)}
                value={value.color}
                onChange={(color) => setValue({ ...value, color })}
              />
            </InputContainer>
            <InputContainer>
              <LabelText>Name</LabelText>
              <TextInput
                placeholder="Habit name"
                autoComplete="off"
                value={value.name}
                onChange={(e) => setValue({ ...value, name: e.target.value })}
              />
            </InputContainer>
          </HStack>
          <Button kind="secondary" size="l">
            Create
          </Button>
        </VStack>
      </Panel>
    </InputContainer>
  )
}
