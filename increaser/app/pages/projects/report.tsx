import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ProjectsLayout } from '@increaser/app/projects/ProjectsLayout'
import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'

export default withLayout({
  page: TrackedTimeReport,
  layout: ProjectsLayout,
})
