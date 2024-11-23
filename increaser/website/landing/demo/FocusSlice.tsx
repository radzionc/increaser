import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { DemoGuard } from '../../demo/DemoGuard'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'
import { WebsiteSectionTitle } from '@lib/ui/website/WebsiteSectionTitle'
import { FocusLauncher } from '@increaser/ui/focus/launcher/FocusLauncher'

const Container = styled(VStack)`
  max-width: 480px;
  width: 100%;
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
