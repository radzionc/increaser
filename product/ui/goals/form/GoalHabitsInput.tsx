import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { InputProps } from '@lib/ui/props'
import { without } from '@lib/utils/array/without'
import { useMemo } from 'react'

import { ActiveHabit } from '../../habits/ActiveHabit'
import { CurrentHabitProvider } from '../../habits/CurrentHabitProvider'
import { CreateHabitForm } from '../../habits/form/CreateHabitForm'
import { useHabits } from '../../habits/hooks/useHabits'

import { AddLinkedEntity } from './linkedEntity/AddLinkedEntity'
import { goalLinkedEntityTitle } from './linkedEntity/GoalLinkedEntity'
import { LinkedEntitiesContainer } from './linkedEntity/LinkedEntitiesContainer'
import { LinkedEntityActionsContainer } from './linkedEntity/LinkedEntityActionsContainer'
import { LinkEntity } from './linkedEntity/LinkEntity'
import { ManageGoalHabit } from './ManageGoalHabit'

export const GoalHabitsInput = ({ value, onChange }: InputProps<string[]>) => {
  const habits = useHabits()
  const options = useMemo(
    () => habits.filter(({ id }) => !value.includes(id)),
    [habits, value],
  )

  return (
    <LinkedEntitiesContainer title={goalLinkedEntityTitle.habit}>
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
