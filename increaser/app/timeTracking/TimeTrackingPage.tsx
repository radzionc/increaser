import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageContainer } from '../ui/page/PageContainer'
import { PageContent } from '../ui/page/PageContent'
import { PageTitle } from '../ui/page/PageTitle'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { GoalStatusFilter } from '@increaser/ui/goals/filter/GoalStatusFilter'
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
        <PageHeader>
          <PageTitle>{title}</PageTitle>
          <PageDocumentTitle emoji="📊" title={title} />
          <ClientOnly>
            <GoalStatusFilter />
          </ClientOnly>
        </PageHeader>

        <UserStateOnly>
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
