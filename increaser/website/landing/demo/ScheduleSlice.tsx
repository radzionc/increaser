import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { DemoScheduleProvider } from '../DemoScheduleProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'
import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'

export const ScheduleSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Design Your Ideal Day, Every Day"
          subtitle={`Tailor your schedule for maximum efficiency and unmatched work-life harmony`}
        />
        <ClientOnly>
          <DemoScheduleProvider>
            <VStack
              style={{ minWidth: 320, maxWidth: 580, width: '100%' }}
              gap={40}
            >
              <ScheduleVisualization />
              <ManageSchedule />
            </VStack>
          </DemoScheduleProvider>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
