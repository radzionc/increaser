import { Set } from '@increaser/entities/User'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Interval } from '@lib/utils/interval/Interval'
import styled, { useTheme } from 'styled-components'
import { trackedTimeChartConfig } from '../../chart/config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useTrackedProjects } from '../../projects/TrackedProjectsProvider'
import { toPercents } from '@lib/utils/toPercents'
import { IndexProp } from '@lib/ui/props'
import { useBarChartFillColor } from '../../chart/hooks/useBarChartFillColor'
import { useActiveProject } from '../../activeProject/useActiveProject'

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
