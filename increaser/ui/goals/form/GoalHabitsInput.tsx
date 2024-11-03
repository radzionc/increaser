import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { HStack, VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import styled from 'styled-components'
import { CurrentHabitProvider } from '../../habits/CurrentHabitProvider'
import { AddGoalHabit } from './AddGoalHabit'
import { RemoveGoalHabit } from './RemoveGoalHabit'
import { GoalHabitItem } from './GoalHabitItem'
import { useHabits } from '../../habits/hooks/useHabits'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const Content = styled(HStack)`
  width: 100%;
  align-items: center;
  gap: 8px;
  > * {
    &:first-child {
      flex: 1;
    }
  }
`

const Container = styled(FieldArrayContainer)`
  padding: ${toSizeUnit(panelDefaultPadding)};
`

export const GoalHabitsInput = ({ value, onChange }: InputProps<string[]>) => {
  const habits = useHabits()
  const options = useMemo(() => {
    return habits.filter(({ id }) => !value.includes(id)).map(({ id }) => id)
  }, [habits, value])

  return (
    <Container title="Daily habits">
      {value.length > 0 && (
        <VStack>
          <ActiveItemIdProvider initialValue={null}>
            {habits
              .filter(({ id }) => value.includes(id))
              .map((item) => {
                return (
                  <CurrentHabitProvider key={item.id} value={item}>
                    <Content>
                      <GoalHabitItem />
                      <RemoveGoalHabit
                        onClick={() => onChange(without(value, item.id))}
                      />
                    </Content>
                  </CurrentHabitProvider>
                )
              })}
          </ActiveItemIdProvider>
        </VStack>
      )}
      <VStack alignItems="start">
        <AddGoalHabit
          options={options}
          onFinish={(id) => onChange([...value, id])}
        />
      </VStack>
    </Container>
  )
}
