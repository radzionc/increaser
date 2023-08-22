import { breakMinutesOptions } from 'break/breakDuration'
import { BreakDuration } from 'break/context/BreakContext'
import { useBreak } from 'break/hooks/useBreak'
import { useLastSetEnd } from 'sets/hooks/useLastSetEnd'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { toPercents } from '@increaser/utils/toPercents'
import styled, { css, useTheme } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { MS_IN_MIN } from 'utils/time'

import { BreakEducation } from '../BreakEducation'
import { remindersCount } from '../BreakProvider'
import { BreakSettings } from '../BreakSettings'
import { BreakCountdown } from './BreakCountdown'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { getLastItem } from '@increaser/utils/getLastItem'

const Wrapper = styled.div`
  position: relative;
  height: 8px;
  width: 100%;
  margin-bottom: 20px;
`

const Line = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
`

const Filler = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
`

const BreakDurationContainer = styled(UnstyledButton)<{
  isSelected?: boolean
  isAvailable: boolean
}>`
  position: absolute;
  top: 0;
  padding-top: 12px;
  padding-right: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  border-right: 1px solid ${getColor('mistExtra')};
  font-weight: 600;

  ${defaultTransitionCSS}

  ${({ isSelected, theme, isAvailable }) =>
    isSelected
      ? css`
          color: ${theme.colors.contrast.toCssValue()};
        `
      : isAvailable
      ? css`
          :hover {
            color: ${theme.colors.textSupporting.toCssValue()};
          }
        `
      : css``}
`

export const BreakTimeline = () => {
  const lastSetEnd = useLastSetEnd()
  const now = useRhythmicRerender(2000)
  const { breakDuration, setBreakDuration } = useBreak()
  const todayStartedAt = useStartOfDay()

  const { colors } = useTheme()
  const timelineInMinutes = getLastItem(breakMinutesOptions) + remindersCount
  if (!lastSetEnd) return null
  const minutesPassed = (now - lastSetEnd) / MS_IN_MIN

  const renderFillers = () => {
    if (breakDuration) {
      return (
        <>
          <Filler
            style={{
              width: toPercents(
                Math.min(
                  minutesPassed / timelineInMinutes,
                  breakDuration === 'long'
                    ? 1
                    : breakDuration / timelineInMinutes,
                ),
              ),
              background: colors.success.toCssValue(),
            }}
          />
          {breakDuration !== 'long' && minutesPassed > breakDuration && (
            <Filler
              style={{
                width: toPercents(
                  (minutesPassed - breakDuration) / timelineInMinutes,
                ),
                background: colors.idle.toCssValue(),
              }}
            />
          )}
        </>
      )
    }

    return (
      <Filler
        style={{ width: toPercents(minutesPassed / timelineInMinutes) }}
      />
    )
  }

  const onSelect = (duration: BreakDuration) => {
    if (breakDuration === duration) {
      setBreakDuration(undefined)
    } else {
      setBreakDuration(duration)
    }
  }

  if (todayStartedAt > lastSetEnd) return null

  return (
    <VStack gap={20}>
      <HStack
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={16}
      >
        <BreakCountdown />
        <HStack gap={16} alignItems="center">
          {breakDuration && (
            <Button
              onClick={() => {
                setBreakDuration(undefined)
              }}
              kind="secondary"
            >
              Cancel
            </Button>
          )}
          <BreakSettings />
        </HStack>
      </HStack>
      {minutesPassed < timelineInMinutes && (
        <VStack gap={8}>
          <BreakEducation />
          <Wrapper>
            <Line>{renderFillers()}</Line>
            {breakMinutesOptions.map((minutes) => {
              const text = `${minutes} min`
              const isSelected = minutes === breakDuration
              const isAvailable = minutes > minutesPassed
              return (
                <BreakDurationContainer
                  key={minutes}
                  isAvailable={isAvailable}
                  as={isAvailable ? 'button' : 'div'}
                  isSelected={isSelected}
                  style={{
                    right: toPercents(
                      (timelineInMinutes - minutes) / timelineInMinutes,
                    ),
                  }}
                >
                  <BreakDurationContent
                    onClick={isAvailable ? () => onSelect(minutes) : undefined}
                    isAvailable={isAvailable}
                  >
                    {text}
                  </BreakDurationContent>
                </BreakDurationContainer>
              )
            })}
            <BreakDurationContainer
              isSelected={breakDuration === 'long'}
              isAvailable
              style={{
                right: 0,
                borderRight: 'none',
                paddingLeft: 4,
              }}
            >
              <BreakDurationContent
                onClick={() => onSelect('long')}
                isAvailable
              >
                long
              </BreakDurationContent>
            </BreakDurationContainer>
          </Wrapper>
        </VStack>
      )}
    </VStack>
  )
}

const BreakDurationContent = styled.div<{ isAvailable: boolean }>`
  border-bottom: 1px dashed;
  ${({ isAvailable }) =>
    !isAvailable &&
    css`
      border-color: transparent;
    `};
`
