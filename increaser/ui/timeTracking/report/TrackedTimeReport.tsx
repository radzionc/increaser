import { TrackedTimeReportHeader } from './TrackedTimeReportHeader'
import { TrackedTimeReportContent } from './TrackedTimeReportContent'
import { VStack } from '@lib/ui/layout/Stack'

export const TrackedTimeReport = () => {
  return (
    <VStack fullWidth gap={40}>
      <TrackedTimeReportHeader />
      <TrackedTimeReportContent />
      <div />
    </VStack>
  )
}
