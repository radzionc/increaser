import styled from 'styled-components'
import { PlanDayOverview } from './PlanDayOverview'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { planDayConfig } from './config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { PlanDayPrimaryNavigation } from './PlanDayPrimaryNavigation'
import { PlanDayStepTitle } from './PlanDayStepTitle'
import { PlanDayStepContent } from './PlanDayStepContent'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'

const Wrapper = styled(HStack)`
  flex: 1;

  > *:first-child {
    padding-right: ${toSizeUnit(planDayConfig.sectionGap)};
    border-right: 1px solid ${getColor('mistExtra')};
  }
`

const Container = styled(VStack)`
  flex: 1;
  > * {
    ${horizontalPadding(planDayConfig.sectionGap)};
  }
`

const Content = styled(ScrollableFlexboxFiller)`
  flex: 1;
  gap: 28px;
  > * {
    ${horizontalPadding(planDayConfig.sectionGap)};
  }
`

export const PlanDayContent = () => (
  <Wrapper>
    <PlanDayOverview />
    <Container>
      <PlanDayStepTitle />
      <Content>
        <PlanDayStepContent />
      </Content>
      <Spacer height={20} />
      <PlanDayPrimaryNavigation />
    </Container>
  </Wrapper>
)
