import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { Header } from '@lib/ui/layout/Header'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { ManageProjectsNamesVisibility } from '../filters/ManageProjectsNamesVisibility'
import { ProjectsDistributionBreakdown } from '../ProjectsDistributionBreakdown'

const Container = styled(VStack)`
  ${horizontalPadding(0)};
  gap: 12px;
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
  height: 40px;
`

export const ProjectsNavigation = () => {
  const { activeProjectId, setState } = useTrackedTimeReport()

  return (
    <Container>
      <Header>
        <Toggle
          label="View projects total"
          value={!activeProjectId}
          onChange={() =>
            setState((state) => ({
              ...state,
              activeProjectId: null,
            }))
          }
        />
        <ManageProjectsNamesVisibility />
      </Header>
      <Content>
        <ProjectsDistributionBreakdown />
      </Content>
    </Container>
  )
}
