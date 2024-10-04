import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { GoalsSliceContent } from './GoalsSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'

export const GoalsSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'goals'
  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <GoalsSliceContent />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
