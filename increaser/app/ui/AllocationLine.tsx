import { HSLA } from '@lib/ui/colors/HSLA'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

interface Segment {
  color: HSLA
  proportion: number
}

interface Props {
  className?: string
  segments: Segment[]
  height?: number
  background?: HSLA
}

const Container = styled.div<{ height: number; $background?: HSLA }>`
  position: relative;
  display: flex;
  width: 100%;
  height: ${({ height }) => toSizeUnit(height)};
  border-radius: 4px;
  overflow: hidden;
  background: ${({ theme, $background }) =>
    ($background || theme.colors.mist).toCssValue()};
`

const Allocation = styled.div<{ $color: HSLA }>`
  height: 100%;
  background: ${({ $color }) => $color.toCssValue()};
`

export const AllocationLine = ({
  segments,
  className,
  background,
  height = 8,
}: Props) => {
  return (
    <Container $background={background} className={className} height={height}>
      {segments.map(({ color, proportion }, index) => (
        <Allocation
          key={index}
          $color={color}
          style={{ width: `${proportion * 100}%` }}
        />
      ))}
    </Container>
  )
}
