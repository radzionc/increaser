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
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { focusSetWidgetConfig } from './config'
import { TaskLinks } from '@increaser/ui/tasks/TaskLinks'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'

const Content = styled(TaskTextContainer)`
  ${cropText};
  font-size: 14px;
`

const Wrapper = styled.div`
  width: 100%;
  background: ${getColor('background')};
  padding: ${toSizeUnit(focusSetWidgetConfig.padding)};
`

const Container = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: start;
  gap: 4px;
  ${cropText};
`

const CloseButton = styled(IconButton)`
  ${sameDimensions(checklistItemContentMinHeight)};
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
      <Wrapper>
        <Container>
          <TaskItemFrame>
            <TaskCheckBox />
            <VStack gap={8}>
              <Content>
                <CurrentFocusTaskTrackedTime />
                {task.name}
              </Content>
              <TaskLinks />
            </VStack>
          </TaskItemFrame>
          <CloseButton
            title="Remove task"
            kind="secondary"
            icon={<CloseIcon />}
            onClick={() => updateTask(undefined)}
          />
        </Container>
      </Wrapper>
    </CurrentTaskProvider>
  )
}
