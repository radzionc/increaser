import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ManageWorkBudget } from './ManageWorkBudget'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { WorkBudgetReport } from './WorkBudgetReport'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentWeekVsBudget } from './CurrentWeekVsBudget'

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
          <VStack gap={40}>
            <ManageWorkBudget />
            <CurrentWeekVsBudget />
          </VStack>
          <WorkBudgetReport />
        </UniformColumnGrid>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
