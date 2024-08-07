import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ProjectsLayout } from '@increaser/app/projects/ProjectsLayout'
import { ManageProjects } from '@increaser/ui/projects/ManageProjects'

export default withLayout({
  page: ManageProjects,
  layout: ProjectsLayout,
})
