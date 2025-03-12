import { ChildrenProp } from '@lib/ui/props'
import { ErrorBoundary } from '@product/ui/errors/components/ErrorBoundary'
import { ErrorFallbackCard } from '@product/ui/errors/components/ErrorFallbackCard'
import { UserStateOnly } from '@product/ui/user/UserStateOnly'

import { AuthGuard } from '../../auth/components/AuthGuard'
import { MembershipConfirmation } from '../../membership/components/MembershipConfirmation'
import { Navigation } from '../../navigation'

export const AppPageLayout = ({ children }: ChildrenProp) => {
  return (
    <AuthGuard>
      <UserStateOnly>
        <ErrorBoundary fallback={<ErrorFallbackCard />}>
          <Navigation>
            <ErrorBoundary fallback={<ErrorFallbackCard />}>
              {children}
            </ErrorBoundary>
          </Navigation>
          <MembershipConfirmation />
        </ErrorBoundary>
      </UserStateOnly>
    </AuthGuard>
  )
}
