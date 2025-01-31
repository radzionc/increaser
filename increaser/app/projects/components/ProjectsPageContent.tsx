import { ManageProjects } from '@increaser/ui/projects/ManageProjects'
import { HStack, vStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { BudgetOverview } from '@increaser/ui/projects/budget/BudgetOverview'
import { CurrentWeekVsBudget } from '@increaser/ui/workBudget/CurrentWeekVsBudget'
import { ProjectStatusFilterProvider } from '@increaser/ui/projects/filter/status/ProjectStatusFilterProvider'

const SideSection = styled.div`
  flex: 1;
  min-width: 280px;
  ${vStack({
    gap: 20,
  })}
`

export const ProjectPageContent = () => {
  return (
    <HStack style={{ position: 'relative' }} fullWidth wrap="wrap" gap={40}>
      <ProjectStatusFilterProvider initialValue="active">
        <ManageProjects />
      </ProjectStatusFilterProvider>
      <SideSection>
        <BudgetOverview />
        <CurrentWeekVsBudget />
      </SideSection>
    </HStack>
  )
}
