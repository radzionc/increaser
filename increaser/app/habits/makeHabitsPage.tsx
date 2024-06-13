import { Page, GetLayout } from '@lib/next-ui/Page'
import { HabitsLayout } from './components/HabitsLayout'

const getLayout: GetLayout = (page) => <HabitsLayout>{page}</HabitsLayout>

export const makeHabitsPage = (page: Page) => {
  page.getLayout = getLayout

  return page
}
