import { ComponentWithChildrenProps } from '@increaser/ui/shared/props'
import { ErrorBoundary } from '@sentry/nextjs'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import { PageTitle } from 'ui/PageTitle'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { ProjectsExplorer } from './ProjectsExplorer/ProjectsExplorer'
import { ProjectsExplorerProvider } from './ProjectsExplorer/ProjectsExplorerProvider'
import { AppPageLayout } from 'focus/components/AppPageLayout'

const title = 'Projects'

export const ProjectsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle documentTitle={`🏷 ${title}`} title={title} />
        <UserStateOnly>
          <ErrorBoundary fallback={<ErrorFallbackCard />}>
            <ProjectsExplorerProvider>
              <ProjectsExplorer>{children}</ProjectsExplorer>
            </ProjectsExplorerProvider>
          </ErrorBoundary>
        </UserStateOnly>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
