import { Page, GetLayout } from '@increaser/app/layout/Page'
import { ProjectsLayout } from '@increaser/app/projects/components/ProjectsLayout'

const getProjectsPageLayout: GetLayout = (page) => (
  <ProjectsLayout>{page}</ProjectsLayout>
)

export const makeProjectsPage = (page: Page) => {
  page.getLayout = getProjectsPageLayout

  return page
}
