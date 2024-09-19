import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import { SessionIntervals } from './SessionIntervals'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { centerContent } from '@lib/ui/css/centerContent'
import { ComponentProps } from 'react'

const Container = styled.div`
  ${borderRadius.s};
  padding: 2px;
  background: ${getColor('mistExtra')};
  height: 100%;
  overflow: hidden;
  position: relative;
  font-size: 24px;
  isolation: isolate;
`

const Content = styled.div`
  background: ${({ theme }) =>
    theme.colors.background.getVariant({ a: () => 0.88 }).toCssValue()};
  height: 100%;
  border-radius: 6px;
  ${horizontalPadding(12)};
  ${centerContent};
`

export const ActiveFocusTime = (props: ComponentProps<typeof Container>) => {
  return (
    <Container {...props}>
      <TakeWholeSpaceAbsolutely style={{ zIndex: -1 }}>
        <SessionIntervals />
      </TakeWholeSpaceAbsolutely>
      <Content>
        <Text as="div" weight="600" height="small">
          <FocusPassedTime />
        </Text>
      </Content>
    </Container>
  )
}
