import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { VStack } from '@lib/ui/css/stack'
import { toPercents } from '@lib/utils/toPercents'
import { AllocationLine } from '@product/app/ui/AllocationLine'
import styled, { useTheme } from 'styled-components'

import { useActiveProject } from '../activeProject/useActiveProject'
import { ProjectsDistributionBreakdown } from '../ProjectsDistributionBreakdown'
import { BreakdownRowContent } from '../ProjectsDistributionBreakdown/BreakdownRowContent'
import { BreakdownValue } from '../ProjectsDistributionBreakdown/BreakdownValue'
import { InteractiveRow } from '../ProjectsDistributionBreakdown/InteractiveRow'
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
