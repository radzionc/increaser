import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { ManageProjects } from '@increaser/ui/projects/ManageProjects'

const title = 'Projects'

export const ProjectsPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🎨 ${title}`} title={title} />
      <UserStateOnly>
        <ManageProjects />
      </UserStateOnly>
    </FixedWidthContent>
  )
}
