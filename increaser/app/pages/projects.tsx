import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../focus/components/RegularAppPageLayout'
import { ProjectPageContent } from '../projects/components/ProjectsPageContent'

export default withLayout({
  page: ProjectPageContent,
  layout: RegularAppPageLayout,
})
