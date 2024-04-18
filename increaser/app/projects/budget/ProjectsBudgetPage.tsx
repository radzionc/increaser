import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { ManageProjectsBudget } from './ManageProjectsBudget'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { CurrentWeekProgress } from './CurrentWeekProgress'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { Panel } from '@lib/ui/panel/Panel'
import { PreviousWeeksProgress } from './PreviousWeeks/PreviousWeeksProgress'

const title = 'Projects budget'

export const ProjectsBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🎯 ${title}`} title={title} />
      <UserStateOnly>
        <UniformColumnGrid
          style={{ alignItems: 'start' }}
          fullWidth
          minChildrenWidth={320}
          gap={40}
        >
          <ManageProjectsBudget />
          <Panel kind="secondary">
            <SeparatedByLine gap={40}>
              <CurrentWeekProgress />
              <PreviousWeeksProgress />
            </SeparatedByLine>
          </Panel>
        </UniformColumnGrid>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
