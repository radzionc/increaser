import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { HStack } from '@lib/ui/css/stack'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { ComponentWithValueProps, RemovableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { getColor } from '@lib/ui/theme/getters'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { interactive } from '@lib/ui/css/interactive'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { FocusIconButton } from '../../components/FocusSetWidget/FocusIconButton'
import { focusLauncherConfig } from '../config'
import { HeaderPromptContentFrame } from '../HeaderPromptContentFrame'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import { TaskPrimaryContent } from '@increaser/ui/tasks/TaskPrimaryContent'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { Task } from '@increaser/entities/Task'

const Container = styled(ActionInsideInteractiveElement)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: ${toSizeUnit(focusLauncherConfig.sectionMinHeight)};
  position: relative;
`

const Label = styled(Text)`
  color: ${getColor('textSupporting')};
`

const Indicator = styled(FocusIconButton)``

const Underline = styled.div`
  ${absoluteOutline(0, 2)};
  border-bottom: 2px dashed ${getColor('mistExtra')};
`

const Content = styled(HStack)`
  align-items: center;
  justify-content: space-between;

  position: relative;

  ${interactive};
  ${takeWholeSpace};

  ${horizontalPadding(panelDefaultPadding)};

  &:hover ${Indicator} {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }

  &:hover ${Label} {
    color: ${getColor('textPrimary')};
  }
`

type FocusTaskInputHeaderProps = RemovableComponentProps &
  ComponentWithValueProps<Task | null> & {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
  }

export function FocusTaskInputHeader({
  value,

  isOpen,
  setIsOpen,

  onRemove,
}: FocusTaskInputHeaderProps) {
  return (
    <Container
      actionPlacerStyles={{ right: 60 }}
      action={
        value ? (
          <FocusIconButton
            kind="secondary"
            title="Clear"
            icon={<CloseIcon />}
            onClick={() => {
              onRemove()
              setIsOpen(false)
            }}
          />
        ) : null
      }
      render={({ actionSize }) => (
        <Content onClick={() => setIsOpen(!isOpen)}>
          {value ? (
            <CurrentTaskProvider value={value}>
              <TaskPrimaryContent cropped />
            </CurrentTaskProvider>
          ) : (
            <HeaderPromptContentFrame icon={productToolIconRecord.tasks}>
              <Label>Select a task</Label>
            </HeaderPromptContentFrame>
          )}

          <HStack>
            {actionSize && <Spacer width={actionSize.width} />}
            <Indicator
              forwardedAs="div"
              kind="secondary"
              icon={<CollapsableStateIndicator isOpen={isOpen} />}
              title={value ? 'Close' : 'Open'}
            />
          </HStack>
          {isOpen && <Underline />}
        </Content>
      )}
    />
  )
}
