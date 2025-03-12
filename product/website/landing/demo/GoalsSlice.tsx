import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'

import { DemoGuard } from '../../demo/DemoGuard'

import { GoalsSliceContent } from './GoalsSliceContent'

export const GoalsSlice = () => {
  const id = 'goals'
  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Achieve Your <strong>Goals</strong> with Confidence
        </WebsiteSectionTitle>
        <DemoGuard>
          <GoalsSliceContent />
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
