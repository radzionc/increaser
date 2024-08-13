import { TaskFactory } from '@increaser/entities/TaskFactory'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import styled from 'styled-components'
import { TaskItemFrame } from '../TaskItemFrame'
import { TaskCompletionInput } from '../TaskCompletionInput'
import { TaskTextContainer } from '../TaskTextContainer'
import { TaskProject } from '../TaskProject'
import { Text } from '@lib/ui/text'

const Container = styled(Hoverable)`
  opacity: 0.6;
  width: 100%;
`

const Content = styled(TaskItemFrame)`
  pointer-events: none;
`

type Props = ComponentWithValueProps<TaskFactory['task']> & {
  count?: number
}

const Count = styled(Text)`
  font-weight: 800;
`

export const ForecastedRecurringTask = ({ value, count }: Props) => {
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
                {count !== undefined && count > 1 && (
                  <Count as="span"> × {count}</Count>
                )}
              </TaskTextContainer>
            </Content>
          </Container>
        </div>
      )}
    />
  )
}
