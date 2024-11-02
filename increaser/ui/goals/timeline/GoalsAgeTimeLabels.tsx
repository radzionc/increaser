import styled from 'styled-components'
import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { goalsTimelineConfig } from './config'
import { useMemo } from 'react'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { toPercents } from '@lib/utils/toPercents'
import { Text } from '@lib/ui/text'
import { VStack } from '@lib/ui/css/stack'
import { getColor } from '@lib/ui/theme/getters'
import { useUser } from '../../user/state/user'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

const Label = styled(VStack)`
  font-size: 12px;
  height: ${toSizeUnit(goalsTimelineConfig.timeLabelHeight)};
  justify-content: end;
  padding-left: 4px;
  color: ${getColor('textSupporting')};
  border-left: 1px solid ${getColor('mistExtra')};
  position: absolute;
  top: 0;
`

export const GoalsAgeTimeLabels = () => {
  const { interval, timeLabels } = useGoalsTimeline()
  const { dob } = useUser()

  const intervalDuration = useMemo(
    () => getIntervalDuration(interval),
    [interval],
  )

  return (
    <>
      {timeLabels.map((timestamp) => {
        return (
          <Label
            style={{
              left: toPercents((timestamp - interval.start) / intervalDuration),
            }}
            key={timestamp}
          >
            <Text size={12} nowrap>
              {getUserAgeAt({ dob: shouldBePresent(dob), at: timestamp })}
            </Text>
          </Label>
        )
      })}
    </>
  )
}
