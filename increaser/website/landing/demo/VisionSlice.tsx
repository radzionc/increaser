import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { VisionSliceContent } from './VisionSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'

export const VisionSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader {...getDemoSliceCopy('vision')} {...props} />
      <ClientOnly>
        <VisionSliceContent />
      </ClientOnly>
    </WebsiteSliceContent>
  )
}
