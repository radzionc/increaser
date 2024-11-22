import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { ManageWorkPreferences } from '@increaser/ui/preferences/ManageWorkPreferences'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'

export const WorkPreferencesSlice = () => {
  const id = 'workPreferences'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Take Control of Your <strong>Work Preferences</strong>
        </WebsiteSectionTitle>
        <DemoGuard>
          <ManageWorkPreferences />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
