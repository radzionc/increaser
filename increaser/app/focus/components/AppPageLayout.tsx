import { ComponentWithChildrenProps } from '@lib/ui/props'
import { Navigation } from '../../navigation'
import { ErrorBoundary } from '@increaser/app/errors/components/ErrorBoundary'
import { ErrorFallbackCard } from '../../errors/components/ErrorFallbackCard'
import { FocusManager } from '@increaser/ui/focus/FocusManager'
import { UserManager } from '@increaser/ui/user/UserManager'
import { BreakProvider } from '../../break/components/BreakProvider'
import { HabitsProvider } from '../../habits/components/HabitsProvider'
import { MembershipConfirmation } from '../../membership/components/MembershipConfirmation'
import { FocusIntervalsProvider } from '../state/focusIntervals'
import { AuthenticatedOnly } from '../../auth/components/AuthenticatedOnly'
import { UserStateOnly } from '../../user/state/UserStateOnly'

export const AppPageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AuthenticatedOnly>
      <UserStateOnly>
        <ErrorBoundary fallback={<ErrorFallbackCard />}>
          <UserManager />
          <HabitsProvider>
            <FocusIntervalsProvider>
              <BreakProvider>
                <FocusManager />
                <Navigation>
                  <ErrorBoundary fallback={<ErrorFallbackCard />}>
                    {children}
                  </ErrorBoundary>
                </Navigation>
              </BreakProvider>
            </FocusIntervalsProvider>
            <MembershipConfirmation />
          </HabitsProvider>
        </ErrorBoundary>
      </UserStateOnly>
    </AuthenticatedOnly>
  )
}
