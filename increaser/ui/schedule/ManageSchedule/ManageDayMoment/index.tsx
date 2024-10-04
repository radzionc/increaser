import { borderRadius } from '@lib/ui/css/borderRadius'
import { transition } from '@lib/ui/css/transition'
import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled, { useTheme } from 'styled-components'
import { css } from 'styled-components'
import { interactive } from '@lib/ui/css/interactive'
import { TimeOption } from './TimeOption'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import {
  DayMoment,
  dayMomentShortName,
  dayMomentStep,
} from '@increaser/entities/DayMoments'
import { range } from '@lib/utils/array/range'
import { useUpdateUser, useUser } from '@increaser/ui/user/state/user'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { dayMomentIcon } from '@increaser/ui/schedule/dayMomentIcon'
import { getDayMomentColor } from '@increaser/ui/schedule/utils/getDayMomentColor'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'

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

export const ManageDayMoment = ({
  min,
  max,
  dayMoment,
}: ManageDayMomentProps) => {
  const user = useUser()
  const value = user[dayMoment]

  const updateUser = useUpdateUser()

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
          <Text weight="500" as="div">
            {dayMomentShortName[dayMoment]}
          </Text>
        </HStack>
        <Text weight="600">{formatDailyEventTime(value)}</Text>
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
                  updateUser({ [dayMoment]: option })
                  setIsOpen(false)
                },
              })}
            >
              <WithSelectionMark isSelected={option === value}>
                {formatDailyEventTime(option)}
              </WithSelectionMark>
            </TimeOption>
          ))}
        </FloatingOptionsContainer>
      )}
    </>
  )
}
