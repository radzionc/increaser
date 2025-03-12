import { panelDefaultPadding } from '@lib/ui/css/panel'
import { vStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useFocusTargetProject } from '@product/ui/focus/hooks/useFocusTargetProject'
import { ProjectBudgetOverview } from '@product/ui/projects/budget/ProjectBudgetWidget/ProjectBudgetOverview'
import { ProjectBudgetSummary } from '@product/ui/projects/budget/ProjectBudgetWidget/ProjectBudgetSummary'
import { CurrentProjectProvider } from '@product/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

const Container = styled.div`
  ${vStack({ gap: 8 })}
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: 12px;
`

export const FocusProjectBudget = () => {
  const project = useFocusTargetProject()

  if (project && project.allocatedMinutesPerWeek > 0) {
    return (
      <CurrentProjectProvider value={project}>
        <Container>
          <ProjectBudgetOverview />
          <ProjectBudgetSummary />
        </Container>
      </CurrentProjectProvider>
    )
  }

  return null
}
