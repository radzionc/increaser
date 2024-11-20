import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { preferencesEducation } from '@increaser/ui/education/preferences'

export default withLayout({
  page: () => <ProductEducationPage value={preferencesEducation} />,
  layout: InfoLayout,
})
