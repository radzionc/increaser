import { TimelineSession } from 'focus/components/TimelineSession'
import { Block, getBlockWorkDuration } from 'sets/Block'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { defaultTransition, transition } from '@increaser/ui/css/transition'
import { Text } from '@increaser/ui/text'
import { MS_IN_MIN } from '@increaser/utils/time'

const Container = styled(TimelineSession)`
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  border: 1px dashed;
  border-radius: 2px;
  display: flex;
  align-items: start;
  justify-content: end;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  pointer-events: none;

  ${transition};

  p {
    transition: ${defaultTransition} opacity;

    margin-right: 6px;
    margin-top: 2px;
  }
`

interface BlockBoundariesProps {
  block: Block
  style?: React.CSSProperties
  className?: string
  shouldShowDuration?: boolean
}

export const BlockBoundaries = ({
  block,
  style,
  shouldShowDuration = true,
  className,
}: BlockBoundariesProps) => {
  const blockWorkDuration = getBlockWorkDuration(block)

  return (
    <Container className={className} style={style}>
      {shouldShowDuration && blockWorkDuration > 25 * MS_IN_MIN && (
        <Text style={{ opacity: shouldShowDuration ? 1 : 0 }} weight="semibold">
          {formatDuration(blockWorkDuration, 'ms')}
        </Text>
      )}
    </Container>
  )
}
