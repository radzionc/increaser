import { Page, GetLayout } from 'layout/Page'
import { ProjectsLayout } from 'projects/components/ProjectsLayout'

const getProjectsPageLayout: GetLayout = (page) => (
  <ProjectsLayout>{page}</ProjectsLayout>
)

export const makeProjectsPage = (page: Page) => {
  page.getLayout = getProjectsPageLayout

  return page
}
