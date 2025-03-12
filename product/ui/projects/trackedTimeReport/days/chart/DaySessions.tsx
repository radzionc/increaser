import { borderRadius } from '@lib/ui/css/borderRadius'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { IndexProp } from '@lib/ui/props'
import { Interval } from '@lib/utils/interval/Interval'
import { toPercents } from '@lib/utils/toPercents'
import { Set } from '@product/entities/User'
import styled, { useTheme } from 'styled-components'

import { useActiveProject } from '../../activeProject/useActiveProject'
import { trackedTimeChartConfig } from '../../chart/config'
import { useBarChartFillColor } from '../../chart/hooks/useBarChartFillColor'
import { useTrackedProjects } from '../../projects/TrackedProjectsProvider'

type DaySessionsProps = {
  interval: Interval
  sets: Set[]
} & IndexProp

const Container = styled.div`
  width: calc(100% - ${toSizeUnit(trackedTimeChartConfig.spaceBetweenBars)});
  margin-left: ${toSizeUnit(trackedTimeChartConfig.spaceBetweenBars / 2)};
  position: relative;
  height: 100%;
`

const Session = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  ${borderRadius.xs};
  background: red;
`

export const DaySessions = ({ interval, sets, index }: DaySessionsProps) => {
  const projects = useTrackedProjects()

  const duration = interval.end - interval.start

  const getFillColor = useBarChartFillColor(index)

  const [activeProjectId] = useActiveProject()

  const {
    colors: { mist },
  } = useTheme()

  return (
    <Container>
      {sets.map((set, index) => {
        const top = (set.start - interval.start) / duration
        const height = (set.end - set.start) / duration
        let color = projects[set.projectId].color
        if (activeProjectId && activeProjectId !== set.projectId) {
          color = mist
        }
        const background = getFillColor(color).toCssValue()

        return (
          <Session
            style={{
              top: toPercents(top),
              height: toPercents(height),
              background,
            }}
            key={index}
          />
        )
      })}
    </Container>
  )
}
