import { FloatingFocusManager } from '@floating-ui/react'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { hStack } from '@lib/ui/css/stack'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { slashSeparator } from '@lib/ui/layout/StackSeparatedBy'
import { IsActiveProp } from '@lib/ui/props'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { focusDurations } from '@product/entities/FocusDuration'
import styled, { css } from 'styled-components'

import { useFocusDuration } from '../state/focusDuration'
import { useUserChangedFocusDurationAt } from '../state/useUserChangedFocusDurationAt'

const gap = 12

const Container = styled(UnstyledButton)<IsActiveProp>`
  ${hStack({
    fullHeight: true,
    alignItems: 'center',
    gap,
  })}

  font-weight: 600;
  font-size: 12px;
  position: relative;

  ${horizontalPadding(gap)};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
        `
      : css`
          &:hover {
            color: ${getColor('contrast')};
          }
        `}
`

export const FocusDurationSelector = () => {
  const [focusDuration, setFocusDuration] = useFocusDuration()
  const [, setTime] = useUserChangedFocusDurationAt()

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    selectedIndex: focusDurations.indexOf(focusDuration),
    strategy: 'fixed',
    options: focusDurations.map((option) => option.toString()),
  })

  return (
    <>
      <Container {...getReferenceProps()} isActive={isOpen}>
        <Text color="shy" as="span">
          {slashSeparator}
        </Text>
        <Text>{focusDuration} min</Text>
      </Container>
      {isOpen && (
        <FloatingFocusManager context={context} modal>
          <FloatingOptionsContainer {...getFloatingProps()}>
            {focusDurations.map((option, index) => (
              <OptionItem
                key={index}
                isActive={activeIndex === index}
                {...getOptionProps({
                  index,
                  onSelect: () => {
                    setTime(Date.now())
                    setFocusDuration(option)
                    setIsOpen(false)
                  },
                })}
              >
                <OptionContent key={option}>
                  <WithSelectionMark isSelected={option === focusDuration}>
                    {option} min
                  </WithSelectionMark>
                </OptionContent>
              </OptionItem>
            ))}
          </FloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
