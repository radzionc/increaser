import styled, { css } from 'styled-components'
import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { getColor } from '@lib/ui/theme/getters'
import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { ComponentWithActiveState } from '@lib/ui/props'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { Opener } from '@lib/ui/base/Opener'
import { EditTaskFormOverlay } from '@increaser/ui/tasks/form/EditTaskFormOverlay'
import { Spacer } from '@lib/ui/layout/Spacer'
import { useFocusTarget } from '../../state/useFocusTarget'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack } from '@lib/ui/css/stack'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { FocusIconButton } from '../../components/FocusSetWidget/FocusIconButton'
import { focusLauncherConfig } from '../config'
import { FocusTaskOptionContent } from './FocusTaskOptionContent'

const Container = styled(OnHoverAction)`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
  })}
`

const Content = styled(UnstyledButton)<ComponentWithActiveState>`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  })}

  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};

  ${horizontalPadding(panelDefaultPadding)};
  height: ${toSizeUnit(focusLauncherConfig.optionMinHeight)};

  ${({ isActive }) =>
    isActive
      ? css`
          background: ${getColor('mistExtra')};
          color: ${getColor('contrast')};
        `
      : css`
          &:hover {
            background: ${getColor('mist')};
          }
        `};
`

export const FocusTaskOption = () => {
  const { id, projectId } = useCurrentTask()
  const [{ taskId, projectId: focusTargetProjectId }, setState] =
    useFocusTarget()

  const isActive = taskId === id

  return (
    <Container
      actionPlacerStyles={{
        right: panelDefaultPadding,
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
                projectId: projectId,
              }))
            }
          }}
        >
          <FocusTaskOptionContent
            showEmoji={!focusTargetProjectId}
            style={{ zIndex: 1 }}
          />
          {actionSize && <Spacer width={actionSize.width} />}
        </Content>
      )}
      action={
        <Opener
          renderOpener={({ onOpen }) => (
            <FocusIconButton
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
