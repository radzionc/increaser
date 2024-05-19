import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { CurrentFocusTaskTrackedTime } from '@increaser/app/focus/components/CurrentFocusTaskTrackedTime'
import styled from 'styled-components'
import { cropText } from '@lib/ui/css/cropText'
import { SelectContainer } from '@lib/ui/select/SelectContainer'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { SelectFocusTask } from './SelectFocusTask'

const Container = styled(SelectContainer)`
  ${verticalPadding(0)}
  ${cropText};
`

const Content = styled(TaskTextContainer)`
  ${cropText};
  max-width: 280px;
  font-size: 14px;
`

export const CurrentFocusTask = () => {
  const { task: focusTask } = useCurrentFocus()
  const { tasks } = useAssertUserState()

  if (!focusTask) {
    return <SelectFocusTask />
  }

  const task = tasks[focusTask.id]

  return (
    <CurrentTaskProvider value={task}>
      <Container>
        <TaskItemFrame>
          <TaskCheckBox />
          <Content>
            <CurrentFocusTaskTrackedTime />
            {task.name}
          </Content>
        </TaskItemFrame>
      </Container>
    </CurrentTaskProvider>
  )
}
