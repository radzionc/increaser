import { HStack } from '@increaser/ui/layout/Stack'
import { transition } from '@increaser/ui/css/transition'
import { HSLA } from '@increaser/ui/colors/HSLA'
import styled from 'styled-components'

interface CountableItemsVisualizationProps {
  items: HSLA[]
}

const Wr = styled(HStack)`
  height: 12px;
  width: 100%;
  gap: 1px;
  border-radius: 2px;
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
