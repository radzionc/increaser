import { useCurrentTask } from './CurrentTaskProvider'
import styled from 'styled-components'
import { TaskItemFrame } from './TaskItemFrame'
import { EditTaskForm } from './form/EditTaskForm'
import { TaskPrimaryContent } from './TaskPrimaryContent'
import { TaskCheckBox } from './TaskCheckBox'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { interactive } from '@lib/ui/css/interactive'
import {
  checklistItemContentMinHeight,
  checklistItemGap,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { getColor } from '@lib/ui/theme/getters'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskLinks } from './TaskLinks'
import { VStack } from '@lib/ui/layout/Stack'

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

  const [activeTaskId, setActiveTaskId] = useActiveItemId()

  if (activeTaskId === task.id) {
    return <EditTaskForm />
  }

  return (
    <Container
      render={({ actionSize: linksSize }) => (
        <Container
          render={({ actionSize: checkboxSize }) => (
            <>
              <Content
                onClick={() => {
                  setActiveTaskId(task.id)
                }}
              >
                <Spacer {...checkboxSize} />
                <VStack gap={4}>
                  <TaskPrimaryContent />
                  {task.links && task.links.length > 0 && (
                    <Spacer {...linksSize} />
                  )}
                </VStack>
                <Outline />
              </Content>
            </>
          )}
          action={<TaskCheckBox />}
          actionPlacerStyles={{ left: 0, top: checklistItemVerticalPadding }}
        />
      )}
      action={<TaskLinks />}
      actionPlacerStyles={{
        left: checklistItemContentMinHeight + checklistItemGap,
        bottom: checklistItemVerticalPadding,
      }}
    />
  )
}
