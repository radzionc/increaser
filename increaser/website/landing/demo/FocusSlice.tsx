import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { FocusLauncher } from '@increaser/app/focus/launcher/FocusLauncher'
import { DemoGuard } from '../../demo/DemoGuard'

export const FocusSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'focus'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <FocusLauncher />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
