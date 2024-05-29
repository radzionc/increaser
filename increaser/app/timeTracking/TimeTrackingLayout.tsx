import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import styled from 'styled-components'
import { FixedWidthContent } from '../components/reusable/fixed-width-content'
import { PageTitle } from '../ui/PageTitle'
import { TimeTrackingViewSelector } from './TimeTrackingView'
import { UserStateOnly } from '../user/state/UserStateOnly'

const PageContainer = styled(FixedWidthContent)`
  display: flex;
  flex-direction: column;
`

const title = 'Time tracking'

export const TimeTrackingLayout = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <PageContainer>
        <PageTitle
          documentTitle={`⏳ ${title}`}
          title={<TimeTrackingViewSelector />}
        />
        <UserStateOnly>{children}</UserStateOnly>
      </PageContainer>
    </AppPageLayout>
  )
}
