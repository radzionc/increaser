import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { HStack } from '@lib/ui/layout/Stack'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskFactoryItem } from '../../taskFactories/TaskFactoryItem'
import { EditTaskFactoryOverlay } from './EditTaskFactoryOverlay'
import { RemoveGoalTaskFactory } from './RemoveGoalTaskFactory'
import { removeAtIndex } from '@lib/utils/array/removeAtIndex'
import { AddGoalTaskFactory } from './AddGoalTaskFactory'
import { SelectGoalTaskFactory } from './SelectGoalTaskFactory'

export const GoalTaskFactoriesInput = ({
  value,
  onChange,
}: InputProps<string[]>) => {
  const taskFactories = useTaskFactories()
  return (
    <FieldArrayContainer title="Recurring tasks">
      <ActiveItemIdProvider initialValue={null}>
        {taskFactories
          .filter(({ id }) => value.includes(id))
          .map((item, index) => {
            return (
              <CurrentTaskFactoryProvider key={item.id} value={item}>
                <HStack alignItems="center" fullWidth gap={8}>
                  <TaskFactoryItem />
                  <RemoveGoalTaskFactory
                    onClick={() => onChange(removeAtIndex(value, index))}
                  />
                </HStack>
              </CurrentTaskFactoryProvider>
            )
          })}
        <EditTaskFactoryOverlay />
      </ActiveItemIdProvider>
      <HStack gap={8}>
        <AddGoalTaskFactory
          onFinish={(id) => {
            if (id) {
              onChange([...value, id])
            }
          }}
        />
        <SelectGoalTaskFactory
          onFinish={(id) => {
            if (id) {
              onChange([id])
            }
          }}
        />
      </HStack>
    </FieldArrayContainer>
  )
}
