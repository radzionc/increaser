import { borderRadius } from '@lib/ui/css/borderRadius'
import { transition } from '@lib/ui/css/transition'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled, { useTheme } from 'styled-components'
import { css } from 'styled-components'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { interactive } from '@lib/ui/css/interactive'
import { TimeOption } from './TimeOption'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import {
  DayMoment,
  dayMomentShortName,
  dayMomentStep,
} from '@increaser/entities/DayMoments'
import { range } from '@lib/utils/array/range'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { dayMomentIcon } from '@increaser/ui/schedule/dayMomentIcon'
import { getDayMomentColor } from '@increaser/ui/schedule/utils/getDayMomentColor'
import { useSchedule } from '../../ScheduleContext'

interface ManageDayMomentProps {
  min: number
  max: number
  dayMoment: DayMoment
}

const Container = styled.div<{ isActive: boolean }>`
  ${borderRadius.m};
  ${interactive};
  outline: none;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 1px;
  overflow: hidden;
  padding: 12px 16px;
  background: ${getColor('foreground')};
  ${transition};

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
    `}

  &:hover {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }
`

const Outline = styled.div`
  ${absoluteOutline(0, 0)};
  background: transparent;
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
`

export const ManageDayMoment = ({
  min,
  max,
  dayMoment,
}: ManageDayMomentProps) => {
  const user = useAssertUserState()
  const value = user[dayMoment]

  const { updateDayMoment } = useSchedule()

  const options = range(Math.round((max - min) / dayMomentStep) + 1).map(
    (step) => min + dayMomentStep * step,
  )

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
  } = useFloatingOptions({
    selectedIndex: options.indexOf(value),
    options: options.map((option) => option.toString()),
  })

  const theme = useTheme()
  const color = getDayMomentColor(dayMoment, theme)

  return (
    <>
      <Container isActive={isOpen} {...getReferenceProps()}>
        <HStack style={{ minWidth: 132 }} alignItems="center" gap={8}>
          <IconWrapper style={{ color: color.toCssValue() }}>
            {dayMomentIcon[dayMoment]}
          </IconWrapper>
          <Text weight="semibold" as="div">
            {dayMomentShortName[dayMoment]}
          </Text>
        </HStack>
        <Text weight="bold">{formatDailyEventTime(value)}</Text>
      </Container>
      {isOpen && (
        <FloatingOptionsContainer {...getFloatingProps()}>
          {options.map((option, index) => (
            <TimeOption
              isActive={activeIndex === index}
              key={option}
              {...getOptionProps({
                index,
                onSelect: () => {
                  updateDayMoment(dayMoment, option)
                  setIsOpen(false)
                },
              })}
            >
              {formatDailyEventTime(option)}
              {option === value && <Outline />}
            </TimeOption>
          ))}
        </FloatingOptionsContainer>
      )}
    </>
  )
}
