import { ComponentWithChildrenProps } from '@lib/ui/props'
import { AppPageLayout } from '../../focus/components/AppPageLayout'
import { FixedWidthContent } from '../../components/reusable/fixed-width-content'
import { PageTitle } from '../../ui/PageTitle'
import { useCurrentPageView } from '../../navigation/hooks/useCurrentPageView'
import { planDayViewTarget } from './PlanDayStep'
import { UserStateOnly } from '../../user/state/UserStateOnly'
import { PlanDayPrimaryNavigation } from './PlanDayPrimaryNavigation'
import styled from 'styled-components'

const Container = styled(FixedWidthContent)`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Content = styled.div`
  flex: 1;
`

export const PlanDayLayout = ({ children }: ComponentWithChildrenProps) => {
  const view = useCurrentPageView('plan')
  return (
    <AppPageLayout>
      <Container>
        <PageTitle
          documentTitle={`☕️ ${planDayViewTarget[view]}`}
          title={planDayViewTarget[view]}
        />
        <UserStateOnly>
          <Content>{children}</Content>
          <PlanDayPrimaryNavigation />
        </UserStateOnly>
      </Container>
    </AppPageLayout>
  )
}
