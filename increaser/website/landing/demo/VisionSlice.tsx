import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { MyVisionBoard } from '@increaser/ui/vision/MyVisionBoard'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import styled from 'styled-components'

const Slice = styled(WebsiteSlice)`
  ${centeredContentColumn({
    contentMaxWidth: '100%',
  })}
`

export const VisionSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'vision'
  return (
    <Slice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <ClientOnly>
          <MyVisionBoard />
        </ClientOnly>
      </WebsiteSliceContent>
    </Slice>
  )
}
