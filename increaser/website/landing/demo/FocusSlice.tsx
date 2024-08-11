import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { SessionProgress } from '@increaser/ui/focus/SessionProgress'
import { DemoFocusProvider } from './DemoFocusProvider'
import { Text } from '@lib/ui/text'
import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { getDemoSliceCopy } from './getDemoSliceCopy'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'

const BlockWrapper = styled.div`
  height: 540px;
  width: 320px;
  position: relative;
  ${centerContent};

  @media (max-width: 800px) {
    height: 400px;
    width: 280px;
  }
`

export const FocusSlice = (props: Partial<WebsiteSectionHeaderProps>) => {
  const id = 'focus'
  return (
    <WebsiteSlice id={id}>
      <WebsiteSliceContent>
        <WebsiteSectionHeader {...getDemoSliceCopy(id)} {...props} />
        <ClientOnly>
          <DemoFocusProvider>
            <BlockWrapper>
              <SessionProgress />
              <Text
                style={{ position: 'absolute' }}
                as="div"
                weight="600"
                size={64}
                height="small"
              >
                <FocusPassedTime />
              </Text>
            </BlockWrapper>
          </DemoFocusProvider>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
