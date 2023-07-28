import { HStack } from '@increaser/ui/ui/Stack'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
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
  ${defaultTransitionCSS};
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
