import { HStack, vStack } from '@lib/ui/css/stack'
import { BudgetOverview } from '@product/ui/projects/budget/BudgetOverview'
import { ProjectStatusFilterProvider } from '@product/ui/projects/filter/status/ProjectStatusFilterProvider'
import { ManageProjects } from '@product/ui/projects/ManageProjects'
import { CurrentWeekVsBudget } from '@product/ui/workBudget/CurrentWeekVsBudget'
import styled from 'styled-components'

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
