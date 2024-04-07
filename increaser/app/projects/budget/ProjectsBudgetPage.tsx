import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { ProjectsBudgetOverview } from './ProjectsBudgetOverview'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'
import { ProjectsBudgetList } from './ProjectsBudgetList'
import { ManageProjectBudget } from './ManageProjectBudget'

const title = 'Projects budget'

export const ProjectsBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🎯 ${title}`} title={title} />
      <UserStateOnly>
        <UniformColumnGrid
          style={{ alignItems: 'start' }}
          minChildrenWidth={360}
          gap={40}
        >
          <ManageProjectBudget />
          <VStack gap={40}>
            <ProjectsBudgetOverview />
            <ProjectsBudgetList />
          </VStack>
        </UniformColumnGrid>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
