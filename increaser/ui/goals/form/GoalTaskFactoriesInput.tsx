import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { HStack, VStack } from '@lib/ui/css/stack'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { RemoveGoalTaskFactory } from './RemoveGoalTaskFactory'
import { AddGoalTaskFactory } from './AddGoalTaskFactory'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import styled from 'styled-components'
import { TaskFactoryItem } from '../../taskFactories/TaskFactoryItem'
import { ActiveTaskFactory } from '../../taskFactories/ActiveTaskFactory'

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

export const GoalTaskFactoriesInput = ({
  value,
  onChange,
}: InputProps<string[]>) => {
  const taskFactories = useTaskFactories()
  const options = useMemo(() => {
    return taskFactories
      .filter(({ id }) => !value.includes(id))
      .map(({ id }) => id)
  }, [taskFactories, value])

  return (
    <FieldArrayContainer title="Recurring tasks">
      {value.length > 0 && (
        <VStack>
          <ActiveItemIdProvider initialValue={null}>
            <ActiveTaskFactory />
            {taskFactories
              .filter(({ id }) => value.includes(id))
              .map((item) => {
                return (
                  <CurrentTaskFactoryProvider key={item.id} value={item}>
                    <Content>
                      <TaskFactoryItem />
                      <RemoveGoalTaskFactory
                        onClick={() => onChange(without(value, item.id))}
                      />
                    </Content>
                  </CurrentTaskFactoryProvider>
                )
              })}
          </ActiveItemIdProvider>
        </VStack>
      )}
      <VStack alignItems="start">
        <AddGoalTaskFactory
          options={options}
          onFinish={(id) => onChange([...value, id])}
        />
      </VStack>
    </FieldArrayContainer>
  )
}
