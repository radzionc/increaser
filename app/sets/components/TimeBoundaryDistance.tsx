import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled, { useTheme } from 'styled-components'

interface TimeBoundaryDistanceProps {
  value: number
}

const DashedLine = styled.div`
  border-top: 1px dashed;
  height: 0px;
  flex: 1;
`

const Container = styled(HStack)`
  width: 120px;
`

export const TimeBoundaryDistance = ({ value }: TimeBoundaryDistanceProps) => {
  const theme = useTheme()
  let color = theme.colors.success
  if (value < 60) {
    color = theme.colors.alert
  } else if (value < 120) {
    color = theme.colors.idle
  }

  return (
    <Container
      style={{ color: color.toCssValue() }}
      alignItems="center"
      gap={4}
    >
      <DashedLine />
      <Text size={14}>{formatDuration(value, 'min')}</Text>
      <DashedLine />
    </Container>
  )
}
