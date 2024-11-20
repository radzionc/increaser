import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { visionEducation } from '@increaser/ui/education/vision'

export default withLayout({
  page: () => <ProductEducationPage value={visionEducation} />,
  layout: InfoLayout,
})
