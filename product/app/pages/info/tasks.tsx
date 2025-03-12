import { withLayout } from '@lib/next-ui/utils/withLayout'
import { tasksEducation } from '@product/ui/education/tasks'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={tasksEducation} />,
  layout: InfoLayout,
})
