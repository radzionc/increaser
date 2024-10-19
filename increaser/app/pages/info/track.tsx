import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { trackTimeEducation } from '@increaser/ui/education/trackTime'

export default withLayout({
  page: () => <ProductEducationPage value={trackTimeEducation} />,
  layout: InfoLayout,
})
