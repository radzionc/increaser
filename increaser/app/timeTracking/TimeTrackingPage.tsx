import { FixedWidthContent } from '@increaser/app/components/reusable/fixed-width-content'

import { PageTitle } from '@increaser/app/ui/PageTitle'
import { Page } from '@lib/next-ui/Page'
import { TrackedTimeReportProvider } from './report/TrackedTimeReportProvider'
import { TrackedTimeReport } from './report/TrackedTimeReport'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { TrackedTimeProvider } from './report/TrackedTimeProvider'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { Button } from '@lib/ui/buttons/Button'
import { AddSessionView } from './track/AddSessionView'
import { useState } from 'react'

const title = 'Track Time'

export const TimeTrackingPage: Page = () => {
  const [isAddingSession, setIsAddingSession] = useState(false)
  return (
    <FixedWidthContent>
      <PageTitle
        documentTitle={`⏳ ${title}`}
        title={
          <HStack fullWidth alignItems="center" justifyContent="space-between">
            <Text>{title}</Text>
            {!isAddingSession && (
              <Button onClick={() => setIsAddingSession(true)} kind="primary">
                Add Session
              </Button>
            )}
          </HStack>
        }
      />
      <UserStateOnly>
        <VStack gap={40}>
          {isAddingSession && (
            <AddSessionView onFinish={() => setIsAddingSession(false)} />
          )}
          <TrackedTimeProvider>
            <TrackedTimeReportProvider>
              <TrackedTimeReport />
            </TrackedTimeReportProvider>
          </TrackedTimeProvider>
        </VStack>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
