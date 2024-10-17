import { ManageProjects } from '@increaser/ui/projects/ManageProjects'
import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { BudgetOverview } from '@increaser/ui/projects/budget/BudgetOverview'

const SideSection = styled.div`
  flex: 1;
  min-width: 280px;
`

export const ProjectPageContent = () => {
  return (
    <HStack style={{ position: 'relative' }} fullWidth wrap="wrap" gap={40}>
      <ManageProjects />
      <SideSection>
        <BudgetOverview />
      </SideSection>
    </HStack>
  )
}
