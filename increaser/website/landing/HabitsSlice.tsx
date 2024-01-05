import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { CheckTodayHabits } from '@increaser/ui/habits/CheckTodayHabits'
import { productName } from '@increaser/config'
import { HabitsProvider } from './HabitsProvider'
import { Panel } from '@lib/ui/panel/Panel'
import { ClientOnly } from '@lib/ui/base/ClientOnly'

export const HabitsSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Your Success Starts with Your Habits"
          subtitle={`Embrace the journey of self-improvement with ${productName}'s intuitive habit tracking`}
        />
        <ClientOnly>
          <HabitsProvider>
            <Panel kind="secondary">
              <CheckTodayHabits />
            </Panel>
          </HabitsProvider>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
