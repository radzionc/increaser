import { withLayout } from '@lib/next-ui/utils/withLayout'
import { principlesEducation } from '@product/ui/education/principles'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={principlesEducation} />,
  layout: InfoLayout,
})
