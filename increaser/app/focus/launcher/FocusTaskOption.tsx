import { centerContent } from '@lib/ui/css/centerContent'
import { transition } from '@lib/ui/css/transition'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentTask } from '../../tasks/components/CurrentTaskProvider'
import { TaskPrimaryContent } from '../../tasks/components/TaskPrimaryContent'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { TaskCheckBox } from '../../tasks/components/TaskCheckBox'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'
import { HStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const padding = 12

const Container = styled.div<{
  selected: boolean
}>`
  padding: ${toSizeUnit(padding)};
  border-radius: 8px;
  ${centerContent}
  justify-content: start;
  cursor: pointer;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${transition}
  color: ${getColor('textSupporting')};
  border: 1px solid ${getColor('background')};
  background: ${getColor('foreground')};

  ${({ selected }) =>
    selected
      ? css`
          background: ${getColor('background')};
          color: ${getColor('text')};
          border-color: ${getColor('text')};
        `
      : css`
          &:hover {
            border-color: ${getColor('mist')};
            color: ${getColor('text')};
          }
        `}
`

const CheckBoxContainer = styled.div`
  ${sameDimensions(checklistItemContentMinHeight)};
`

export const FocusTaskOption = () => {
  const { id, projectId } = useCurrentTask()
  const { taskId, setState } = useFocusLauncher()

  const isSelected = taskId === id

  return (
    <ActionInsideInteractiveElement
      actionPlacerStyles={{
        left: padding,
        top: padding,
      }}
      render={({ actionSize }) => (
        <Container
          onClick={() => {
            setState((state) => ({
              ...state,
              taskId: id,
              projectId: shouldBePresent(projectId),
            }))
          }}
          selected={isSelected}
        >
          <HStack gap={padding}>
            <Spacer {...actionSize} />
            <TaskPrimaryContent />
          </HStack>
        </Container>
      )}
      action={
        <CheckBoxContainer>
          <TaskCheckBox />
        </CheckBoxContainer>
      }
    />
  )
}
