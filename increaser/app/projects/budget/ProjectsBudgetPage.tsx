import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { ManageProjectsBudget } from './ManageProjectsBudget'

const title = 'Projects budget'

export const ProjectsBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🎯 ${title}`} title={title} />
      <UserStateOnly>
        <ManageProjectsBudget />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
