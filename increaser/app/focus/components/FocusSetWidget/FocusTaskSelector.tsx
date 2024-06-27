import { getColor } from '@lib/ui/theme/getters'

import styled, { css } from 'styled-components'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { Task } from '@increaser/entities/Task'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { transition } from '@lib/ui/css/transition'
import { ComponentWithActiveState } from '@lib/ui/props'
import { interactive } from '@lib/ui/css/interactive'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { FloatingFocusManager } from '@floating-ui/react'
import { HStack } from '@lib/ui/layout/Stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { focusSetWidgetConfig } from './config'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'

type FocusTaskSelectorProps = {
  options: Task[]
  onAdd: () => void
}

const ToggleIconContainer = styled(CollapsableStateIndicator)`
  font-size: 16px;
  ${transition};
  color: ${getColor('textSupporting')};
`

const activeContainer = css`
  background: ${getColor('foreground')};
  ${ToggleIconContainer} {
    color: ${getColor('contrast')};
  }
`

const Container = styled(HStack)<ComponentWithActiveState>`
  ${interactive};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  ${transition};
  font-weight: 500;
  background: ${getColor('background')};
  padding: ${toSizeUnit(focusSetWidgetConfig.padding)};

  &:hover {
    ${activeContainer}
  }

  ${({ isActive }) => isActive && activeContainer}
`

export const FocusTaskSelector = ({
  options,
  onAdd,
}: FocusTaskSelectorProps) => {
  const { updateTask } = useFocus()
  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    selectedIndex: null,
  })

  return (
    <>
      <Container isActive={isOpen} {...getReferenceProps()}>
        <OptionContent>Select a task</OptionContent>
        <ToggleIconContainer isOpen={isOpen} />
      </Container>
      {isOpen && (
        <FloatingFocusManager context={context} modal>
          <FloatingOptionsContainer {...getFloatingProps()}>
            {options.map((option, index) => (
              <OptionItem
                isActive={activeIndex === index}
                {...getOptionProps({
                  index,
                  onSelect: () => {
                    updateTask({
                      id: option.id,
                      startedAt: Date.now(),
                    })
                    setIsOpen(false)
                  },
                })}
              >
                <OptionContent key={option.id}>{option.name}</OptionContent>
              </OptionItem>
            ))}
            <OptionItem
              isActive={activeIndex === options.length}
              {...getOptionProps({
                index: options.length,
                onSelect: () => {
                  onAdd()
                },
              })}
            >
              <OptionContent key="add">
                <HStack gap={8} alignItems="center">
                  <IconWrapper>
                    <PlusIcon />
                  </IconWrapper>
                  Add a task
                </HStack>
              </OptionContent>
            </OptionItem>
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
