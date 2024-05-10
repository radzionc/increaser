import styled from 'styled-components'
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
import {
  FocusOptionContainer,
  focusOptionPadding,
} from './FocusOptionContainer'

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
        left: focusOptionPadding,
        top: focusOptionPadding,
      }}
      render={({ actionSize }) => (
        <FocusOptionContainer
          onClick={() => {
            setState((state) => ({
              ...state,
              taskId: id,
              projectId: shouldBePresent(projectId),
            }))
          }}
          selected={isSelected}
        >
          <HStack gap={focusOptionPadding}>
            <Spacer {...actionSize} />
            <TaskPrimaryContent />
          </HStack>
        </FocusOptionContainer>
      )}
      action={
        <CheckBoxContainer>
          <TaskCheckBox />
        </CheckBoxContainer>
      }
    />
  )
}
