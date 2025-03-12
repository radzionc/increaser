import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WorkPreferences } from '@product/ui/preferences/WorkPreferences'

import { DemoGuard } from '../../demo/DemoGuard'

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
