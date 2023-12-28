import { Draggable } from 'react-beautiful-dnd'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import styled, { css } from 'styled-components'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@increaser/app/ui/EmojiTextPrefix'

import { useCurrentHabit } from '../CurrentHabitProvider'
import { useHabits } from '../HabitsProvider'
import { useActiveHabits } from './ActiveHabitsContext'
import { EditHabit } from './EditHabit'
import { HabitAnalytics } from './HabitAnalytics'
import { HabitProgress } from './HabitProgress'
import { ManageHabit } from './ManageHabit'
import { ListCard } from '@increaser/app/ui/ListCard'

const Card = styled(ListCard)<{ isDragging?: boolean }>`
  ${({ isDragging }) =>
    isDragging &&
    css`
      transform: rotate(4deg);
    `}
`

export const ActiveHabit = () => {
  const habit = useCurrentHabit()
  const { emoji, name, id } = habit
  const { isReadonly } = useActiveHabits()

  const [isEditingHabit, { set: startEditingHabit, unset: stopEditingHabit }] =
    useBoolean(false)

  const { habits } = useHabits()

  const index = habits.indexOf(habit)

  const renderContent = () => {
    if (isEditingHabit) {
      return <EditHabit onFinish={stopEditingHabit} />
    }
    return (
      <VStack gap={8}>
        <HStack justifyContent="space-between" alignItems="start" gap={12}>
          <VStack gap={4}>
            <Text weight="semibold">
              <Text as="span">
                <EmojiTextPrefix emoji={emoji} />
              </Text>
              {name}
            </Text>
            <HabitAnalytics />
          </VStack>
          {!isReadonly && <ManageHabit onEdit={startEditingHabit} />}
        </HStack>
        <HabitProgress />
      </VStack>
    )
  }

  if (isReadonly) {
    return <Card>{renderContent()}</Card>
  }

  return (
    <Draggable index={index} draggableId={id}>
      {(provided, { isDragging }) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card isDragging={isDragging}>{renderContent()}</Card>
        </div>
      )}
    </Draggable>
  )
}
