import { VStack } from '@lib/ui/layout/Stack'
import { FocusLauncher } from '../../focus/launcher'

export const FocusOnboardingStep = () => {
  return (
    <VStack style={{ maxWidth: 520 }}>
      <FocusLauncher />
    </VStack>
  )
}
