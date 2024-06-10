import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { CheckTodayHabits } from '@increaser/ui/habits/CheckTodayHabits'
import { DemoHabitsProvider } from './DemoHabitsProvider'
import { Panel } from '@lib/ui/panel/Panel'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { getDemoSliceCopy } from './getDemoSliceCopy'

export const HabitsSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader {...getDemoSliceCopy('habits')} {...props} />
      <ClientOnly>
        <DemoHabitsProvider>
          <Panel kind="secondary">
            <CheckTodayHabits />
          </Panel>
        </DemoHabitsProvider>
      </ClientOnly>
    </WebsiteSliceContent>
  )
}
