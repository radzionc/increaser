import { ValueProp } from '@lib/ui/props'
import { ProjectGoal } from '@increaser/entities/Project'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { Match } from '@lib/ui/base/Match'
import styled, { useTheme } from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { round } from '@lib/ui/css/round'
import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { match } from '@lib/utils/match'

const Container = styled(IconWrapper)`
  background: ${getColor('mist')};
  ${round};
  ${sameDimensions('1.4em')};
`

export const ProjectGoalShyIndicator = ({
  value,
}: ValueProp<ProjectGoal | null>) => {
  const { colors } = useTheme()

  return (
    <Container
      style={
        value
          ? {
              background: match(value, {
                doMore: () => colors.success,
                doLess: () => colors.idle,
              })
                .getVariant({ a: () => 0.08 })
                .toCssValue(),
              color: match(value, {
                doMore: () => colors.success,
                doLess: () => colors.idle,
              }).toCssValue(),
            }
          : undefined
      }
    >
      {value ? (
        <Match
          value={value}
          doMore={() => <PlusIcon />}
          doLess={() => <MinusIcon />}
        />
      ) : undefined}
    </Container>
  )
}
