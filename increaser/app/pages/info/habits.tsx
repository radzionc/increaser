import { withLayout } from '@lib/next-ui/utils/withLayout'
import { InfoLayout } from '../../info/InfoLayout'
import { ProductEducationPage } from '../../info/ProductEducationPage'
import { habitsEducation } from '@increaser/ui/education/habits'

export default withLayout({
  page: () => <ProductEducationPage value={habitsEducation} />,
  layout: InfoLayout,
})
