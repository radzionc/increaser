import { HStack } from '@lib/ui/layout/Stack'
import { transition } from '@lib/ui/css/transition'
import { HSLA } from '@lib/ui/colors/HSLA'
import styled from 'styled-components'
import { round } from '@lib/ui/css/round'

interface CountableItemsVisualizationProps {
  items: HSLA[]
}

const Wr = styled(HStack)`
  height: 12px;
  width: 100%;
  gap: 1px;
  ${round};
  overflow: hidden;
`

const Box = styled.div`
  height: 100%;
  flex: 1;
  ${transition};
`

export const CountableItemsVisualization = ({
  items,
}: CountableItemsVisualizationProps) => {
  return (
    <Wr>
      {items.map((color, i) => (
        <Box key={i} style={{ backgroundColor: color.toCssValue() }} />
      ))}
    </Wr>
  )
}
