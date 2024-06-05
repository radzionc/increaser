import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { VisionSliceContent } from './VisionSliceContent'

export const VisionSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        title="Envision Your Perfect Life"
        subtitle="Craft your ideal future and track your progress with our Vision Tool. Set clear aspirations, monitor your journey, and turn dreams into reality"
        {...props}
      />
      <ClientOnly>
        <VisionSliceContent />
      </ClientOnly>
    </WebsiteSliceContent>
  )
}
