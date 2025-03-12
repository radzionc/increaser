import { withLayout } from '@lib/next-ui/utils/withLayout'

import { ProjectPageContent } from '../projects/components/ProjectsPageContent'
import { RegularAppPageLayout } from '../ui/page/RegularAppPageLayout'

export default withLayout({
  page: ProjectPageContent,
  layout: RegularAppPageLayout,
})
