import styled, { css } from 'styled-components'
import { absoluteOutline } from '../css/absoluteOutline'
import { borderRadius } from '../css/borderRadius'
import { interactive } from '../css/interactive'
import { transition } from '../css/transition'
import { FloatingOptionsContainer } from '../floating/FloatingOptionsContainer'
import { useFloatingOptions } from '../floating/useFloatingOptions'
import { ChevronDownIcon } from '../icons/ChevronDownIcon'
import { IconWrapper } from '../icons/IconWrapper'
import { HStack } from '../layout/Stack'
import { InputProps, UIComponentProps } from '../props'
import { getColor } from '../theme/getters'
import { getHoverVariant } from '../theme/getHoverVariant'

export type ExpandableSelectorProp<T> = UIComponentProps &
  InputProps<T> & {
    isDisabled?: boolean
    options: T[]
    getOptionKey: (option: T) => string
    renderOption: (option: T) => React.ReactNode
  }

const ToggleIconContainer = styled(IconWrapper)<{ isOpen: boolean }>`
  font-size: 16px;
  ${transition};
  transform: rotateZ(${({ isOpen }) => (isOpen ? '-180deg' : '0deg')});
  color: ${getColor('textSupporting')};
`

const activeContainer = css`
  background: ${getHoverVariant('foreground')};
  ${ToggleIconContainer} {
    color: ${getColor('contrast')};
  }
`

const Container = styled(HStack)<{ isActive: boolean; isDisabled?: boolean }>`
  ${borderRadius.s};
  outline: none;
  border: 1px solid ${getColor('mist')};
  padding: 8px 12px;
  background: ${getColor('foreground')};
  ${transition};
  font-size: 14px;

  align-items: center;
  gap: 4px;
  justify-content: space-between;

  ${({ isDisabled }) =>
    isDisabled
      ? css`
          pointer-events: none;
          opacity: 0.4;
        `
      : css`
          ${interactive};

          &:hover {
            ${activeContainer}
          }
        `}

  ${({ isActive }) => isActive && activeContainer}
`

const OptionItem = styled.div<{ isActive: boolean }>`
  outline: none;
  font-size: 14px;
  ${interactive};
  color: ${getColor('textSupporting')};
  position: relative;
  padding: 8px 8px;
  border-radius: 8px;

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
      color: ${getColor('contrast')};
    `}
`

const Outline = styled.div`
  ${absoluteOutline(0, 0)};
  background: transparent;
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
`

export function ExpandableSelector<T>({
  value,
  onChange,
  options,
  isDisabled,
  renderOption,
  getOptionKey,
  ...rest
}: ExpandableSelectorProp<T>) {
  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
  } = useFloatingOptions({
    selectedIndex: options.indexOf(value),
  })

  const referenceProps = isDisabled ? {} : getReferenceProps()

  return (
    <>
      <Container
        isDisabled={isDisabled}
        isActive={isOpen}
        {...referenceProps}
        {...rest}
      >
        {renderOption(value)}
        <ToggleIconContainer isOpen={isOpen}>
          <ChevronDownIcon />
        </ToggleIconContainer>
      </Container>
      {isOpen && !isDisabled && (
        <FloatingOptionsContainer {...getFloatingProps()}>
          {options.map((option, index) => (
            <OptionItem
              isActive={activeIndex === index}
              key={getOptionKey(option)}
              {...getOptionProps({
                index,
                onSelect: () => {
                  onChange(option)
                  setIsOpen(false)
                },
              })}
            >
              {renderOption(option)}
              {option === value && <Outline />}
            </OptionItem>
          ))}
        </FloatingOptionsContainer>
      )}
    </>
  )
}
