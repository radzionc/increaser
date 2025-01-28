import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import styled, { useTheme } from 'styled-components'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { match } from '@lib/utils/match'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { StyledColorProp } from '@lib/ui/props'
import { useCurrentTaskFactory } from '../taskFactories/CurrentTaskFactoryProvider'
import { TaskFactoryTitle } from '../taskFactories/TaskFactoryTitle'

const Prefix = styled.div<StyledColorProp>`
  ${takeWholeSpace};
  ${borderRadius.xs};
  ${({ $color }) => coloredTag($color)}
  text-transform: uppercase;
  ${centerContent};
  font-size: 12px;
`

export const GoalTaskFactoryItem = () => {
  const {
    colors: { getLabelColor },
  } = useTheme()
  const { cadence } = useCurrentTaskFactory()

  return (
    <PrefixedItemFrame
      prefixWidth={24}
      prefix={
        <Prefix
          $color={getLabelColor(
            match(cadence, {
              day: () => 4,
              workday: () => 1,
              week: () => 7,
              month: () => 10,
            }),
          )}
        >
          {match(cadence, {
            day: () => 'd',
            workday: () => 'wd',
            week: () => 'w',
            month: () => 'm',
          })}
        </Prefix>
      }
    >
      <TaskFactoryTitle />
    </PrefixedItemFrame>
  )
}
