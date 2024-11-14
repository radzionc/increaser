import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { ManageWorkPreferences } from '@increaser/ui/preferences/ManageWorkPreferences'

export const WorkPreferencesSlice = (
  props: Partial<WebsiteSectionHeaderProps>,
) => {
  const id = 'workPreferences'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <ManageWorkPreferences />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
