import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { toPercents } from '@lib/utils/toPercents'
import { getSetDuration } from '@product/entities-utils/set/getSetDuration'
import styled from 'styled-components'

import { dayOverviewConfig } from './config'
import { useDayOverview } from './DayOverviewProvider'
import { SetItemOverview } from './SetItemOverview'

const rightOffset = dayOverviewConfig.horizontalPadding

const totalOffset = dayOverviewConfig.setLeftOffset + rightOffset

const SetPosition = styled.div`
  width: calc(100% - ${toSizeUnit(totalOffset)});
  position: absolute;

  left: ${toSizeUnit(dayOverviewConfig.setLeftOffset)};
`

export const Sets = () => {
  const { sets, startHour, endHour } = useDayOverview()
  const [weekday] = useSelectedWeekday()
  const dayStartedAt = useStartOfWeekday(weekday)
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const timespan = timelineEndsAt - timelineStartsAt

  return (
    <>
      {sets.map((set, index) => {
        return (
          <SetPosition
            style={{
              top: toPercents((set.start - timelineStartsAt) / timespan),
              height: toPercents(getSetDuration(set) / timespan),
            }}
            key={index}
          >
            <SetItemOverview value={set} />
          </SetPosition>
        )
      })}
    </>
  )
}
