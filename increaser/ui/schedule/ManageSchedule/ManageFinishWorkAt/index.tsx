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

import { range } from '@lib/utils/array/range'
import { useUser } from '@increaser/ui/user/state/user'
import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { FloatingOptionsContainer } from '@lib/ui/floating/FloatingOptionsContainer'
import { WithSelectionMark } from '@lib/ui/select/WithSelectionMark'
import { useUpdateUserMutation } from '../../../user/mutations/useUpdateUserMutation'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { FlagIcon } from '@lib/ui/icons/FlagIcon'

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

const dayMomentStep = 30

export const ManageFinishWorkAt = () => {
  const { finishWorkAt } = useUser()
  const { mutate: updateUser } = useUpdateUserMutation()

  const min = convertDuration(12, 'h', 'min')
  const max = convertDuration(24, 'h', 'min')

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
    selectedIndex: options.indexOf(finishWorkAt),
    options: options.map((option) => option.toString()),
  })

  const theme = useTheme()
  const color = theme.colors.alert

  return (
    <>
      <Container isActive={isOpen} {...getReferenceProps()}>
        <HStack style={{ minWidth: 132 }} alignItems="center" gap={8}>
          <IconWrapper style={{ color: color.toCssValue() }}>
            <FlagIcon />
          </IconWrapper>
          <Text weight="500" as="div">
            Finish work at
          </Text>
        </HStack>
        <Text weight="600">{formatDailyEventTime(finishWorkAt)}</Text>
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
                  updateUser({ finishWorkAt: option })
                  setIsOpen(false)
                },
              })}
            >
              <WithSelectionMark isSelected={option === finishWorkAt}>
                {formatDailyEventTime(option)}
              </WithSelectionMark>
            </TimeOption>
          ))}
        </FloatingOptionsContainer>
      )}
    </>
  )
}
