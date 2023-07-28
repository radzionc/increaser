import { getHours } from 'date-fns'
import { useMemo } from 'react'
import React from 'react'
import { getBlockColor, getBlockDuration, getBlocks } from 'sets/Block'
import { getSetDuration } from 'sets/helpers/getSetDuration'
import { useGroupedByDayCurrentWeekSets } from 'sets/hooks/useGroupedByDayCurrentWeekSets'
import { useWeekday } from 'shared/hooks/useWeekday'
import { getLast } from 'shared/utils/getLast'
import { toPercents } from 'shared/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MIN_IN_HOUR, MS_IN_HOUR } from 'utils/time'

import { BlockBoundaries } from '../BlockBoundaries'
import { CurrentTime } from './CurrentTime'
import { ScheduleHourSpace } from './ScheduleHourSpace'
import { Summary } from './Summary'
import { Weekdays } from './Weekdays'

const labelsWidth = 80

const toOrderedHours = (timestamps: number[]) =>
  timestamps.map((t) => getHours(new Date(t))).sort((a, b) => a - b)

const Boundaries = styled(BlockBoundaries)`
  color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  border: 1px solid;
  overflow: visible;

  p {
    margin-top: 0;
    margin-right: 4px;
  }
`

const SessionsContainer = styled.div`
  position: relative;
  height: 100%;
  flex: 1;
  ${centerContentCSS}
`

const Session = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 2px;
  ${defaultTransitionCSS}
`

const Container = styled(VStack)`
  flex: 1;
  width: 100%;
  min-height: 560px;
`

export const GroupedByDaySessions = () => {
  const theme = useTheme()
  const { colors } = theme

  const { goalToStartWorkAt, goalToFinishWorkBy } = useAssertUserState()

  const days = useGroupedByDayCurrentWeekSets()

  const [selectedDayIndex, setSelectedDayIndex] = React.useState<
    number | undefined
  >(undefined)

  const [startHour, endHour] = useMemo(() => {
    const groupedSets = days
      .map(({ sets }) => sets)
      .filter((sets) => sets.length > 0)

    const starts = groupedSets.map((sets) => sets[0].start)

    const finishWorkHour = Math.ceil(goalToFinishWorkBy / MIN_IN_HOUR)
    const startWorkHour = Math.floor(goalToStartWorkAt / MIN_IN_HOUR)
    if (starts.length < 1) return [startWorkHour, finishWorkHour]

    const ends = groupedSets.map((sets) => getLast(sets).end)
    const startHour = Math.max(
      Math.min(toOrderedHours(starts)[0], startWorkHour),
      0,
    )

    const endHour = Math.min(
      24,
      Math.max(getLast(toOrderedHours(ends)) + 1, finishWorkHour),
    )

    return [startHour, endHour]
  }, [days, goalToFinishWorkBy, goalToStartWorkAt])

  const hoursNumber = endHour - startHour
  const timelineInMs = hoursNumber * MS_IN_HOUR

  const labelsSpacer = <Spacer width={labelsWidth} />

  const currentWeekday = useWeekday()

  return (
    <Container fullHeight fullWidth gap={20}>
      <HStack fullWidth>
        {labelsSpacer}
        <Weekdays />
      </HStack>
      <ScheduleHourSpace
        labelsWidth={labelsWidth}
        start={startHour}
        end={endHour}
      >
        {days.map(({ sets, startsAt }, dayIndex) => {
          const timelineStart = startsAt + startHour * MS_IN_HOUR

          const blocks = getBlocks(sets)

          const isSelected = selectedDayIndex === dayIndex

          const isToday = currentWeekday === dayIndex

          return (
            <SessionsContainer
              onMouseEnter={() => setSelectedDayIndex(dayIndex)}
              onMouseLeave={() => setSelectedDayIndex(undefined)}
              key={dayIndex}
            >
              {sets.map((set, index) => {
                const height = toPercents(getSetDuration(set) / timelineInMs)

                const top = toPercents(
                  (set.start - timelineStart) / timelineInMs,
                )

                return (
                  <Session
                    key={index}
                    style={{
                      height,
                      top,
                      background: colors.mist.toCssValue(),
                    }}
                  />
                )
              })}

              {isToday && (
                <CurrentTime
                  timelineInMs={timelineInMs}
                  timelineStart={timelineStart}
                />
              )}

              {blocks.map((block, index) => {
                const blockDuration = getBlockDuration(block)

                const { sets } = block

                return (
                  <React.Fragment key={`boundary=${index}`}>
                    <Boundaries
                      shouldShowDuration={isSelected}
                      block={block}
                      style={{
                        color: isSelected
                          ? getBlockColor(
                              blockDuration,
                              theme,
                              theme.colors.text,
                            )
                          : undefined,
                        fontSize: 12,
                        top: toPercents(
                          (sets[0].start - timelineStart) / timelineInMs,
                        ),
                        height: toPercents(blockDuration / timelineInMs),
                      }}
                    />
                  </React.Fragment>
                )
              })}
            </SessionsContainer>
          )
        })}
      </ScheduleHourSpace>
      <Summary labelsWidth={labelsWidth} />
    </Container>
  )
}
