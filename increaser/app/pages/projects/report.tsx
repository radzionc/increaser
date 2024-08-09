import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ProjectsLayout } from '@increaser/app/projects/ProjectsLayout'
import { TimeTrackingReport } from '@increaser/app/timeTracking/TimeTrackingReport'

export default withLayout({
  page: TimeTrackingReport,
  layout: ProjectsLayout,
})
