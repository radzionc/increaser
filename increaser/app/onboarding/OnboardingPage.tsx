import { BasedOnScreenWidth } from '@lib/ui/layout/BasedOnScreenWidth'
import { SmallScreenOnboarding } from './SmallScreenOnboarding'
import { NormalScreenOnboarding } from './NormalScreenOnboarding'
import { OnboardingProvider } from './OnboardingProvider'
import { UserStateOnly } from '../user/state/UserStateOnly'

export const OnboardingPage = () => {
  return (
    <UserStateOnly>
      <OnboardingProvider>
        <BasedOnScreenWidth
          value={800}
          less={() => <SmallScreenOnboarding />}
          more={() => <NormalScreenOnboarding />}
        />
      </OnboardingProvider>
    </UserStateOnly>
  )
}
