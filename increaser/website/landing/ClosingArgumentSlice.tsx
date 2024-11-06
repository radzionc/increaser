import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { PrimaryCallToAction } from './PrimaryCallToAction'
import { FadeOutImageSlice } from '@lib/ui/website/FadeOutImageSlice'

export const ClosingArgumentSlice = () => {
  return (
    <FadeOutImageSlice imageUrl="images/closing-argument.webp">
      <WebsiteSliceContent style={{ gap: 28, paddingBottom: 200 }}>
        <WebsiteSectionHeader title="Unleash Your Potential" />
        <PrimaryCallToAction />
      </WebsiteSliceContent>
    </FadeOutImageSlice>
  )
}
