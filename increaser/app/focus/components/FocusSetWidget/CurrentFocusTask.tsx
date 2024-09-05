import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { CurrentFocusTaskTrackedTime } from '@increaser/app/focus/components/CurrentFocusTaskTrackedTime'
import styled from 'styled-components'
import { SelectFocusTask } from './SelectFocusTask'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { focusSetWidgetConfig } from './config'
import { FocusIconButton } from './FocusIconButton'
import { useFocusTask } from '../../tasks/useFocusTask'

const Content = styled(TaskTextContainer)`
  font-size: 14px;
`

const Wrapper = styled(VStack)`
  width: 100%;
  background: ${getColor('background')};
  padding: ${toSizeUnit(focusSetWidgetConfig.padding)};
  gap: 20px;
`

const Container = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  align-items: start;
  gap: 4px;
`

export const CurrentFocusTask = () => {
  const { updateTask } = useFocus()

  const task = useFocusTask()

  if (!task) {
    return <SelectFocusTask />
  }

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
            </VStack>
          </TaskItemFrame>
          <HStack>
            <FocusIconButton
              title="Stop task"
              kind="secondary"
              icon={<CloseIcon />}
              onClick={() => updateTask(null)}
            />
          </HStack>
        </Container>
      </Wrapper>
    </CurrentTaskProvider>
  )
}
