import styled, { css } from 'styled-components'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItemFrame } from '@increaser/ui/tasks/TaskItemFrame'
import { interactive } from '@lib/ui/css/interactive'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { getColor } from '@lib/ui/theme/getters'
import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { ComponentWithActiveState } from '@lib/ui/props'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { Opener } from '@lib/ui/base/Opener'
import { EditTaskFormOverlay } from '@increaser/ui/tasks/form/EditTaskFormOverlay'
import { Spacer } from '@lib/ui/layout/Spacer'
import { TaskTextContainer } from '@increaser/ui/tasks/TaskTextContainer'
import { TaskDeadlineTag } from '@increaser/ui/tasks/deadline/TaskDeadlineTag'
import { TaskProject } from '@increaser/ui/tasks/TaskProject'
import { TaskTrackedTime } from '@increaser/ui/tasks/TaskTrackedTime'
import { Text } from '@lib/ui/text'
import { useFocusLauncher } from '../state/useFocusLauncher'

const Container = styled(OnHoverAction)`
  width: 100%;
  display: flex;
  align-items: center;
`

const Button = styled(IconButton)``

const Outline = styled(TakeWholeSpace)<ComponentWithActiveState>`
  ${absoluteOutline(8, 0)};
  ${borderRadius.s};
  pointer-events: none;

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
      border: 2px solid ${getColor('mistExtra')};
    `};
`

const Content = styled(TaskItemFrame)<ComponentWithActiveState>`
  ${interactive};

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ isActive }) =>
    !isActive
      ? css`
          &:hover ${Outline} {
            background: ${getColor('mist')};
          }
        `
      : css`
          color: ${getColor('contrast')};
        `}
`

export const FocusTaskOption = () => {
  const { id, projectId, name } = useCurrentTask()
  const [{ taskId }, setState] = useFocusLauncher()

  const isActive = taskId === id

  return (
    <Container
      actionPlacerStyles={{
        right: -4,
        top: 4,
      }}
      render={({ actionSize }) => (
        <Content
          isActive={isActive}
          onClick={() => {
            if (taskId === id) {
              setState((state) => ({
                ...state,
                taskId: null,
              }))
            } else {
              setState((state) => ({
                ...state,
                taskId: id,
                projectId: shouldBePresent(projectId),
              }))
            }
          }}
        >
          <TaskTextContainer>
            <TaskProject value={projectId} />
            <Text as="span">{name}</Text>
            <TaskTrackedTime />
            <TaskDeadlineTag />
          </TaskTextContainer>
          <Outline isActive={isActive} />
          {actionSize && <Spacer width={actionSize.width} />}
        </Content>
      )}
      action={
        <Opener
          renderOpener={({ onOpen }) => (
            <Button
              kind="secondary"
              size="m"
              onClick={onOpen}
              icon={<EditIcon />}
              title="Edit task"
            />
          )}
          renderContent={({ onClose }) => (
            <EditTaskFormOverlay onFinish={onClose} />
          )}
        />
      }
    />
  )
}
