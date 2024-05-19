import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { CurrentFocusTaskTrackedTime } from '@increaser/app/focus/components/CurrentFocusTaskTrackedTime'
import styled from 'styled-components'
import { cropText } from '@lib/ui/css/cropText'
import { SelectFocusTask } from './SelectFocusTask'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { HStack } from '@lib/ui/layout/Stack'

const Content = styled(TaskTextContainer)`
  ${cropText};
  font-size: 14px;
`

const Container = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  ${cropText};
`

export const CurrentFocusTask = () => {
  const { task: focusTask } = useCurrentFocus()
  const { tasks } = useAssertUserState()
  const { updateTask } = useFocus()

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
        <IconButton
          kind="secondary"
          title="Remove task"
          icon={<CloseIcon />}
          onClick={() => updateTask(undefined)}
        />
      </Container>
    </CurrentTaskProvider>
  )
}
