import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ErrorBoundary } from '@sentry/nextjs'
import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { ErrorFallbackCard } from '@increaser/app/errors/components/ErrorFallbackCard'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { UserStateOnly } from '@increaser/app/user/state/UserStateOnly'
import { ProjectsExplorer } from './ProjectsExplorer/ProjectsExplorer'
import { ProjectsExplorerProvider } from './ProjectsExplorer/ProjectsExplorerProvider'
import { AppPageLayout } from '@increaser/app/focus/components/AppPageLayout'
import { RequiresOnboarding } from '../../onboarding/RequiresOnboarding'

const title = 'Projects'

export const ProjectsLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <AppPageLayout>
      <FixedWidthContent>
        <PageTitle documentTitle={`🏷 ${title}`} title={title} />
        <UserStateOnly>
          <RequiresOnboarding>
            <ErrorBoundary fallback={<ErrorFallbackCard />}>
              <ProjectsExplorerProvider>
                <ProjectsExplorer>{children}</ProjectsExplorer>
              </ProjectsExplorerProvider>
            </ErrorBoundary>
          </RequiresOnboarding>
        </UserStateOnly>
      </FixedWidthContent>
    </AppPageLayout>
  )
}
