import { Hoverable } from '@lib/ui/base/Hoverable'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import styled from 'styled-components'
import { TaskItemFrame } from '../TaskItemFrame'
import { TaskCompletionInput } from '../TaskCompletionInput'
import { TaskTextContainer } from '../TaskTextContainer'
import { TaskProject } from '../TaskProject'
import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { getNextCadencePeriodStart } from '@increaser/entities-utils/taskFactory/getNextCadencePeriodStart'
import { useCurrentForecastedTask } from './state/currentForecastedTask'
import { ForceRecurringTaskCreation } from './ForceRecurringTaskCreation'

const Container = styled(Hoverable)`
  width: 100%;
`

const Content = styled(TaskItemFrame)`
  pointer-events: none;
`

export const ForecastedRecurringTask = () => {
  const value = useCurrentForecastedTask()
  const { cadence } = value

  const nextTaskWillBeCreatedAt = useMemo(
    () => getNextCadencePeriodStart({ cadence, at: Date.now() }),
    [cadence],
  )

  const canBeCreatedNow = value.willBeCreatedAt <= nextTaskWillBeCreatedAt

  return (
    <OnHoverAction
      actionPlacerStyles={{
        right: 0,
      }}
      render={() => (
        <Tooltip
          content={`This task will be created on ${format(
            value.willBeCreatedAt,
            'd MMMM',
          )}`}
          renderOpener={(props) => (
            <div style={{ width: '100%' }} {...props}>
              <Container verticalOffset={0}>
                <Content>
                  <TaskCompletionInput
                    style={{ opacity: 0.4 }}
                    value={false}
                    onChange={() => {}}
                  />
                  <TaskTextContainer>
                    <TaskProject value={value.projectId} />
                    {value.name}
                  </TaskTextContainer>
                </Content>
              </Container>
            </div>
          )}
        />
      )}
      action={canBeCreatedNow ? <ForceRecurringTaskCreation /> : null}
    />
  )
}
