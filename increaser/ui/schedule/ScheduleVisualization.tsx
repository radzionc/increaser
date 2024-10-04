import { useUser } from '@increaser/ui/user/state/user'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { getColor } from '@lib/ui/theme/getters'
import styled, { useTheme } from 'styled-components'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { round } from '@lib/ui/css/round'
import { useMemo } from 'react'
import { pick } from '@lib/utils/record/pick'
import { DayMoment, dayMoments } from '@increaser/entities/DayMoments'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { toPercents } from '@lib/utils/toPercents'
import { HStack, VStack } from '@lib/ui/css/stack'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { transition } from '@lib/ui/css/transition'
import { dayMomentIcon } from './dayMomentIcon'
import { getDayMomentColor } from './utils/getDayMomentColor'

const momentSize = 32
const markHeight = 8

const Wrapper = styled.div`
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: ${toSizeUnit(momentSize + markHeight + 6)};
  border-bottom: 2px solid ${getColor('mistExtra')};
`

const TimeContainer = styled(HStack)`
  border: 2px solid ${getColor('mistExtra')};
  background: ${getColor('background')};
  ${round};
`

const Mark = styled.div`
  height: ${toSizeUnit(markHeight)};
  width: 2px;
  background: ${getColor('mistExtra')};
`

const MomentContainer = styled(IconWrapper)`
  ${sameDimensions(momentSize)};
`

const PositionTime = styled(PositionAbsolutelyCenterVertically)`
  ${transition};
`

export const ScheduleVisualization = () => {
  const userState = useUser()
  const schedule = pick(userState, dayMoments)

  const eventsOrganizedByTime = useMemo(() => {
    const result: Record<number, DayMoment[]> = {}

    return makeRecord(withoutDuplicates(Object.values(schedule)), (time) =>
      Object.entries(schedule)
        .filter(([, dayMoment]) => dayMoment === time)
        .map(([dayMoment]) => dayMoment as DayMoment),
    )
    return result
  }, [schedule])

  const theme = useTheme()

  const eventsEntries = Object.entries(eventsOrganizedByTime)

  return (
    <Wrapper
      style={{
        paddingLeft: eventsEntries[0][1].length * (momentSize / 2),
        paddingRight: getLastItem(eventsEntries)[1].length * (momentSize / 2),
      }}
    >
      <Container>
        {eventsEntries.map(([time, dayMoments], index) => {
          const left = toPercents(
            (Number(time) - schedule.wakeUpAt) /
              (schedule.goToBedAt - schedule.wakeUpAt),
          )
          return (
            <PositionTime key={index} left={left}>
              <VStack alignItems="center">
                <TimeContainer>
                  {dayMoments.map((dayMoment) => (
                    <MomentContainer
                      key={dayMoment}
                      style={{
                        color: getDayMomentColor(dayMoment, theme).toCssValue(),
                      }}
                    >
                      {dayMomentIcon[dayMoment]}
                    </MomentContainer>
                  ))}
                </TimeContainer>
                <Mark />
              </VStack>
            </PositionTime>
          )
        })}
      </Container>
    </Wrapper>
  )
}
