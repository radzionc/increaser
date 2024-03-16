import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'
import { VStack } from '@lib/ui/layout/Stack'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { Text } from '@lib/ui/text'

const title = 'Time Tracking'

export const TimeTrackingPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`⏳ ${title}`} title={title} />
      <VStack gap={80}>
        <Text weight="bold">Time Tracking</Text>
      </VStack>
    </FixedWidthContent>
  )
}
