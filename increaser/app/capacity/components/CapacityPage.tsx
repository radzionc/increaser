import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { CapacityPageContent } from './CapacityPageContent'
import { ManagePrimaryGoal } from './ManagePrimaryGoal'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@increaser/app/layout/Page'

const title = 'Manage Time'

export const CapacityPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle
        documentTitle={`⏳ ${title}`}
        title={
          <HStack wrap="wrap" alignItems="end" gap={16}>
            <Text>{title}</Text>
            <UserStateOnly>
              <Text as="div" size={16} weight="regular">
                <ManagePrimaryGoal />
              </Text>
            </UserStateOnly>
          </HStack>
        }
      />
      <UserStateOnly>
        <CapacityPageContent />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
