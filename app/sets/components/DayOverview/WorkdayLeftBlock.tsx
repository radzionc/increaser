import styled from 'styled-components'
import { useDayOverview } from './DayOverviewProvider'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { toPercents } from '@increaser/utils/toPercents'

const Block = styled.div`
  width: 100%;
  background: ${getColor('foreground')};
  position: absolute;
  left: 0;
`

export const WorkdayLeftBlock = () => {
  const { workdayEndsAt, timelineEndsAt, timelineStartsAt, currentTime } =
    useDayOverview()
  const workEndsIn = workdayEndsAt - currentTime
  const timespan = timelineEndsAt - timelineStartsAt

  if (currentTime > workdayEndsAt) {
    return null
  }

  return (
    <Block
      style={{
        top: toPercents((currentTime - timelineStartsAt) / timespan),
        height: toPercents(workEndsIn / timespan),
      }}
    />
  )
}
