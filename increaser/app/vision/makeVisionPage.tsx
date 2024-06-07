import { Page, GetLayout } from '@lib/next-ui/Page'
import { VisionLayout } from './VisionLayout'

const getLayout: GetLayout = (page) => <VisionLayout>{page}</VisionLayout>

export const makeVisionPage = (page: Page) => {
  page.getLayout = getLayout

  return page
}
