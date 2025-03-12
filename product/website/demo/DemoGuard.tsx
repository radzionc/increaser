import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { ChildrenProp } from '@lib/ui/props'
import { ErrorBoundary } from '@product/ui/errors/components/ErrorBoundary'
import { UserStateOnly } from '@product/ui/user/UserStateOnly'

import { MockApiProvider } from '../api/MockApiProvider'

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
