import { useCurrentTask } from './CurrentTaskProvider'
import styled from 'styled-components'
import { TaskItemFrame } from './TaskItemFrame'
import { useTasksManager } from './TasksManagerProvider'
import { EditTaskForm } from './EditTaskForm'
import { TaskPrimaryContent } from './TaskPrimaryContent'
import { TaskCheckBox } from './TaskCheckBox'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { interactive } from '@lib/ui/css/interactive'
import { checklistItemVerticalPadding } from '@lib/ui/checklist/ChecklistItemFrame'
import { getColor } from '@lib/ui/theme/getters'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'

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

  const { activeTaskId, setState } = useTasksManager()

  if (activeTaskId === task.id) {
    return <EditTaskForm />
  }

  return (
    <Container
      render={({ actionSize }) => (
        <>
          <Content
            onClick={() => {
              setState((state) => ({
                ...state,
                activeTaskId: task.id,
              }))
            }}
          >
            <Spacer {...actionSize} />
            <TaskPrimaryContent />
            <Outline />
          </Content>
        </>
      )}
      action={<TaskCheckBox />}
      actionPlacerStyles={{ left: 0, top: checklistItemVerticalPadding }}
    />
  )
}
