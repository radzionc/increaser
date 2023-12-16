import { InputProps } from '@increaser/ui/props'
import { borderRadius } from '@increaser/ui/css/borderRadius'
import { transition } from '@increaser/ui/css/transition'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { getColor } from '@increaser/ui/theme/getters'
import { useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { autoUpdate, offset, size } from '@floating-ui/dom'
import {
  FloatingPortal,
  FloatingFocusManager,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useClick,
  useDismiss,
} from '@floating-ui/react'
import { css } from 'styled-components'
import { absoluteOutline } from '@increaser/ui/css/absoluteOutline'
import { interactive } from '@increaser/ui/css/interactive'
import { TimeOption } from './TimeOption'
import { formatDayTimeBoudnary } from '@increaser/entities-utils/user/formatDayTimeBoundary'
import { getDayMomentColor } from 'sets/utils/getDayMomentColor'
import { IconWrapper } from '@increaser/ui/icons/IconWrapper'
import { dayMomentIcon } from '../dayMomentIcon'
import { toSizeUnit } from '@increaser/ui/css/toSizeUnit'
import { DayMoment, dayMomentShortName } from '@increaser/entities/DayMoments'

interface ManageDayMomentProps extends InputProps<number> {
  options: number[]
  dayMoment: DayMoment
}

const Container = styled.div<{ isActive: boolean }>`
  ${borderRadius.m};
  ${interactive};
  outline: none;

  display: flex;
  justify-content: space-between;
  min-width: 120px;
  flex-direction: row;
  gap: 1px;
  overflow: hidden;
  padding: 8px 12px;
  background: ${getColor('foreground')};
  ${transition};

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
    `}

  :hover {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }
`

const OptionsContainer = styled.div`
  ${borderRadius.m};
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 4px;
  background: ${getColor('foreground')};
  z-index: 1;
`

const Outline = styled.div`
  ${absoluteOutline(0, 0)};
  background: transparent;
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
`

export const ManageDayMoment = ({
  value,
  onChange,
  options,
  dayMoment,
}: ManageDayMomentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, context, floatingStyles } = useFloating({
    placement: 'bottom-end',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      size({
        apply({ elements, availableHeight, rects }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.min(availableHeight, 320)}px`,
            width: toSizeUnit(rects.reference.width),
          })
        },
        padding: 10,
      }),
    ],
  })

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const optionsRef = useRef<Array<HTMLElement | null>>([])

  const selectedIndex = options.indexOf(value)

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context, { event: 'mousedown' }),
      useRole(context, { role: 'listbox' }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: optionsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        loop: true,
      }),
    ],
  )

  const theme = useTheme()
  const color = getDayMomentColor(dayMoment, theme)

  return (
    <>
      <Container
        aria-labelledby="select-label"
        aria-autocomplete="none"
        isActive={isOpen}
        tabIndex={0}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <HStack style={{ minWidth: 132 }} alignItems="center" gap={8}>
          <IconWrapper style={{ color: color.toCssValue() }}>
            {dayMomentIcon[dayMoment]}
          </IconWrapper>
          <Text as="div">{dayMomentShortName[dayMoment]}</Text>
        </HStack>
        <Text weight="bold">{formatDayTimeBoudnary(value)}</Text>
      </Container>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <OptionsContainer
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {options.map((option, index) => (
                <TimeOption
                  isActive={activeIndex === index}
                  role="option"
                  tabIndex={activeIndex === index ? 0 : -1}
                  aria-selected={
                    index === selectedIndex && index === activeIndex
                  }
                  ref={(element) => {
                    optionsRef.current[index] = element
                  }}
                  key={option}
                  {...getItemProps({
                    onClick: () => {
                      onChange(option)
                      setIsOpen(false)
                    },
                    onKeyDown(event) {
                      if (event.key === 'Enter') {
                        console.log('here!')
                        event.preventDefault()
                        onChange(option)
                        setIsOpen(false)
                      }
                    },
                  })}
                >
                  {formatDayTimeBoudnary(option)}
                  {option === value && <Outline />}
                </TimeOption>
              ))}
            </OptionsContainer>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
