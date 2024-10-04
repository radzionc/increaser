import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { MyVisionBoard } from '@increaser/ui/vision/MyVisionBoard'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import styled from 'styled-components'
import { DemoGuard } from '../../demo/DemoGuard'

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
        <DemoGuard>
          <MyVisionBoard />
        </DemoGuard>
      </WebsiteSliceContent>
    </Slice>
  )
}
