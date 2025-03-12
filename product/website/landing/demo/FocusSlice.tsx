import { VStack } from '@lib/ui/css/stack'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { FocusLauncher } from '@product/ui/focus/launcher/FocusLauncher'
import styled from 'styled-components'

import { DemoGuard } from '../../demo/DemoGuard'

const Container = styled(VStack)`
  max-width: 520px;
  width: 100%;
  gap: 24px;
`

export const FocusSlice = () => {
  const id = 'focus'

  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionTitle>
          Power Through Work with Enhanced <strong>Focus</strong>
        </WebsiteSectionTitle>
        <DemoGuard>
          <Container>
            <FocusLauncher />
          </Container>
        </DemoGuard>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
