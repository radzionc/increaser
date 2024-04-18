import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { ProjectsBudgetVisualization } from './ProjectsBudgetVisualization'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { sum } from '@lib/utils/array/sum'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useWeekTimeAllocation } from '../../weekTimeAllocation/hooks/useWeekTimeAllocation'
import { Text } from '@lib/ui/text'

const Container = styled(VStack)`
  gap: 8px;
  font-size: 14px;
`

export const ProjectsBudgetOverview = () => {
  const { activeProjects } = useProjects()
  const { totalMinutes } = useWeekTimeAllocation()

  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  const freeMinutes = totalMinutes - allocatedMinutes

  return (
    <Container>
      <HStack
        wrap="wrap"
        alignItems="center"
        fullWidth
        justifyContent="space-between"
      >
        <HStack gap={20}>
          <LabeledValue labelColor="supporting" name="Allocated">
            <Text color="contrast">
              {allocatedMinutes
                ? formatDuration(allocatedMinutes, 'min', {
                    maxUnit: 'h',
                  })
                : '-'}
            </Text>
          </LabeledValue>
          <LabeledValue labelColor="supporting" name="Free">
            <Text color={freeMinutes < 0 ? 'alert' : 'contrast'}>
              {freeMinutes !== 0
                ? formatDuration(freeMinutes, 'min', {
                    maxUnit: 'h',
                  })
                : '-'}
            </Text>
          </LabeledValue>
        </HStack>
        <LabeledValue labelColor="supporting" name="Work budget">
          <Text color="contrast">
            {formatDuration(totalMinutes, 'min', {
              maxUnit: 'h',
            })}
          </Text>
        </LabeledValue>
      </HStack>
      <ProjectsBudgetVisualization />
    </Container>
  )
}
