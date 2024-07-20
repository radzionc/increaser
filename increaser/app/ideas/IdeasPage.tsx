import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Ideas } from '@increaser/ui/ideas/Ideas'

const title = 'Your ideas'

export const IdeasPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`💡 ${title}`} title={title} />
      <UserStateOnly>
        <Ideas />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
