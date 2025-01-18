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
import { Spacer } from '@lib/ui/layout/Spacer'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'

import { HeaderPromptContentFrame } from '../HeaderPromptContentFrame'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { Task } from '@increaser/entities/Task'
import { TaskCheckBox } from '@increaser/ui/tasks/TaskCheckBox'
import { Wrap } from '@lib/ui/base/Wrap'
import { cropText } from '@lib/ui/css/cropText'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { FocusTaskOptionContent } from './FocusTaskOptionContent'
import {
  FocusIconButton,
  focusIconButtonSize,
} from '../../FocusSetWidget/FocusIconButton'
import { FocusEntityInputContainer } from '../FocusEntityInputContainer'

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
  gap: 8px;

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

const TaskContent = styled(HStack)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  width: 100%;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`

export const TaskTextContainer = styled(HStack)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  flex: 1;
  align-items: center;
  gap: 8px;
  ${cropText};
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
    <Wrap
      wrap={
        value
          ? (children) => (
              <CurrentTaskProvider value={value}>
                {children}
              </CurrentTaskProvider>
            )
          : undefined
      }
    >
      <FocusEntityInputContainer
        actions={
          value
            ? {
                checkbox: {
                  node: <TaskCheckBox />,
                  placerStyles: {
                    left: panelDefaultPadding,
                  },
                },
                clear: {
                  node: (
                    <FocusIconButton
                      kind="secondary"
                      title="Clear"
                      icon={<CloseIcon />}
                      onClick={() => {
                        onRemove()
                        setIsOpen(false)
                      }}
                    />
                  ),
                  placerStyles: {
                    right: panelDefaultPadding + focusIconButtonSize,
                  },
                },
              }
            : {}
        }
        render={({ actions }) => (
          <Content onClick={() => setIsOpen(!isOpen)}>
            {value ? (
              <TaskContent alignItems="center" gap={12}>
                <Spacer {...actions.checkbox.size} />
                <FocusTaskOptionContent />
              </TaskContent>
            ) : (
              <HeaderPromptContentFrame icon={productToolIconRecord.tasks}>
                <Label>Select a task</Label>
              </HeaderPromptContentFrame>
            )}

            <HStack>
              {actions.clear && <Spacer width={actions.clear.size.width} />}
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
    </Wrap>
  )
}
