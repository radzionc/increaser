import { VStack } from '@lib/ui/layout/Stack'
import { FocusLauncherForm } from '../../focus/launcher/FocusLauncherForm'

export const FocusOnboardingStep = () => {
  return (
    <VStack style={{ maxWidth: 520 }}>
      <FocusLauncherForm />
    </VStack>
  )
}
