import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { formatTime } from '@increaser/utils/time/formatTime'
import { getDateFromMinutes } from '@increaser/utils/time/getDateFromMinutes'
import { range } from '@increaser/utils/array/range'
import { toPercents } from '@increaser/utils/toPercents'
import styled from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from '@increaser/utils/time'

import { useTodayTimelineBoundaries } from './useTodayTimelineBoundaries'
import { WorkdayLeftBlock } from './WorkdayLeftBlock'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getOutlineCSS } from '@increaser/ui/ui/utils/getOutlineCSS'

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

const Content = styled.div<{ leftOffset: number }>`
  position: absolute;
  width: calc(100% - ${(p) => p.leftOffset}px);
  height: 100%;
  left: ${(p) => p.leftOffset}px;
  display: flex;
`

const WorkdayLeft = styled(WorkdayLeftBlock)`
  width: calc(100% + 40px);
  left: -20px;
`

const Boundary = styled(HourWr)`
  position: absolute;
`

const CurrentTimeWrapper = styled.div`
  position: relative;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  ${centerContentCSS};
`

const CurrentTimeLine = styled.div`
  position: absolute;
  width: calc(100% + 40px);
  left: -20px;
  border-top: 2px solid ${getColor('primary')};
`

const EndOfWorkDayLine = styled.div`
  position: absolute;
  width: calc(100% + 40px);
  left: -20px;
  border-top: 2px solid ${getColor('textShy')};
`

const Outline = styled.div`
  ${getOutlineCSS(6, 6)};
  background: transparent;
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
  background: ${getColor('background')};
`

const EndOfWorkdayOutline = styled.div`
  ${getOutlineCSS(6, 6)};
  background: transparent;
  border-radius: 8px;
  background: ${getColor('background')};
  border: 2px solid ${getColor('textShy')};
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
  const workEndsAt = todayStartedAt + goalToFinishWorkBy * MS_IN_MIN

  return (
    <Container justifyContent="space-between" fullHeight fullWidth>
      <WorkdayLeft
        style={{
          top: toPercents((now - timelineStartedAt) / timelineInMs),
          height: toPercents((workEndsAt - now) / timelineInMs),
        }}
      />
      <EndOfWorkDayLine
        style={{
          top: toPercents((workEndsAt - timelineStartedAt) / timelineInMs),
        }}
      />
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
                  isEndOfWorkday ? (
                    <CurrentTimeWrapper>
                      {formatTime(now)}
                      <EndOfWorkdayOutline />
                      <Text
                        weight="semibold"
                        as="span"
                        color="contrast"
                        style={{ position: 'absolute' }}
                      >
                        {formatTime(getDateFromMinutes(minutes).getTime())}
                      </Text>
                    </CurrentTimeWrapper>
                  ) : (
                    <Text weight={'regular'} color={'shy'} size={14}>
                      {formatTime(getDateFromMinutes(minutes).getTime())}
                    </Text>
                  )
                ) : (
                  <div />
                )}
                <HourLine />
              </HourContent>
            </HourContainer>
          </HourWr>
        )
      })}

      <CurrentTimeLine
        style={{
          top: toPercents((now - timelineStartedAt) / timelineInMs),
        }}
      />
      <Boundary
        style={{
          top: toPercents((now - timelineStartedAt) / timelineInMs),
        }}
      >
        <HourContainer>
          <HourContent labelWidth={hourLabelWidthInPx}>
            <CurrentTimeWrapper>
              {formatTime(now)}
              <Outline />
              <Text
                weight="semibold"
                as="span"
                color="contrast"
                style={{ position: 'absolute' }}
              >
                {formatTime(now)}
              </Text>
            </CurrentTimeWrapper>
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
