import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { HStack, VStack } from '@lib/ui/css/stack'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { RemoveGoalTaskFactory } from './RemoveGoalTaskFactory'
import { AddGoalTaskFactory } from './AddGoalTaskFactory'
import { SelectGoalTaskFactory } from './SelectGoalTaskFactory'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import styled from 'styled-components'
import { GoalTaskFactoryItem } from './GoalTaskFactoryItem'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { getColor } from '@lib/ui/theme/getters'

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

const Separator = styled.div`
  width: 1px;
  height: 20px;
  background: ${getColor('mistExtra')};
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
            {taskFactories
              .filter(({ id }) => value.includes(id))
              .map((item) => {
                return (
                  <CurrentTaskFactoryProvider key={item.id} value={item}>
                    <Content>
                      <GoalTaskFactoryItem />
                      <RemoveGoalTaskFactory
                        onClick={() => onChange(without(value, item.id))}
                      />
                    </Content>
                  </CurrentTaskFactoryProvider>
                )
              })}
          </ActiveItemIdProvider>
          <HStackSeparatedBy separator={<Separator />} gap={4}>
            <AddGoalTaskFactory onFinish={(id) => onChange([...value, id])} />
            {options.length > 0 && (
              <SelectGoalTaskFactory
                options={options}
                onFinish={(id) => onChange([...value, id])}
              />
            )}
          </HStackSeparatedBy>
        </VStack>
      )}
    </FieldArrayContainer>
  )
}
