import { TrackedTimeReportHeader } from './TrackedTimeReportHeader'
import { TrackedTimeReportContent } from './TrackedTimeReportContent'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const TrackedTimeReport = () => {
  return (
    <SeparatedByLine fullWidth gap={16}>
      <TrackedTimeReportHeader />
      <TrackedTimeReportContent />
    </SeparatedByLine>
  )
}
