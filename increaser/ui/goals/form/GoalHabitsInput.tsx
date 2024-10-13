import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { HStack, VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import styled from 'styled-components'
import { useHabits } from '../../habits/HabitsContext'
import { CurrentHabitProvider } from '../../habits/CurrentHabitProvider'
import { AddGoalHabit } from './AddGoalHabit'
import { RemoveGoalHabit } from './RemoveGoalHabit'
import { GoalHabitItem } from './GoalHabitItem'

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

export const GoalHabitsInput = ({ value, onChange }: InputProps<string[]>) => {
  const { habits } = useHabits()
  const options = useMemo(() => {
    return habits.filter(({ id }) => !value.includes(id)).map(({ id }) => id)
  }, [habits, value])

  return (
    <FieldArrayContainer title="Daily habits">
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
    </FieldArrayContainer>
  )
}
