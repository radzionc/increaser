import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { principlesEducation } from '@increaser/ui/education/principles'

export default withLayout({
  page: () => <ProductEducationPage value={principlesEducation} />,
  layout: InfoLayout,
})
