import { VStack } from '@lib/ui/layout/Stack'
import { FocusSessionForm } from '../../focus/components/FocusSessionForm'

export const FocusOnboardingStep = () => {
  return (
    <VStack style={{ maxWidth: 520 }}>
      <FocusSessionForm />
    </VStack>
  )
}
