import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { ManageGoals } from '../../capacity/components/ManageGoals'
import { VStack } from '@lib/ui/layout/Stack'

const title = 'Projects budget'

export const ProjectsBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🎯 ${title}`} title={title} />
      <UserStateOnly>
        <VStack style={{ maxWidth: 520 }}>
          <ManageGoals />
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
