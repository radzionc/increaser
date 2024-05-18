import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { DemoScheduleProvider } from '../DemoScheduleProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'
import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'

export const ScheduleSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        title="Design Your Ideal Day, Every Day"
        subtitle={`Tailor your schedule for maximum efficiency and unmatched work-life harmony`}
        {...props}
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
  )
}
