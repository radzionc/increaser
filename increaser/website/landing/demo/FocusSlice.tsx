import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { FocusLauncher } from '@increaser/app/focus/launcher/FocusLauncher'
import { DemoGuard } from '../../demo/DemoGuard'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'

const Container = styled(VStack)`
  max-width: 480px;
  width: 100%;
`

export const FocusSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'focus'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <DemoGuard>
          <Container>
            <FocusLauncher />
          </Container>
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
