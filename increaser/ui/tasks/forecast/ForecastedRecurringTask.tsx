import styled from 'styled-components'
import { TaskItemFrame } from '../TaskItemFrame'
import { TaskCompletionInput } from '../TaskCompletionInput'
import { TaskTextContainer } from '../TaskTextContainer'
import { TaskProject } from '../TaskProject'
import { useCurrentForecastedTask } from './state/currentForecastedTask'
import { ForceRecurringTaskCreation } from './ForceRecurringTaskCreation'
import { HStack } from '@lib/ui/css/stack'

const Content = styled(TaskItemFrame)`
  pointer-events: none;
`

export const ForecastedRecurringTask = () => {
  const value = useCurrentForecastedTask()

  return (
    <HStack fullWidth justifyContent="space-between" gap={20}>
      <Content>
        <TaskCompletionInput
          style={{ opacity: 0.4 }}
          value={false}
          onChange={() => {}}
        />
        <TaskTextContainer color="supporting">
          <TaskProject value={value.projectId} />
          {value.name}
        </TaskTextContainer>
      </Content>
      <ForceRecurringTaskCreation />
    </HStack>
  )
}
