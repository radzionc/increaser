import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { VStack, vStack } from '@lib/ui/css/stack'
import { ProjectBudgetSummary } from '@increaser/ui/projects/budget/ProjectBudgetWidget/ProjectBudgetSummary'
import { useFocusTargetProject } from '../hooks/useFocusTargetProject'
import styled from 'styled-components'
import { ProjectBudgetOverview } from '@increaser/ui/projects/budget/ProjectBudgetWidget/ProjectBudgetOverview'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/css/panel'

const Container = styled.div`
  ${vStack({ gap: 8 })}
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: 12px;
`

export const FocusLauncherBudget = () => {
  const project = shouldBePresent(useFocusTargetProject())

  if (project.allocatedMinutesPerWeek > 0) {
    return (
      <CurrentProjectProvider value={project}>
        <Container>
          <VStack style={{ height: 28 }}>
            <ProjectBudgetOverview />
          </VStack>
          <ProjectBudgetSummary />
        </Container>
      </CurrentProjectProvider>
    )
  }

  return null
}
