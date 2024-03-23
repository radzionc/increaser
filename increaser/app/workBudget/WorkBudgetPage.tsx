import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { ManageWorkBudget } from './ManageWorkBudget'
import { VStack } from '@lib/ui/layout/Stack'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { WorkBudgetReport } from './WorkBudgetReport'
import { Panel } from '@lib/ui/panel/Panel'
import { Text } from '@lib/ui/text'

const title = 'Work Budget'

export const WorkBudgetPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`👍 ${title}`} title={title} />
      <UserStateOnly>
        <UniformColumnGrid fullWidth minChildrenWidth={320} gap={40}>
          <Panel style={{ maxWidth: 520 }}>
            <VStack gap={20}>
              <Text color="contrast" weight="semibold">
                My Work Budget Preference
              </Text>
              <ManageWorkBudget />
            </VStack>
          </Panel>
          <WorkBudgetReport />
        </UniformColumnGrid>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
