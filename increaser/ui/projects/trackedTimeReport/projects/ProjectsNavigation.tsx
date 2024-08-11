import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { Header } from '@lib/ui/layout/Header'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { ProjectsDistributionBreakdown } from '../ProjectsDistributionBreakdown'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useActiveProject } from '../activeProject/useActiveProject'
import { HideProjectNamesSelector } from '../hideProjectNames/HideProjectNamesSelector'
import { useOrderedProjects } from './useOrderedProjects'

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
  const [activeProject, setActiveProject] = useActiveProject()
  const items = useOrderedProjects()

  return (
    <Container>
      <ProjectsHeader>
        <Toggle
          label="View projects total"
          value={!activeProject}
          onChange={() =>
            setActiveProject(activeProject ? null : items[0]?.key ?? null)
          }
        />
        <HideProjectNamesSelector />
      </ProjectsHeader>
      <Content>
        <ProjectsDistributionBreakdown />
      </Content>
    </Container>
  )
}
