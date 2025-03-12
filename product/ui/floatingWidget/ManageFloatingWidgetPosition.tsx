import { FloatingFocusManager } from '@floating-ui/react'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { RectangleCorner } from '@lib/ui/entities/RectangleCorner'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { RectangleCornerIcon } from '@lib/ui/icons/RectangleCornerIcon'
import { IsActiveProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

import { useFloatingWidgetPosition } from './state/floatingWidgetPosition'

const Container = styled(IconButton)<IsActiveProp>`
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getColor('contrast')};
      background: ${getColor('background')};
      outline: 1px solid ${getColor('mist')};
    `}
`

const OptionsContainer = styled(FloatingOptionsContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  background: ${getColor('background')};
  padding: 8px;
  outline: 1px solid ${getColor('mist')};
`

type OptionItemProps = IsActiveProp & {
  isSelected: boolean
}

const OptionItem = styled.div<OptionItemProps>`
  ${borderRadius.s};
  ${sameDimensions(40)};
  border: 2px solid ${getColor('mistExtra')};
  outline: none;
  ${interactive};

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: ${getColor('primary')};
      border-color: ${getColor('primary')};
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      ${interactive};
      border-color: ${getColor('contrast')};
    `}
`

export const ManageFloatingWidgetPosition = () => {
  const [position, setPosition] = useFloatingWidgetPosition()
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
    strategy: 'fixed',
  })

  const options: RectangleCorner[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ]

  return (
    <>
      <Container
        isActive={isOpen}
        {...getReferenceProps()}
        kind="secondary"
        title="Reposition the widget"
        icon={<RectangleCornerIcon value={position} />}
      />
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus={false}>
          <OptionsContainer {...getFloatingProps()}>
            {options.map((option, index) => (
              <OptionItem
                isActive={activeIndex === index}
                isSelected={option === position}
                key={option}
                {...getOptionProps({
                  index,
                  onSelect: () => {
                    setPosition(option)
                    setIsOpen(false)
                  },
                })}
              />
            ))}
          </OptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
