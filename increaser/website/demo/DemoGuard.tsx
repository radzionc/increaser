import { ComponentWithChildrenProps } from '@lib/ui/props'
import { MockApiProvider } from '../api/MockApiProvider'
import { UserStateOnly } from '@increaser/ui/user/UserStateOnly'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { FocusIntervalsProvider } from '@increaser/app/focus/state/focusIntervals'
import { ErrorBoundary } from '@increaser/ui/errors/components/ErrorBoundary'

export const DemoGuard = ({ children }: ComponentWithChildrenProps) => {
  return (
    <MockApiProvider>
      <UserStateOnly>
        <FocusIntervalsProvider>
          <ClientOnly>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ClientOnly>
        </FocusIntervalsProvider>
      </UserStateOnly>
    </MockApiProvider>
  )
}
