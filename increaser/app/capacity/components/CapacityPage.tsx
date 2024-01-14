import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'

import { CapacityPageContent } from './CapacityPageContent'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'

const title = 'Manage Time'

export const CapacityPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`⏳ ${title}`} title={title} />
      <UserStateOnly>
        <CapacityPageContent />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
