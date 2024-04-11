import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { round } from '@lib/ui/css/round'
import { ProjectGoalShyIndicator } from './ProjectGoalShyIndicator'
import { Panel } from '@lib/ui/panel/Panel'
import { sameDimensions } from '@lib/ui/css/sameDimensions'

type WeeklyGoalItemProps = {
  value: EnhancedProject
}

const Identifier = styled.div`
  ${sameDimensions(8)}
  ${round};
`

export const ProjectBudgetItem = ({ value }: WeeklyGoalItemProps) => {
  return (
    <Panel>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" gap={8}>
          <Identifier style={{ background: value.hslaColor.toCssValue() }} />
          <Text color="regular" cropped weight="semibold">
            {value.name}
          </Text>
        </HStack>
        <Text weight="bold" color="contrast">
          {formatDuration(value.allocatedMinutesPerWeek, 'min', {
            kind: 'long',
            minUnit: 'h',
            maxUnit: 'h',
          })}{' '}
          {value.goal && <ProjectGoalShyIndicator value={value.goal} />}
        </Text>
      </HStack>
    </Panel>
  )
}
