import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { goalsEducation } from '@increaser/ui/education/goals'

export default withLayout({
  page: () => <ProductEducationPage value={goalsEducation} />,
  layout: InfoLayout,
})
