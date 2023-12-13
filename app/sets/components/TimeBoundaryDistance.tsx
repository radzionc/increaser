import { ChevronDownIcon } from '@increaser/ui/icons/ChevronDownIcon'
import { ChevronRightIcon } from '@increaser/ui/icons/ChevronRightIcon'
import { ChevronUpIcon } from '@increaser/ui/icons/ChevronUpIcon'
import { ChevronLeftIcon } from '@increaser/ui/icons/ChevronLeftIcon'
import { Text } from '@increaser/ui/text'
import { getColor } from '@increaser/ui/theme/getters'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { Direction } from '@increaser/utils/Direction'
import { Stack } from '@increaser/ui/layout/Stack'

interface TimeBoundaryDistanceProps {
  value: number
  direction: Direction
}

const DashedLine = styled.div`
  border-top: 1px dashed;
  border-left: 1px dashed;

  height: 0px;
  flex: 1;
`

const Container = styled(Stack)`
  flex: 1;
  color: ${getColor('textShy')};
  align-items: center;
  flex-direction: ${({ direction }) => direction};
  font-size: 14px;
`

const Content = styled(Text)`
  padding: 4px;
`

const Connector = styled(Stack)`
  flex: 1;
  align-items: center;
  flex-direction: ${({ direction }) => direction};
`

export const TimeBoundaryDistance = ({
  value,
  direction,
}: TimeBoundaryDistanceProps) => {
  const content = (
    <Content color="supporting">{formatDuration(value, 'min')}</Content>
  )
  const contentDirection = ['up', 'down'].includes(direction) ? 'column' : 'row'
  return (
    <Container direction={contentDirection}>
      <Connector direction={contentDirection}>
        {direction === 'up' && <ChevronUpIcon />}
        {direction === 'left' && <ChevronLeftIcon />}
        <DashedLine />
      </Connector>
      {content}
      <Connector direction={contentDirection}>
        <DashedLine />
        {direction === 'down' && <ChevronDownIcon />}
        {direction === 'right' && <ChevronRightIcon />}
      </Connector>
    </Container>
  )
}
