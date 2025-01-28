import { ChildrenProp } from '@lib/ui/props'
import { MockApiProvider } from '../api/MockApiProvider'
import { UserStateOnly } from '@increaser/ui/user/UserStateOnly'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { ErrorBoundary } from '@increaser/ui/errors/components/ErrorBoundary'

export const DemoGuard = ({ children }: ChildrenProp) => {
  return (
    <MockApiProvider>
      <UserStateOnly>
        <ClientOnly>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ClientOnly>
      </UserStateOnly>
    </MockApiProvider>
  )
}
