import { BasedOnScreenWidth } from '@lib/ui/layout/BasedOnScreenWidth'
import { SmallScreenOnboarding } from './SmallScreenOnboarding'
import { NormalScreenOnboarding } from './NormalScreenOnboarding'
import { OnboardingProvider } from './OnboardingProvider'

export const OnboardingPage = () => {
  return (
    <OnboardingProvider>
      <BasedOnScreenWidth
        value={800}
        less={() => <SmallScreenOnboarding />}
        more={() => <NormalScreenOnboarding />}
      />
    </OnboardingProvider>
  )
}
