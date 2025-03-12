import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'

import { DemoGuard } from '../../demo/DemoGuard'

import { PrinciplesDemo } from './PrinciplesDemo'

export const PrinciplesSlice = () => {
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
