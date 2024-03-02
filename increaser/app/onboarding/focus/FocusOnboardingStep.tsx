import { VStack } from '@lib/ui/layout/Stack'
import { FocusSessionForm } from '../../focus/components/FocusSessionForm'
import { useOnboarding } from '../OnboardingProvider'

export const FocusOnboardingStep = () => {
  const { finishOnboarding } = useOnboarding()

  return (
    <VStack style={{ maxWidth: 520 }}>
      <FocusSessionForm onFocusStart={finishOnboarding} />
    </VStack>
  )
}
