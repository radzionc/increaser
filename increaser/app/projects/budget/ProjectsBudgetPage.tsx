import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { ManageProjectsBudget } from './ManageProjectsBudget'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { ProjectsBudgetReport } from './ProjectsBudgetReport'

const title = 'Projects budget'

export const ProjectsBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🎯 ${title}`} title={title} />
      <UserStateOnly>
        <UniformColumnGrid fullWidth minChildrenWidth={320} gap={40}>
          <ManageProjectsBudget />
          <ProjectsBudgetReport />
        </UniformColumnGrid>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
