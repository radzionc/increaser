import { withLayout } from '@lib/next-ui/utils/withLayout'
import { trackTimeEducation } from '@product/ui/education/trackTime'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={trackTimeEducation} />,
  layout: InfoLayout,
})
