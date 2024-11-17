import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { PrinciplesDemo } from './PrinciplesDemo'

export const PrinciplesSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'principles'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <PrinciplesDemo />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
