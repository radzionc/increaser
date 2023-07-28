import { useFocus } from 'focus/hooks/useFocus'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from 'shared/props'
import { formatTime } from 'shared/utils/formatTime'
import { getDateFromMinutes } from 'shared/utils/getDateFromMinutes'
import { range } from 'shared/utils/range'
import { toPercents } from 'shared/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from 'utils/time'

import { useTodayTimelineBoundaries } from './useTodayTimelineBoundaries'

interface Props extends ComponentWithChildrenProps {}

const Container = styled(VStack)`
  position: relative;
  flex: 1;
`

const HourWr = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const HourContainer = styled.div`
  position: absolute;
  width: 100%;
`

const hourLabelGap = 8

const HourContent = styled.div<{ labelWidth: number }>`
  width: 100%;
  display: grid;
  gap: ${hourLabelGap}px;
  grid-template-columns: ${({ labelWidth }) => labelWidth}px 1fr;
  align-items: center;
`

const HourLine = styled.div`
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  height: 1px;
  width: 100%;
`

const BoundaryLine = styled.div`
  border-bottom: 1px dashed;
  width: 100%;
`

const Content = styled.div<{ leftOffset: number }>`
  position: absolute;
  width: calc(100% - ${(p) => p.leftOffset}px);
  height: 100%;
  left: ${(p) => p.leftOffset}px;
  display: flex;
`

const Boundary = styled(HourWr)`
  position: absolute;
  width: 100%;
`

const hourLabelWidthInPx = 40
const lineMinutesStep = 30

export const TodayTimelineHourSpace = ({ children }: Props) => {
  const now = useRhythmicRerender()
  const todayStartedAt = useStartOfDay()

  const { start, end } = useTodayTimelineBoundaries()

  const lines: number[] = []
  const tinelineInMinutes = end - start
  const stepsNumber = tinelineInMinutes / 30 + 1
  range(stepsNumber).forEach((index) => {
    const minutes = start + index * lineMinutesStep
    if (minutes === start || minutes === end) {
      lines.push(minutes)
    } else {
      const isHour = minutes % 60 === 0
      if (isHour) {
        lines.push(minutes)
      }
    }
  })

  const timelineInMs = tinelineInMinutes * MS_IN_MIN
  const timelineStartedAt = todayStartedAt + start * MS_IN_MIN

  const { goalToFinishWorkBy } = useAssertUserState()

  const { colors } = useTheme()

  const { currentSet } = useFocus()

  return (
    <Container justifyContent="space-between" fullHeight fullWidth>
      {range(stepsNumber).map((index) => {
        const minutes = start + index * lineMinutesStep

        if (![start, end].includes(minutes) && minutes % 60 !== 0) {
          return <HourWr key={minutes} />
        }

        const shouldDisplayLabel = [(now - todayStartedAt) / MS_IN_MIN].every(
          (breakpoint) => {
            return minutes < breakpoint - 25 || minutes > breakpoint + 25
          },
        )
        const isEndOfWorkday = minutes === goalToFinishWorkBy
        return (
          <HourWr key={minutes}>
            <HourContainer>
              <HourContent labelWidth={hourLabelWidthInPx}>
                {shouldDisplayLabel ? (
                  <Text color={isEndOfWorkday ? 'supporting' : 'shy'} size={14}>
                    {formatTime(getDateFromMinutes(minutes).getTime())}
                  </Text>
                ) : (
                  <div />
                )}
                <HourLine
                  style={
                    isEndOfWorkday
                      ? { background: colors.textSupporting.toCssValue() }
                      : undefined
                  }
                />
              </HourContent>
            </HourContainer>
          </HourWr>
        )
      })}

      <Boundary
        style={{
          top: toPercents((now - timelineStartedAt) / timelineInMs),
        }}
      >
        <HourContainer>
          <HourContent labelWidth={hourLabelWidthInPx}>
            <Text weight="semibold" size={14}>
              {formatTime(now)}
            </Text>
            {!currentSet && <BoundaryLine />}
          </HourContent>
        </HourContainer>
      </Boundary>
      {children && (
        <Content leftOffset={hourLabelWidthInPx + hourLabelGap}>
          {children}
        </Content>
      )}
    </Container>
  )
}
