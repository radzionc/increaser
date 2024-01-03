import { useCreateHabitMutation } from '@increaser/app/habits/api/useCreateHabitMutation'
import { HabitInfo } from '@increaser/app/habits/data/habits'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import styled, { useTheme } from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Tag } from '@lib/ui/tags/Tag'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@increaser/app/ui/EmojiTextPrefix'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { useHabits } from '@increaser/ui/habits/HabitsContext'

const Added = styled.div`
  background: transparent;
  ${horizontalPadding(20)}
  height: 40px;
  font-weight: 600px;
  ${centerContent};
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
