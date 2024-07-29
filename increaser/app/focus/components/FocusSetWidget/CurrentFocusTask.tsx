import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { CurrentFocusTaskTrackedTime } from '@increaser/app/focus/components/CurrentFocusTaskTrackedTime'
import styled from 'styled-components'
import { SelectFocusTask } from './SelectFocusTask'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { focusSetWidgetConfig } from './config'
import { TaskLinks } from '@increaser/ui/tasks/TaskLinks'
import { CurrentChecklist } from './CurrentChecklist'
import { FocusIconButton } from './FocusIconButton'
import { EditFocusTask } from './EditFocusTask'
import { Text } from '@lib/ui/text'
import { getLastItem } from '@lib/utils/array/getLastItem'

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
  const { intervals } = useCurrentFocus()
  const { tasks } = useAssertUserState()
  const { updateTask } = useFocus()

  const { taskId } = getLastItem(intervals)

  const task = taskId ? tasks[taskId] : undefined

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
              {task.links && task.links.length > 0 && (
                <TaskLinks value={task.links} />
              )}
            </VStack>
          </TaskItemFrame>
          <HStack>
            <EditFocusTask />
            <FocusIconButton
              title="Stop task"
              kind="secondary"
              icon={<CloseIcon />}
              onClick={() => updateTask(null)}
            />
          </HStack>
        </Container>
        {task.checklist && task.checklist.length > 0 && (
          <VStack gap={4}>
            <Text color="supporting" weight="semibold" size={12}>
              Checklist
            </Text>
            <CurrentChecklist />
          </VStack>
        )}
      </Wrapper>
    </CurrentTaskProvider>
  )
}
