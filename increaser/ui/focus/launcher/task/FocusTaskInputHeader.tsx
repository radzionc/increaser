import { HStack } from '@lib/ui/css/stack'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { ValueProp, OnRemoveProp } from '@lib/ui/props'
import styled from 'styled-components'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Spacer } from '@lib/ui/layout/Spacer'

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
import { FocusEntityInputLabel } from '../focusEntity/FocusEntityInputContent'
import { FocusEntityInputIndicator } from '../focusEntity/FocusEntityInputContent'
import { FocusEntityInputUnderline } from '../focusEntity/FocusEntityInputContent'
import { FocusEntityInputContent } from '../focusEntity/FocusEntityInputContent'
import { FocusEntityInputContainer } from '../focusEntity/FocusEntityInputContainer'
import { focusEntityConfig } from '../focusEntity/config'

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
