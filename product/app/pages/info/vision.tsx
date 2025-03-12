import { withLayout } from '@lib/next-ui/utils/withLayout'
import { visionEducation } from '@product/ui/education/vision'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={visionEducation} />,
  layout: InfoLayout,
})
