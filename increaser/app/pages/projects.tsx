import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ManageProjects } from '@increaser/ui/projects/ManageProjects'
import { RegularAppPageLayout } from '../focus/components/RegularAppPageLayout'

export default withLayout({
  page: ManageProjects,
  layout: RegularAppPageLayout,
})
