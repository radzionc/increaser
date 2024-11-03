import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import styled from 'styled-components'
import { CurrentHabitProvider } from '../../habits/CurrentHabitProvider'
import { AddGoalHabit } from './AddGoalHabit'
import { useHabits } from '../../habits/hooks/useHabits'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ActiveHabit } from '../../habits/ActiveHabit'
import { ManageGoalHabit } from './ManageGoalHabit'

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
            <ActiveHabit />

            {habits
              .filter(({ id }) => value.includes(id))
              .map((item) => (
                <CurrentHabitProvider key={item.id} value={item}>
                  <ManageGoalHabit
                    onRemove={() => onChange(without(value, item.id))}
                  />
                </CurrentHabitProvider>
              ))}
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
