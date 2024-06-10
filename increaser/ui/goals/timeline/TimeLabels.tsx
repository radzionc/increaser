import styled from 'styled-components'
import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { goalsTimelineConfig } from './config'
import { useMemo } from 'react'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { addYears } from 'date-fns'
import { range } from '@lib/utils/array/range'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { Text } from '@lib/ui/text'
import { VStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'

const Label = styled(VStack)`
  font-size: 12px;
  height: ${toSizeUnit(goalsTimelineConfig.timeLabelHeight)};
  justify-content: end;
  padding-left: 4px;
  color: ${getColor('textSupporting')};
  border-left: 1px solid;
  position: absolute;
  top: 0;
`

const maxLabelsCount = 10

export const TimeLabels = () => {
  const { interval, dob } = useGoalsTimeline()

  const intervalDuration = getIntervalDuration(interval)

  const timestamps = useMemo(() => {
    const [startAge, endAge] = [interval.start, interval.end].map((at) =>
      getUserAgeAt({ dob, at }),
    )

    const count = endAge - startAge + 1

    const dobDate = fromDay(stringToDay(dob))

    const ageTimestamps = range(count).map((index) =>
      addYears(dobDate, startAge + index).getTime(),
    )

    if (ageTimestamps.length > maxLabelsCount) {
      const step = Math.ceil(ageTimestamps.length / maxLabelsCount)
      return ageTimestamps.filter((_, index) => index % step === 0)
    }

    return ageTimestamps
  }, [dob, interval.end, interval.start])

  return (
    <>
      {timestamps.map((timestamp) => {
        return (
          <Label
            style={{
              left: toPercents((timestamp - interval.start) / intervalDuration),
            }}
            key={timestamp}
          >
            <Text size={12} nowrap>
              {getUserAgeAt({ dob, at: timestamp })}
            </Text>
          </Label>
        )
      })}
    </>
  )
}
