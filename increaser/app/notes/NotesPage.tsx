import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { Notes } from '@increaser/ui/notes/Notes'

const title = 'Your ideas'

export const NotesPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`💡 ${title}`} title={title} />
      <UserStateOnly>
        <Notes />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
