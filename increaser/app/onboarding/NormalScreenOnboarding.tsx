import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { OnboardingOverview } from './OnboardingOverview'
import { OnboardingStepEducation } from './OnboardingStepEducation'
import { OnboardingStepForm } from './OnboardingStepForm'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  height: 100%;

  > * {
    &:first-child {
      background: ${getColor('foreground')};
    }

    &:last-child {
      border-left: 1px dashed ${getColor('mistExtra')};
    }
  }
`

export const NormalScreenOnboarding = () => (
  <Container>
    <OnboardingOverview />
    <OnboardingStepForm />
    <OnboardingStepEducation />
  </Container>
)
