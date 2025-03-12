import { withLayout } from '@lib/next-ui/utils/withLayout'
import { preferencesEducation } from '@product/ui/education/preferences'

import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'

export default withLayout({
  page: () => <ProductEducationPage value={preferencesEducation} />,
  layout: InfoLayout,
})
