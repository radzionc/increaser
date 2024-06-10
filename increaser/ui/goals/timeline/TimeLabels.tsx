import styled from 'styled-components'
import { useGoalsTimeline } from './state/GoalsTimelineContext'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { goalsTimelineConfig } from './config'
import { useMemo } from 'react'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
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
  border-left: 1px solid ${getColor('mistExtra')};
  position: absolute;
  top: 0;
`

export const TimeLabels = () => {
  const { interval, dob, timeLabels } = useGoalsTimeline()

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
              {getUserAgeAt({ dob, at: timestamp })}
            </Text>
          </Label>
        )
      })}
    </>
  )
}
