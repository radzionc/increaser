import { Match } from '@lib/ui/base/Match'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { ValueProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { match } from '@lib/utils/match'
import { ProjectGoal } from '@product/entities/Project'
import styled, { useTheme } from 'styled-components'

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
