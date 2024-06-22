import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'

import { PlanDayPrimaryNavigation } from './PlanDayPrimaryNavigation'
import { PlanDayStepTitle } from './PlanDayStepTitle'
import { PlanDayStepContent } from './PlanDayStepContent'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'

const Container = styled(VStack)`
  flex: 1;
  padding-bottom: 20px;
`

const Wrapper = styled(VStack)`
  gap: 20px;
  flex: 1;
`

export const MobilePlanDayContent = () => (
  <Container>
    <PlanDayStepTitle />
    <Wrapper>
      <ScrollableFlexboxFiller>
        <PlanDayStepContent />
      </ScrollableFlexboxFiller>
      <PlanDayPrimaryNavigation />
    </Wrapper>
  </Container>
)
