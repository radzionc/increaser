import { withLayout } from '@lib/next-ui/utils/withLayout'
import { goalsEducation } from '@product/ui/education/goals'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={goalsEducation} />,
  layout: InfoLayout,
})
