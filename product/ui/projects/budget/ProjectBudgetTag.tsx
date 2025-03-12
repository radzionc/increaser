import { Match } from '@lib/ui/base/Match'
import { Wrap } from '@lib/ui/base/Wrap'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { text, Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { getColor } from '@lib/ui/theme/getters'
import { areEmptyChildren } from '@lib/ui/utils/areEmptyChildren'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

const Container = styled(HStackSeparatedBy)`
  ${text({
    color: 'regular',
    size: 13,
    nowrap: true,
  })}

  ${horizontalPadding(8)};
  height: 28px;
  background: ${getColor('foreground')};
  ${borderRadius.s}
`

const Separator = styled.div`
  width: 1px;
  height: 16px;
  background: ${getColor('mistExtra')};
`

const Content = styled(HStackSeparatedBy)``

export const ProjectBudgetTag = () => {
  const { allocatedMinutesPerWeek, goal, workingDays } = useCurrentProject()

  const isWorkdayOnly = workingDays === 'workdays'
  const hasBudget = !!(allocatedMinutesPerWeek && allocatedMinutesPerWeek > 0)

  return (
    <Wrap
      wrap={(children) =>
        areEmptyChildren(children) ? null : (
          <Container gap={8} separator={<Separator />}>
            {children}
          </Container>
        )
      }
    >
      {isWorkdayOnly && <span>Workdays</span>}
      {hasBudget && (
        <Content gap={4} separator={slashSeparator}>
          <span>
            <EmphasizeNumbers
              value={formatDuration(allocatedMinutesPerWeek, 'min')}
            />
          </span>
          <span>week</span>
        </Content>
      )}
      {hasBudget && goal && (
        <Match
          value={goal}
          doMore={() => (
            <Text as="span" color="success">
              min
            </Text>
          )}
          doLess={() => (
            <Text as="span" color="alert">
              max
            </Text>
          )}
        />
      )}
    </Wrap>
  )
}
