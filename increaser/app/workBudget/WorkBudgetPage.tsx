import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { WorkBudgetReport } from '@increaser/ui/workBudget/WorkBudgetReport'

const title = 'Work Budget'

export const WorkBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`👍 ${title}`} title={title} />
      <UserStateOnly>
        <UniformColumnGrid
          style={{ alignItems: 'start' }}
          fullWidth
          minChildrenWidth={320}
          gap={40}
        >
          <ManageWorkBudget />
          <WorkBudgetReport />
        </UniformColumnGrid>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
