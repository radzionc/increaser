import { TimelineSession } from '@increaser/app/focus/components/TimelineSession'
import { getBlockWorkDuration } from '@increaser/app/sets/Block'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { defaultTransition, transition } from '@lib/ui/css/transition'
import { Text } from '@lib/ui/text'
import { MS_IN_MIN } from '@lib/utils/time'
import { getColor } from '@lib/ui/theme/getters'
import { Block } from '@increaser/entities/Block'

const Container = styled(TimelineSession)`
  color: ${getColor('textSupporting')};
  border: 1px dashed ${getColor('textSupporting')};
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
        <Text
          size={14}
          style={{ opacity: shouldShowDuration ? 1 : 0 }}
          weight="semibold"
        >
          {formatDuration(blockWorkDuration, 'ms', { maxUnit: 'h' })}
        </Text>
      )}
    </Container>
  )
}
