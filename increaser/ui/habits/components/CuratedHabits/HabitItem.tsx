import { HabitInfo, habitTagColors } from '@increaser/ui/habits/data/habits'
import styled, { useTheme } from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { CheckIcon } from '@lib/ui/icons/CheckIcon'
import { HStack, VStack } from '@lib/ui/css/stack'
import { Tag } from '@lib/ui/tags/Tag'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { ValueProp } from '@lib/ui/props'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useCreateUserEntityMutation } from '@increaser/ui/userEntity/api/useCreateUserEntityMutation'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { useUser } from '@increaser/ui/user/state/user'
import { useHabits } from '@increaser/ui/habits/hooks/useHabits'

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

export const HabitItem = ({ value }: ValueProp<HabitInfo & EntityWithId>) => {
  const { emoji, tags, name, description, id, plan } = value
  const { habits: habitRecord } = useUser()
  const isHabitAdded = id in habitRecord

  const habits = useHabits()

  const {
    colors: { getLabelColor },
  } = useTheme()

  const { mutate: createHabit } = useCreateUserEntityMutation('habit')

  return (
    <Container gap={8}>
      <HStack
        fullWidth
        alignItems="start"
        gap={8}
        justifyContent="space-between"
      >
        <VStack gap={4}>
          <Text color="contrast" weight="500">
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
                order: getLastItemOrder(habits.map(({ order }) => order)),
                id,
                startedAt: Date.now(),
                successes: [],
                plan,
              })
            }}
            isRounded
            kind="secondary"
          >
            Add
          </Button>
        )}
      </HStack>

      <Text height="l" size={14} color="supporting">
        {description}
      </Text>
    </Container>
  )
}
