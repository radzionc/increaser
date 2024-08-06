import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageTitle } from '@lib/ui/text/PageTitle'

import { UserStateOnly } from '../user/state/UserStateOnly'
import { PageDocumentTitle } from '../ui/page/PageDocumentTitle'
import { PageHeader } from '../ui/page/PageHeader'
import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeReportProvider } from '@increaser/ui/timeTracking/report/TrackedTimeReportProvider'

const title = 'Timesheet'

export const TimeTrackingPage = () => {
  return (
    <PageContainer>
      <PageContent>
        <UserStateOnly>
          <PageHeader>
            <PageTitle>{title}</PageTitle>
            <PageDocumentTitle emoji="📊" title={title} />
          </PageHeader>

          <TrackedTimeProvider>
            <TrackedTimeReportProvider>
              <TrackedTimeReport />
            </TrackedTimeReportProvider>
          </TrackedTimeProvider>
        </UserStateOnly>
      </PageContent>
    </PageContainer>
  )
}
