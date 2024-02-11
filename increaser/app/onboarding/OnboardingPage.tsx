import { BasedOnScreenWidth } from '@lib/ui/layout/BasedOnScreenWidth'
import { SmallScreenOnboarding } from './SmallScreenOnboarding'
import { NormalScreenOnboarding } from './NormalScreenOnboarding'
import { OnboardingProvider } from './OnboardingProvider'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { productName } from '@increaser/config'

export const OnboardingPage = () => {
  return (
    <UserStateOnly>
      <PageMetaTags title={[`🚀 Setup`, productName].join(' | ')} />
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
