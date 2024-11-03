import { InputProps } from '@lib/ui/props'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { VStack } from '@lib/ui/css/stack'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import { ActiveTaskFactory } from '../../taskFactories/ActiveTaskFactory'
import { ManageGoalTaskFactory } from './ManageGoalTaskFactory'
import { LinkedEntitiesContainer } from './linkedEntity/LinkedEntitiesContainer'
import { AddLinkedEntity } from './linkedEntity/AddLinkedEntity'
import { CreateTaskFactoryForm } from '../../taskFactories/form/CreateTaskFactoryForm'
import { LinkEntity } from './linkedEntity/LinkEntity'
import { useUser } from '../../user/state/user'
import { LinkedEntityActionsContainer } from './linkedEntity/LinkedEntityActionsContainer'

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
    <LinkedEntitiesContainer title="Recurring tasks">
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
