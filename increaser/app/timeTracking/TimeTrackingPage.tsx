import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { TrackedTimeReportProvider } from './report/TrackedTimeReportProvider'
import { TrackedTimeReport } from './report/TrackedTimeReport'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { TrackedTimeProvider } from './report/TrackedTimeProvider'

const title = 'Track Time'

export const TimeTrackingPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`⏳ ${title}`} title={title} />
      <UserStateOnly>
        <TrackedTimeProvider>
          <TrackedTimeReportProvider>
            <TrackedTimeReport />
          </TrackedTimeReportProvider>
        </TrackedTimeProvider>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
