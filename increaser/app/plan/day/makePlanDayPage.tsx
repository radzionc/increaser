import { Page, GetLayout } from '@lib/next-ui/Page'
import { PlanDayLayout } from './PlanDayLayout'

const getLayout: GetLayout = (page) => <PlanDayLayout>{page}</PlanDayLayout>

export const makePlanDayPage = (page: Page) => {
  page.getLayout = getLayout

  return page
}
