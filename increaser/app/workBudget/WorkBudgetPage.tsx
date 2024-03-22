import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ManageWorkBudget } from './ManageWorkBudget'

const title = 'Work Budget'

export const WorkBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`👍 ${title}`} title={title} />
      <UserStateOnly>
        <ManageWorkBudget />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
