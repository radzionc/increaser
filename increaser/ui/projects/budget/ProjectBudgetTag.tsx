import { text, Text } from '@lib/ui/text'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import styled from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { Match } from '@lib/ui/base/Match'

const Container = styled(HStackSeparatedBy)`
  ${text({
    color: 'regular',
    size: 14,
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
  const { allocatedMinutesPerWeek, goal } = useCurrentProject()

  return (
    <Container gap={8} separator={<Separator />}>
      <Content gap={4} separator={slashSeparator}>
        <span>
          <EmphasizeNumbers
            value={formatDuration(allocatedMinutesPerWeek, 'min')}
          />
        </span>
        <span>week</span>
      </Content>
      {goal && (
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
    </Container>
  )
}
