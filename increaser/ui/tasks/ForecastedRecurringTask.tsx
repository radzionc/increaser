import { TaskFactory } from '@increaser/entities/TaskFactory'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import styled from 'styled-components'
import { TaskItemFrame } from './TaskItemFrame'
import { TaskCompletionInput } from './TaskCompletionInput'
import { TaskTextContainer } from './TaskTextContainer'
import { TaskProject } from './TaskProject'

const Container = styled(Hoverable)`
  opacity: 0.6;
  width: 100%;
`

const Content = styled(TaskItemFrame)`
  pointer-events: none;
`

export const ForecastedRecurringTask = ({
  value,
}: ComponentWithValueProps<TaskFactory['task']>) => {
  return (
    <Tooltip
      content="This task will be created automatically"
      renderOpener={(props) => (
        <div {...props}>
          <Container verticalOffset={0}>
            <Content>
              <TaskCompletionInput value={false} onChange={() => {}} />
              <TaskTextContainer>
                <TaskProject value={value.projectId} />
                {value.name}
              </TaskTextContainer>
            </Content>
          </Container>
        </div>
      )}
    />
  )
}
