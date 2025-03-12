import { withLayout } from '@lib/next-ui/utils/withLayout'
import { focusEducation } from '@product/ui/education/focus'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={focusEducation} />,
  layout: InfoLayout,
})
