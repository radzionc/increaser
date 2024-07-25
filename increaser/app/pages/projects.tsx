import { ProjectsPage } from '../projects/components/ProjectsPage'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: ProjectsPage,
  layout: AppPageLayout,
})
