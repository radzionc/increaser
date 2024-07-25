import { useCreateHabitMutation } from '@increaser/app/habits/api/useCreateHabitMutation'
import { HabitInfo, habitTagColors } from '@increaser/app/habits/data/habits'
import { usePaletteColorOptions } from '@increaser/app/shared/hooks/usePaletteColorOptions'
import styled, { useTheme } from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Tag } from '@lib/ui/tags/Tag'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { ComponentWithValueProps } from '@lib/ui/props'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { MS_IN_SEC } from '@lib/utils/time'
import { getId } from '@increaser/entities-utils/shared/getId'

const Added = styled.div`
  background: transparent;
  ${horizontalPadding(20)}
  height: 40px;
  font-weight: 600px;
  ${centerContent};
`

const Container = styled(VStack)`
  min-width: 320px;
  width: 100%;
`

export const HabitItem = ({ value }: ComponentWithValueProps<HabitInfo>) => {
  const { emoji, tags, name, description } = value
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
      <HStack
        fullWidth
        alignItems="start"
        gap={8}
        justifyContent="space-between"
      >
        <VStack gap={4}>
          <Text color="contrast" weight="semibold">
            <EmojiTextPrefix emoji={emoji} />
            {name}
          </Text>
          <HStack gap={8} wrap="wrap">
            {tags.map((tag) => (
              <Tag $color={getLabelColor(habitTagColors[tag])} key={name}>
                {tag}
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
              createHabit({
                name,
                emoji,
                color: defaultColorOption,
                order: getLastItemOrder(habits.map(({ order }) => order)),
                id: getId(),
                startedAt: Math.round(Date.now() / MS_IN_SEC),
                successes: [],
              })
            }}
            isRounded
            kind="secondary"
          >
            Add
          </Button>
        )}
      </HStack>

      <Text height="large" size={14} color="supporting">
        {description}
      </Text>
    </Container>
  )
}
