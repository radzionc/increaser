import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { UserStateOnly } from 'user/state/UserStateOnly'

import { CapacityPageContent } from './CapacityPageContent'
import { ManagePrimaryGoal } from './ManagePrimaryGoal'
import { PageTitle } from 'ui/PageTitle'
import { Page } from 'layout/Page'

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
