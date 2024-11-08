import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/css/stack'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import styled, { useTheme } from 'styled-components'
import { ProjectsDistributionBreakdown } from '../ProjectsDistributionBreakdown'
import { useActiveProject } from '../activeProject/useActiveProject'
import { InteractiveRow } from '../ProjectsDistributionBreakdown/InteractiveRow'
import { BreakdownRowContent } from '../ProjectsDistributionBreakdown/BreakdownRowContent'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { BreakdownValue } from '../ProjectsDistributionBreakdown/BreakdownValue'
import { toPercents } from '@lib/utils/toPercents'
import { TrackedEntityIndicator } from '../TrackedEntityIndicator'

const Container = styled(VStack)`
  padding: 8px 0;
  > * {
    ${horizontalPadding(panelDefaultPadding)};
  }
`

export const ProjectsNavigation = () => {
  const [activeProject, setActiveProject] = useActiveProject()

  const { colors } = useTheme()

  return (
    <Container>
      <InteractiveRow
        onClick={() => setActiveProject(null)}
        isActive={activeProject === null}
      >
        <VStack gap={4}>
          <BreakdownRowContent>
            <TrackedEntityIndicator value={null} />
            <AllocationLine
              height={4}
              segments={[
                {
                  color: activeProject ? colors.textShy : colors.primary,
                  proportion: 1,
                },
              ]}
            />
            <BreakdownValue value={toPercents(1, 'round')} />
          </BreakdownRowContent>
        </VStack>
      </InteractiveRow>
      <ProjectsDistributionBreakdown />
    </Container>
  )
}
