import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { GoalsSliceContent } from './GoalsSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'

export const GoalsSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'goals'
  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <ClientOnly>
          <GoalsSliceContent />
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
