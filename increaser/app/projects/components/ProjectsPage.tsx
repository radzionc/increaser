import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { GroupedProjects } from './GroupedProjects'
import { VStack } from '@lib/ui/layout/Stack'

const title = 'Projects'

export const ProjectsPage: Page = () => {
  return (
    <FixedWidthContent>
      <VStack style={{ maxWidth: 460 }}>
        <PageTitle documentTitle={`🎨 ${title}`} title={title} />
        <UserStateOnly>
          <GroupedProjects />
        </UserStateOnly>
      </VStack>
    </FixedWidthContent>
  )
}
