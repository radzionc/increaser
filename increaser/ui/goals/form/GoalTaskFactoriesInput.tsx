import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { HStack } from '@lib/ui/layout/Stack'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskFactoryItem } from '../../taskFactories/TaskFactoryItem'

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
          .map((item) => {
            return (
              <CurrentTaskFactoryProvider key={item.id} value={item}>
                <HStack alignItems="center" fullWidth gap={8}>
                  <TaskFactoryItem />
                </HStack>
              </CurrentTaskFactoryProvider>
            )
          })}
      </ActiveItemIdProvider>
    </FieldArrayContainer>
  )
}
