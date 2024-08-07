import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ProjectsLayout } from '@increaser/app/projects/ProjectsLayout'
import { ProjectsBudget } from '../../projects/budget/ProjectsBudget'

export default withLayout({
  page: ProjectsBudget,
  layout: ProjectsLayout,
})
