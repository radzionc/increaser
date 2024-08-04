import { ComponentWithChildrenProps } from '@lib/ui/props'
import { Navigation } from '../../navigation'
import { ErrorBoundary } from '@sentry/nextjs'
import { ErrorFallbackCard } from '../../errors/components/ErrorFallbackCard'

export const AppPageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <Navigation>
      <ErrorBoundary fallback={<ErrorFallbackCard />}>{children}</ErrorBoundary>
    </Navigation>
  )
}
