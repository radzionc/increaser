import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import styled from 'styled-components'

import { DemoGuard } from '../../demo/DemoGuard'

import { VisionDemo } from './VisionDemo'

const Slice = styled(WebsiteSlice)`
  ${centeredContentColumn({
    contentMaxWidth: '100%',
  })}
`

export const VisionSlice = () => {
  const id = 'vision'
  return (
    <Slice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Design Your Future with a <strong>Vision Board</strong>
        </WebsiteSectionTitle>
        <DemoGuard>
          <VisionDemo />
        </DemoGuard>
      </WebsiteSliceContent>
    </Slice>
  )
}
