import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'
import { RegularAppPageLayout } from '../focus/components/RegularAppPageLayout'

export default withLayout({
  page: TrackedTimeReport,
  layout: RegularAppPageLayout,
})
