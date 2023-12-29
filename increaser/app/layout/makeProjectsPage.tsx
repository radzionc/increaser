import { Page, GetLayout } from '@lib/next-ui/Page'
import { ProjectsLayout } from '@increaser/app/projects/components/ProjectsLayout'

const getProjectsPageLayout: GetLayout = (page) => (
  <ProjectsLayout>{page}</ProjectsLayout>
)

export const makeProjectsPage = (page: Page) => {
  page.getLayout = getProjectsPageLayout

  return page
}
