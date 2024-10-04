import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { CheckTodayHabits } from '@increaser/ui/habits/CheckTodayHabits'
import { DemoHabitsProvider } from './DemoHabitsProvider'
import { Panel } from '@lib/ui/css/panel'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'

export const HabitsSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'habits'
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <DemoHabitsProvider>
            <Panel kind="secondary">
              <CheckTodayHabits />
            </Panel>
          </DemoHabitsProvider>
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
