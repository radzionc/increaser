import {
  WebsiteSectionHeader,
  WebsiteSectionHeaderProps,
} from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { productName } from '@increaser/config'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { SessionProgress } from '@increaser/ui/focus/SessionProgress'
import { DemoFocusProvider } from './DemoFocusProvider'
import { Text } from '@lib/ui/text'
import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'

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
  return (
    <WebsiteSliceContent>
      <WebsiteSectionHeader
        title="Sharper Focus, Better Results"
        subtitle={`${productName}'s tools are designed to help you achieve maximum productivity`}
        {...props}
      />
      <ClientOnly>
        <DemoFocusProvider>
          <BlockWrapper>
            <SessionProgress />
            <Text
              style={{ position: 'absolute' }}
              as="div"
              weight="bold"
              size={64}
              height="small"
            >
              <FocusPassedTime />
            </Text>
          </BlockWrapper>
        </DemoFocusProvider>
      </ClientOnly>
    </WebsiteSliceContent>
  )
}
