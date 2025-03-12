import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { Opener } from '@lib/ui/base/Opener'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { Spacer } from '@lib/ui/layout/Spacer'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { IsActiveProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { omit } from '@lib/utils/record/omit'
import { useFocusProjectTask } from '@product/ui/focus/state/focusProjectTask'
import { useFocusTarget } from '@product/ui/focus/state/focusTarget'
import { useCurrentTask } from '@product/ui/tasks/CurrentTaskProvider'
import { EditTaskFormOverlay } from '@product/ui/tasks/form/EditTaskFormOverlay'
import styled, { css } from 'styled-components'

import { FocusIconButton } from '../../FocusSetWidget/FocusIconButton'
import { useFocusProject } from '../../state/focusProject'
import { focusLauncherConfig } from '../config'

import { FocusTaskOptionContent } from './FocusTaskOptionContent'

const Container = styled(OnHoverAction)`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
  })}
`

const Content = styled(UnstyledButton)<IsActiveProp>`
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
  const { taskId, projectId: focusTargetProjectId } = useFocusTarget()
  const [, setState] = useFocusProjectTask()
  const [, setFocusProject] = useFocusProject()

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
            setFocusProject(projectId)
            if (taskId === id) {
              if (focusTargetProjectId) {
                setState((prev) => omit(prev, focusTargetProjectId))
              }
            } else {
              setState((prev) => ({
                ...prev,
                [projectId]: id,
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
