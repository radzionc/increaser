import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { focusEducation } from '@increaser/ui/education/focus'

export default withLayout({
  page: () => <ProductEducationPage value={focusEducation} />,
  layout: InfoLayout,
})
