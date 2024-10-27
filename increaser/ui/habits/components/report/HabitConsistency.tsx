import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { ProgressRing } from '@lib/ui/progress/ProgressRing'
import { ComponentWithValueProps } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import styled, { useTheme } from 'styled-components'

const Container = styled.div`
  ${sameDimensions(tightListItemMinHeight)};
  ${centerContent};
  position: relative;
  ${text({
    size: 12,
    color: 'contrast',
    weight: 600,
  })}
`

const offset = 6

const ringSize = tightListItemMinHeight - offset

const Progress = styled(ProgressRing)`
  position: absolute;
  top: ${toSizeUnit(offset / 2)};
  left: ${toSizeUnit(offset / 2)};
`

export const HabitConsistency = ({
  value,
}: ComponentWithValueProps<number>) => {
  const { colors } = useTheme()
  return (
    <Container>
      {Math.round(value * 100)}
      <Progress
        color={colors.success}
        size={ringSize}
        value={value}
        thickness={2}
      />
    </Container>
  )
}
