import { HStack } from '@lib/ui/css/stack'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ValueProp, OnRemoveProp } from '@lib/ui/props'
import { ReactNode } from 'react'

import {
  FocusIconButton,
  focusIconButtonSize,
} from '../../FocusSetWidget/FocusIconButton'
import { HeaderPromptContentFrame } from '../HeaderPromptContentFrame'

import { focusEntityConfig } from './config'
import { FocusEntityInputContainer } from './FocusEntityInputContainer'
import {
  FocusEntityInputIndicator,
  FocusEntityInputLabel,
  FocusEntityInputUnderline,
} from './FocusEntityInputContent'
import { FocusEntityInputContent } from './FocusEntityInputContent'

type FocusEntityInputHeaderProps<T> = OnRemoveProp &
  ValueProp<T> & {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void

    entityName: string
    icon: ReactNode

    renderValue: (value: NonNullable<T>) => ReactNode
  }

export function FocusEntityInputHeader<T>({
  value,
  renderValue,

  isOpen,
  setIsOpen,

  onRemove,
  entityName,
  icon,
}: FocusEntityInputHeaderProps<T>) {
  return (
    <FocusEntityInputContainer
      actions={
        value
          ? {
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
            renderValue(value)
          ) : (
            <HeaderPromptContentFrame icon={icon}>
              <FocusEntityInputLabel>Select {entityName}</FocusEntityInputLabel>
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
  )
}
