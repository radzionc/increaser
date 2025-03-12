import { withLayout } from '@lib/next-ui/utils/withLayout'
import { habitsEducation } from '@product/ui/education/habits'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={habitsEducation} />,
  layout: InfoLayout,
})
