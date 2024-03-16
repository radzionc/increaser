import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { TrackedTimeReportProvider } from './report/TrackedTimeReportProvider'
import { TrackedTimeReport } from './report/TrackedTimeReport'
import { UserStateOnly } from '../user/state/UserStateOnly'

const title = 'Time Tracking'

export const TimeTrackingPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`⏳ ${title}`} title={title} />
      <UserStateOnly>
        <TrackedTimeReportProvider>
          <TrackedTimeReport />
        </TrackedTimeReportProvider>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
