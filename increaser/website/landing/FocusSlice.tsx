import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@increaser/config'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { SessionProgress } from '@increaser/ui/focus/SessionProgress'
import { DemoFocusProvider } from './DemoFocusProvider'
import { Text } from '@lib/ui/text'
import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'

const BlockWrapper = styled.div`
  height: 580px;
  width: 320px;
  position: relative;
  ${centerContent};
`

export const FocusSlice = () => {
  return (
    <WebsiteSlice>
      <WebsiteSliceContent>
        <WebsiteSectionHeader
          title="Sharper Focus, Better Results"
          subtitle={`${productName}'s tools are designed to help you achieve maximum productivity`}
        />
        <ClientOnly>
          <DemoFocusProvider>
            <BlockWrapper>
              <SessionProgress />
              <CenterAbsolutely>
                <Text as="div" weight="bold" size={64} height="small">
                  <FocusPassedTime />
                </Text>
              </CenterAbsolutely>
            </BlockWrapper>
          </DemoFocusProvider>
        </ClientOnly>
      </WebsiteSliceContent>
    </WebsiteSlice>
  )
}
