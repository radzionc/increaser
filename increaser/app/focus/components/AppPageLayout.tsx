import { ComponentWithChildrenProps } from '@lib/ui/props'
import { Navigation } from '../../navigation'
import { ErrorBoundary } from '@increaser/ui/errors/components/ErrorBoundary'
import { ErrorFallbackCard } from '@increaser/ui/errors/components/ErrorFallbackCard'
import { BreakProvider } from '../../break/components/BreakProvider'
import { HabitsProvider } from '../../habits/components/HabitsProvider'
import { MembershipConfirmation } from '../../membership/components/MembershipConfirmation'
import { UserStateOnly } from '@increaser/ui/user/UserStateOnly'
import { AuthGuard } from '../../auth/components/AuthGuard'

export const AppPageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AuthGuard>
      <UserStateOnly>
        <ErrorBoundary fallback={<ErrorFallbackCard />}>
          <HabitsProvider>
            <BreakProvider>
              <Navigation>
                <ErrorBoundary fallback={<ErrorFallbackCard />}>
                  {children}
                </ErrorBoundary>
              </Navigation>
            </BreakProvider>
            <MembershipConfirmation />
          </HabitsProvider>
        </ErrorBoundary>
      </UserStateOnly>
    </AuthGuard>
  )
}
