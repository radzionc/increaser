import { FocusPassedTime } from '@increaser/ui/focus/FocusPassedTime'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { TitleFocusDurationSelector } from '../../../home/components/TitleFocusDurationSelector'
import { SessionIntervals } from './SessionIntervals'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { centerContent } from '@lib/ui/css/centerContent'

const Container = styled.div`
  ${borderRadius.s};
  padding: 2px;
  background: ${getColor('mistExtra')};
  height: 40px;
  overflow: hidden;
  position: relative;
`

const Content = styled.div`
  background: ${getColor('background')};
  height: 100%;
  border-radius: 6px;
  ${horizontalPadding(12)};
  ${centerContent};
`

export const ActiveFocusTime = () => {
  return (
    <Container>
      <TakeWholeSpaceAbsolutely style={{ zIndex: -1 }}>
        <SessionIntervals />
      </TakeWholeSpaceAbsolutely>
      <Content>
        <HStackSeparatedBy
          style={{ position: 'relative' }}
          separator={
            <Text color="shy" as="span">
              {slashSeparator}
            </Text>
          }
          gap={12}
        >
          <Text as="div" weight="600" size={24} height="small">
            <FocusPassedTime />
          </Text>
          <TitleFocusDurationSelector />
        </HStackSeparatedBy>
      </Content>
    </Container>
  )
}
