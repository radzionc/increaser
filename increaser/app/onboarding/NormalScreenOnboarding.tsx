import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { OnboardingOverview } from './OnboardingOverview'
import { CurrentOnboardingStep } from './CurrentOnboardingStep'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  > * {
    padding: 40px;
    overflow-y: auto;

    &:last-child {
      background: ${getColor('foreground')};
    }
  }
`

export const NormalScreenOnboarding = () => (
  <Container>
    <CurrentOnboardingStep />
    <OnboardingOverview />
  </Container>
)
