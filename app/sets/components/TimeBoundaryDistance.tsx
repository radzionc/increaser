import { Text } from '@increaser/ui/text'
import { match } from '@increaser/utils/match'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled, { css, useTheme } from 'styled-components'

interface TimeBoundaryDistanceProps {
  value: number
  direction?: 'row' | 'column'
}

const DashedLine = styled.div`
  border-top: 1px dashed;
  border-left: 1px dashed;

  height: 0px;
  flex: 1;
`

const Container = styled.div<{ direction: 'row' | 'column' }>`
  gap: 4px;
  ${({ direction }) =>
    match(direction, {
      row: () => css`
        display: flex;
        align-items: center;
        width: 120px;
      `,
      column: () => css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        height: 120px;
      `,
    })}
`

export const TimeBoundaryDistance = ({
  value,
  direction = 'row',
}: TimeBoundaryDistanceProps) => {
  const theme = useTheme()
  let color = theme.colors.success
  if (value < 60) {
    color = theme.colors.alert
  } else if (value < 120) {
    color = theme.colors.idle
  }

  return (
    <Container style={{ color: color.toCssValue() }} direction={direction}>
      <DashedLine />
      <Text size={14}>{formatDuration(value, 'min')}</Text>
      <DashedLine />
    </Container>
  )
}
