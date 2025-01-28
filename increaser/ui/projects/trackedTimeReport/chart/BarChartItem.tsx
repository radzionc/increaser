import { IndexProp, UiProps } from '@lib/ui/props'
import { BarChartItemBreakdownFill } from './BarChartItemBreakdownFill'
import { BarChartItemFill } from './BarChartItemFill'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useTrackedProjects } from '../projects/TrackedProjectsProvider'
import { BarChartItemContainer } from './BarChartItemContainer'

export const BarChartItem = ({ index, ...rest }: IndexProp & UiProps) => {
  const [activeProjectId] = useActiveProject()
  const projects = useTrackedProjects()

  return (
    <BarChartItemContainer {...rest}>
      {activeProjectId ? (
        <BarChartItemFill
          color={projects[activeProjectId].color}
          index={index}
        />
      ) : (
        <BarChartItemBreakdownFill index={index} />
      )}
    </BarChartItemContainer>
  )
}
