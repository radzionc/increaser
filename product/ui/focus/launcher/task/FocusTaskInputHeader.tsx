import { Wrap } from '@lib/ui/base/Wrap'
import { cropText } from '@lib/ui/css/cropText'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { Spacer } from '@lib/ui/layout/Spacer'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { ValueProp, OnRemoveProp } from '@lib/ui/props'
import { Task } from '@product/entities/Task'
import { CurrentTaskProvider } from '@product/ui/tasks/CurrentTaskProvider'
import { TaskCheckBox } from '@product/ui/tasks/TaskCheckBox'
import { productToolIconRecord } from '@product/ui/tools/productToolIconRecord'
import styled from 'styled-components'

import {
  FocusIconButton,
  focusIconButtonSize,
} from '../../FocusSetWidget/FocusIconButton'
import { focusEntityConfig } from '../focusEntity/config'
import { FocusEntityInputContainer } from '../focusEntity/FocusEntityInputContainer'
import { FocusEntityInputLabel } from '../focusEntity/FocusEntityInputContent'
import { FocusEntityInputIndicator } from '../focusEntity/FocusEntityInputContent'
import { FocusEntityInputUnderline } from '../focusEntity/FocusEntityInputContent'
import { FocusEntityInputContent } from '../focusEntity/FocusEntityInputContent'
import { HeaderPromptContentFrame } from '../HeaderPromptContentFrame'

import { FocusTaskOptionContent } from './FocusTaskOptionContent'

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

type FocusTaskInputHeaderProps = OnRemoveProp &
  ValueProp<Task | null> & {
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
                    right: focusEntityConfig.rightPadding + focusIconButtonSize,
                  },
                },
              }
            : {}
        }
        render={({ actions }) => (
          <FocusEntityInputContent onClick={() => setIsOpen(!isOpen)}>
            {value ? (
              <TaskContent alignItems="center" gap={12}>
                <Spacer {...actions.checkbox.size} />
                <FocusTaskOptionContent />
              </TaskContent>
            ) : (
              <HeaderPromptContentFrame icon={productToolIconRecord.tasks}>
                <FocusEntityInputLabel>Select a task</FocusEntityInputLabel>
              </HeaderPromptContentFrame>
            )}

            <HStack>
              {actions.clear && <Spacer width={actions.clear.size.width} />}
              <FocusEntityInputIndicator
                forwardedAs="div"
                kind="secondary"
                icon={<CollapsableStateIndicator isOpen={isOpen} />}
                title={value ? 'Close' : 'Open'}
              />
            </HStack>
            {isOpen && <FocusEntityInputUnderline />}
          </FocusEntityInputContent>
        )}
      />
    </Wrap>
  )
}
