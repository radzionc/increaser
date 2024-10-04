import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { VStack } from '@lib/ui/css/stack'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'
import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'

export const ScheduleSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'schedule'
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <VStack
            style={{ minWidth: 320, maxWidth: 580, width: '100%' }}
            gap={40}
          >
            <ScheduleVisualization />
            <ManageSchedule />
          </VStack>
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
