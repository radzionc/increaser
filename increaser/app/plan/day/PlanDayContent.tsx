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

const Wrapper = styled(HStack)`
  flex: 1;

  > *:first-child {
    padding-right: ${toSizeUnit(planDayConfig.sectionGap)};
    border-right: 1px solid ${getColor('mistExtra')};
  }
`

const Container = styled(VStack)`
  flex: 1;
  max-width: 600px;
  > * {
    ${horizontalPadding(planDayConfig.sectionGap)};
  }
`

const Content = styled(VStack)`
  flex: 1;
  overflow-y: auto;
  gap: 28px;
`

export const PlanDayContent = () => (
  <Wrapper>
    <PlanDayOverview />
    <Container>
      <PlanDayStepTitle />
      <Content>
        <PlanDayStepContent />
      </Content>
      <PlanDayPrimaryNavigation />
    </Container>
  </Wrapper>
)
