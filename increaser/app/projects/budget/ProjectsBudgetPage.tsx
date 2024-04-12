import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { ProjectsBudgetOverview } from './ProjectsBudgetOverview'
import { VStack } from '@lib/ui/layout/Stack'
import { BudgetFreeTimePrompt } from './BudgetFreeTimePrompt'
import { BudgetBreakdown } from './BudgetBreakdown'

const title = 'Projects budget'

export const ProjectsBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🎯 ${title}`} title={title} />
      <UserStateOnly>
        <VStack gap={40} style={{ maxWidth: 480 }}>
          <ProjectsBudgetOverview />
          <BudgetFreeTimePrompt />
          <BudgetBreakdown />
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
