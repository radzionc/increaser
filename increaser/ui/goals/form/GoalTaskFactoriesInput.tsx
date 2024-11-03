import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { InputProps } from '@lib/ui/props'
import { useTaskFactories } from '../../taskFactories/hooks/useTaskFactories'
import { VStack } from '@lib/ui/css/stack'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddGoalTaskFactory } from './AddGoalTaskFactory'
import { useMemo } from 'react'
import { without } from '@lib/utils/array/without'
import styled from 'styled-components'
import { ActiveTaskFactory } from '../../taskFactories/ActiveTaskFactory'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { ManageGoalTaskFactory } from './ManageGoalTaskFactory'

const Container = styled(FieldArrayContainer)`
  padding: ${toSizeUnit(panelDefaultPadding)};
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
    <Container title="Recurring tasks">
      {value.length > 0 && (
        <VStack>
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
        </VStack>
      )}
      <VStack alignItems="start">
        <AddGoalTaskFactory
          options={options}
          onFinish={(id) => onChange([...value, id])}
        />
      </VStack>
    </Container>
  )
}
