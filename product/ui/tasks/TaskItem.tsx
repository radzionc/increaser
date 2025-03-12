import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { Spacer } from '@lib/ui/layout/Spacer'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { useCurrentTask } from './CurrentTaskProvider'
import { TaskCheckBox } from './TaskCheckBox'
import { TaskItemFrame } from './TaskItemFrame'
import { TaskProject } from './TaskProject'
import { TaskTextContainer } from './TaskTextContainer'
import { TaskTrackedTime } from './trackedTime/TaskTrackedTime'

const Container = styled(ActionInsideInteractiveElement)`
  width: 100%;
`

const Outline = styled(TakeWholeSpace)`
  ${absoluteOutline(8, 0)};
  ${borderRadius.s};
  pointer-events: none;
`

const Content = styled(TaskItemFrame)`
  ${interactive};

  &:hover ${Outline} {
    background: ${getColor('mist')};
  }
`

export const TaskItem = () => {
  const task = useCurrentTask()

  const [, setActiveItemId] = useActiveItemId()

  return (
    <Container
      render={({ actionSize: checkboxSize }) => (
        <>
          <Content onClick={() => setActiveItemId(task.id)}>
            <Spacer {...checkboxSize} />
            <TaskTextContainer>
              <TaskProject value={task.projectId} />
              <span>{task.name}</span>
              <TaskTrackedTime />
            </TaskTextContainer>
            <Outline />
          </Content>
        </>
      )}
      action={<TaskCheckBox />}
      actionPlacerStyles={{
        left: 0,
        top: tightListItemConfig.verticalPadding,
      }}
    />
  )
}
