import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { InputProps } from '@lib/ui/props'
import { without } from '@lib/utils/array/without'
import { useMemo } from 'react'

import { ActiveTaskFactory } from '../../taskFactories/ActiveTaskFactory'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { CreateTaskFactoryForm } from '../../taskFactories/form/CreateTaskFactoryForm'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { useUser } from '../../user/state/user'

import { AddLinkedEntity } from './linkedEntity/AddLinkedEntity'
import { goalLinkedEntityTitle } from './linkedEntity/GoalLinkedEntity'
import { LinkedEntitiesContainer } from './linkedEntity/LinkedEntitiesContainer'
import { LinkedEntityActionsContainer } from './linkedEntity/LinkedEntityActionsContainer'
import { LinkEntity } from './linkedEntity/LinkEntity'
import { ManageGoalTaskFactory } from './ManageGoalTaskFactory'

export const GoalTaskFactoriesInput = ({
  value,
  onChange,
}: InputProps<string[]>) => {
  const { projects } = useUser()
  const taskFactories = useTaskFactories()
  const options = useMemo(
    () => taskFactories.filter(({ id }) => !value.includes(id)),
    [taskFactories, value],
  )

  return (
    <LinkedEntitiesContainer title={goalLinkedEntityTitle.taskFactory}>
      <VStack>
        {value.length > 0 && (
          <ActiveItemIdProvider initialValue={null}>
            <ActiveTaskFactory />
            {taskFactories
              .filter(({ id }) => value.includes(id))
              .map((item) => (
                <CurrentTaskFactoryProvider key={item.id} value={item}>
                  <ManageGoalTaskFactory
                    onRemove={() => onChange(without(value, item.id))}
                  />
                </CurrentTaskFactoryProvider>
              ))}
          </ActiveItemIdProvider>
        )}
        <LinkedEntityActionsContainer>
          <AddLinkedEntity
            renderCreateForm={({ onClose }) => (
              <CreateTaskFactoryForm
                onFinish={(taskFactory) => {
                  onClose()
                  if (taskFactory) {
                    onChange([...value, taskFactory.id])
                  }
                }}
              />
            )}
          />
          <LinkEntity
            options={options}
            getOptionName={(option) => option.name}
            getOptionKey={(option) => option.id}
            getOptionEmoji={(option) => projects[option.projectId].emoji}
            onFinish={(taskFactory) => {
              onChange([...value, taskFactory.id])
            }}
          />
        </LinkedEntityActionsContainer>
      </VStack>
    </LinkedEntitiesContainer>
  )
}
