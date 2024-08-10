import { TrackedTimeProvider } from './TrackedTimeProvider'
import { TrackedTimeReportContent } from './TrackedTimeReportContent'

export const TrackedTimeReport = () => {
  return (
    <TrackedTimeProvider>
      <TrackedTimeReportContent />
    </TrackedTimeProvider>
  )
}
