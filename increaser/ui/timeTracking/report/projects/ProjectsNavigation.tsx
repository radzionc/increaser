import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { Header } from '@lib/ui/layout/Header'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { ManageProjectsNamesVisibility } from '../filters/ManageProjectsNamesVisibility'
import { ProjectsDistributionBreakdown } from '../ProjectsDistributionBreakdown'
import { useOrderedTimeSeries } from '../hooks/useOrderedTimeSeries'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const Container = styled(VStack)`
  padding: 0;
  padding-bottom: ${toSizeUnit(panelDefaultPadding)};
  > * {
    ${horizontalPadding(panelDefaultPadding)};
  }
`

const Content = styled(VStack)`
  ${horizontalPadding(0)};

  > * {
    ${horizontalPadding(panelDefaultPadding)};
  }
`

const Toggle = styled(MinimalisticToggle)`
  flex: 1;
  padding: ${toSizeUnit(panelDefaultPadding)};
`

const ProjectsHeader = styled(Header)`
  padding: 0;
  padding-right: ${toSizeUnit(panelDefaultPadding)};
`

export const ProjectsNavigation = () => {
  const { activeProjectId, setState } = useTrackedTimeReport()
  const items = useOrderedTimeSeries()

  return (
    <Container>
      <ProjectsHeader>
        <Toggle
          label="View projects total"
          value={!activeProjectId}
          onChange={() =>
            setState((state) => ({
              ...state,
              activeProjectId: activeProjectId ? null : items[0].id,
            }))
          }
        />
        <ManageProjectsNamesVisibility />
      </ProjectsHeader>
      <Content>
        <ProjectsDistributionBreakdown />
      </Content>
    </Container>
  )
}
