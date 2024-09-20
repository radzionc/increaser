import { ComponentWithValueProps } from '@lib/ui/props'
import { FocusBreakdownItemInfo } from './FocusBreakdownItemInfo'
import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { focusBreakdownConfig } from './config'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { StackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { Circle } from '@lib/ui/layout/Circle'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(VStack)`
  height: 100%;
  ${verticalPadding(
    (focusBreakdownConfig.itemHeight - focusBreakdownConfig.indicatorSize) / 2,
  )};
`

const gap = 4

const Separator = styled.div`
  border-right: 1px dashed ${getColor('textShy')};
  width: 0px;
  height: ${toSizeUnit(
    focusBreakdownConfig.itemHeight -
      focusBreakdownConfig.indicatorSize -
      gap * 2,
  )};
`

export const FocusTimeIndicators = ({
  value,
}: ComponentWithValueProps<FocusBreakdownItemInfo[]>) => {
  return (
    <Container>
      <StackSeparatedBy
        direction="column"
        alignItems="center"
        separator={<Separator />}
        gap={gap}
      >
        {value.map(({ color }, index) => (
          <Circle
            background={color}
            key={index}
            size={focusBreakdownConfig.indicatorSize}
          />
        ))}
      </StackSeparatedBy>
    </Container>
  )
}
