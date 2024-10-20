import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { tasksEducation } from '@increaser/ui/education/tasks'

export default withLayout({
  page: () => <ProductEducationPage value={tasksEducation} />,
  layout: InfoLayout,
})
