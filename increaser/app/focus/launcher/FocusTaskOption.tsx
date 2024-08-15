import styled from 'styled-components'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskPrimaryContent } from '@increaser/ui/tasks/TaskPrimaryContent'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { HStack } from '@lib/ui/layout/Stack'
import {
  FocusOptionContainer,
  focusOptionPadding,
} from './FocusOptionContainer'
import { cropText } from '@lib/ui/css/cropText'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { useFocusLauncher } from './state/useFocusLauncher'

const CheckBoxContainer = styled.div`
  ${sameDimensions(tightListItemConfig.lineHeight)};
`

const Content = styled(HStack)`
  ${cropText};
  > * {
    ${cropText};
  }
`

export const FocusTaskOption = () => {
  const { id, projectId } = useCurrentTask()
  const [{ taskId }, setState] = useFocusLauncher()

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
          <Content gap={focusOptionPadding}>
            <Spacer {...actionSize} />
            <TaskPrimaryContent />
          </Content>
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
