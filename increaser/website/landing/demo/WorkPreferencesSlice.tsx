import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WorkPreferences } from '@increaser/ui/preferences/WorkPreferences'
export const WorkPreferencesSlice = () => {
  const id = 'workPreferences'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Take Control of Your <strong>Work Preferences</strong>
        </WebsiteSectionTitle>
        <DemoGuard>
          <WorkPreferences />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
