import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { ProgressRing } from '@lib/ui/progress/ProgressRing'
import { ComponentWithValueProps } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { useMemo } from 'react'
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

  const color = useMemo(() => {
    if (value < 0.5) {
      return colors.alert
    }

    if (value < 0.75) {
      return colors.idle
    }

    return colors.success
  }, [colors, value])

  return (
    <Tooltip
      renderOpener={(props) => (
        <Container {...props}>
          {Math.round(value * 100)}
          <Progress color={color} size={ringSize} value={value} thickness={2} />
        </Container>
      )}
      content="Consistency"
    />
  )
}
