import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { CheckTodayHabits } from '@increaser/ui/habits/CheckTodayHabits'
import { productName } from '@increaser/config'
import { DemoHabitsProvider } from './DemoHabitsProvider'
import { Panel } from '@lib/ui/panel/Panel'
import { ClientOnly } from '@lib/ui/base/ClientOnly'

export const HabitsSlice = () => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        title="Your Success Starts with Your Habits"
        subtitle={`Embrace the journey of self-improvement with ${productName}'s intuitive habit tracking`}
      />
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
