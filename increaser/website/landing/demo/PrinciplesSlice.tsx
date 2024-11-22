import { WebsiteSectionHeaderProps } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import { PrinciplesDemo } from './PrinciplesDemo'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'

export const PrinciplesSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'principles'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Build a Life Guided by Strong <strong>Principles</strong>
        </WebsiteSectionTitle>
        <DemoGuard>
          <PrinciplesDemo />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
