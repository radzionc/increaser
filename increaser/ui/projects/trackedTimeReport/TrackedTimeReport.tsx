import { TrackedProjectsProvider } from './projects/TrackedProjectsProvider'
import { TrackedTimeReportContent } from './TrackedTimeReportContent'

export const TrackedTimeReport = () => {
  return (
    <TrackedProjectsProvider>
      <TrackedTimeReportContent />
    </TrackedProjectsProvider>
  )
}
