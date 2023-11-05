import { useCreateHabitMutation } from 'habits/api/useCreateHabitMutation'
import { HabitInfo } from 'habits/data/habits'
import { usePaletteColorOptions } from 'shared/hooks/usePaletteColorOptions'
import styled, { useTheme } from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { CheckIcon } from '@increaser/ui/icons/CheckIcon'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Tag } from '@increaser/ui/ui/Tag'
import { Text } from '@increaser/ui/ui/Text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getHorizontalPaddingCSS } from '@increaser/ui/ui/utils/getHorizontalPaddingCSS'

import { useHabits } from '../HabitsProvider'

const Added = styled.div`
  background: transparent;
  ${getHorizontalPaddingCSS(20)}
  height: 40px;
  font-weight: 600px;
  ${centerContentCSS};
`

interface HabitItemTag {
  name: string
  color: number
}

interface HabitItemProps extends HabitInfo {
  tags: HabitItemTag[]
}

const Container = styled(VStack)`
  min-width: 320px;
`

export const HabitItem = ({
  name,
  emoji,
  description,
  tags,
}: HabitItemProps) => {
  const { habits } = useHabits()
  const habitsNames = new Set(habits.map((habit) => habit.name))
  const isHabitAdded = habitsNames.has(name)

  const {
    colors: { getLabelColor },
  } = useTheme()

  const { mutate: createHabit } = useCreateHabitMutation()
  const { defaultColorOption } = usePaletteColorOptions(habits)

  return (
    <Container gap={8}>
      <HStack alignItems="start" gap={8} justifyContent="space-between">
        <VStack gap={4}>
          <Text weight="bold">
            <EmojiTextPrefix emoji={emoji} />
            {name}
          </Text>
          <HStack gap={8} wrap="wrap">
            {tags.map(({ color, name }) => (
              <Tag $color={getLabelColor(color)} key={name}>
                {name}
              </Tag>
            ))}
          </HStack>
        </VStack>
        {isHabitAdded ? (
          <Added as="div">
            <HStack alignItems="center" gap={4}>
              <CheckIcon />
              Added
            </HStack>
          </Added>
        ) : (
          <Button
            onClick={() => {
              createHabit({ name, emoji, color: defaultColorOption })
            }}
            isRounded
            kind="secondary"
          >
            Add
          </Button>
        )}
      </HStack>

      <Text size={14} color="supporting">
        {description}
      </Text>
    </Container>
  )
}
