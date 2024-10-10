import styled from 'styled-components'
import { TaskItemFrame } from '../TaskItemFrame'
import { TaskCompletionInput } from '../TaskCompletionInput'
import { TaskTextContainer } from '../TaskTextContainer'
import { TaskProject } from '../TaskProject'
import { useCurrentForecastedTask } from './state/currentForecastedTask'
import { ForceRecurringTaskCreation } from './ForceRecurringTaskCreation'
import { hStack, HStack } from '@lib/ui/css/stack'
import { ForecastedTaskCreationTime } from './ForecastedTaskCreationTime'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Content = styled(TaskItemFrame)`
  pointer-events: none;
`

const Actions = styled.div`
  ${hStack({
    gap: 4,
    alignItems: 'center',
  })}

  height: ${toSizeUnit(
    tightListItemConfig.lineHeight + tightListItemConfig.verticalPadding * 2,
  )};

  > * {
    height: 32px;
  }

  flex-shrink: 0;
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
      <Actions>
        <ForceRecurringTaskCreation />
        <ForecastedTaskCreationTime />
      </Actions>
    </HStack>
  )
}
