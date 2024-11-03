import { InputProps } from '@lib/ui/props'
import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import { CurrentHabitProvider } from '../../habits/CurrentHabitProvider'
import { useHabits } from '../../habits/hooks/useHabits'
import { ActiveHabit } from '../../habits/ActiveHabit'
import { ManageGoalHabit } from './ManageGoalHabit'
import { LinkedEntitiesContainer } from './linkedEntity/LinkedEntitiesContainer'
import { AddLinkedEntity } from './linkedEntity/AddLinkedEntity'
import { LinkEntity } from './linkedEntity/LinkEntity'
import { LinkedEntityActionsContainer } from './linkedEntity/LinkedEntityActionsContainer'
import { CreateHabitForm } from '../../habits/form/CreateHabitForm'

export const GoalHabitsInput = ({ value, onChange }: InputProps<string[]>) => {
  const habits = useHabits()
  const options = useMemo(
    () => habits.filter(({ id }) => !value.includes(id)),
    [habits, value],
  )

  return (
    <LinkedEntitiesContainer title="Daily habits">
      <VStack>
        {value.length > 0 && (
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
        )}
        <LinkedEntityActionsContainer>
          <AddLinkedEntity
            renderCreateForm={({ onClose }) => (
              <CreateHabitForm
                onFinish={(item) => {
                  onClose()
                  if (item) {
                    onChange([...value, item.id])
                  }
                }}
              />
            )}
          />
          <LinkEntity
            options={options}
            getOptionName={(option) => option.name}
            getOptionKey={(option) => option.id}
            getOptionEmoji={(option) => option.emoji}
            onFinish={(item) => {
              onChange([...value, item.id])
            }}
          />
        </LinkedEntityActionsContainer>
      </VStack>
    </LinkedEntitiesContainer>
  )
}
