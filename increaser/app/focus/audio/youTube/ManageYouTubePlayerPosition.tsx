import { IconButton } from '@lib/ui/buttons/IconButton'
import { useYouTubePlayerPosition } from './state/useYouTubePlayerPosition'
import { RectangleCornerIcon } from '@lib/ui/icons/RectangleCornerIcon'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import styled, { css } from 'styled-components'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { FloatingFocusManager } from '@floating-ui/react'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { RectangleCorner } from '@lib/ui/entities/RectangleCorner'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { interactive } from '@lib/ui/css/interactive'

const Container = styled(IconButton)<ComponentWithActiveState>`
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

type OptionItemProps = ComponentWithActiveState & {
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

export const ManageYouTubePlayerPosition = () => {
  const [position, setPosition] = useYouTubePlayerPosition()
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
    floatingOptionsWidthSameAsOpener: false,
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
        title="Reposition the player"
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
