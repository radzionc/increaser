import { ComponentWithChildrenProps } from '@increaser/ui/shared/props'
import { ErrorBoundary } from '@sentry/nextjs'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import { PageTitle } from 'ui/PageTitle'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { AllocationOnboarding } from 'weekTimeAllocation/components/AllocationOnboarding'
import { ProjectsExplorer } from './ProjectsExplorer/ProjectsExplorer'
import { ProjectsExplorerProvider } from './ProjectsExplorer/ProjectsExplorerProvider'

const title = 'Projects'

export const ProjectsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`🏷 ${title}`} title={title} />
      <UserStateOnly>
        <ErrorBoundary fallback={<ErrorFallbackCard />}>
          <AllocationOnboarding />
          <ProjectsExplorerProvider>
            <ProjectsExplorer>{children}</ProjectsExplorer>
          </ProjectsExplorerProvider>
        </ErrorBoundary>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
