import { Page } from 'components/Page'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { PageTitle } from 'ui/PageTitle'
import { CurrentMonthUsers } from './CurrentMonthUsers'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

export const CommunityPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle documentTitle={`👋 Community`} title={`Community`} />
      <VStack gap={20}>
        <Text color="idle">This page is work in progress.</Text>
        <CurrentMonthUsers />
      </VStack>
    </FixedWidthContent>
  )
}
