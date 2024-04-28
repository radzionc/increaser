import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentProject } from '../components/ProjectView/CurrentProjectProvider'
import { Text } from '@lib/ui/text'
import { ProjectGoalChart } from './PreviousWeeks/ProjectGoalChart'
import { useCurrentProjectPrevWeeks } from '../hooks/useCurrentProjectPrevWeeks'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { previousWeeksConfig } from './PreviousWeeks/previousWeeksConfig'
import { Circle } from '@lib/ui/layout/Circle'

export const ProjectPreviousWeeks = () => {
  const { name, hslaColor } = useCurrentProject()
  const weeks = useCurrentProjectPrevWeeks(previousWeeksConfig.weeks)

  return (
    <VStack gap={12}>
      {weeks.some((week) => week.seconds > 0) ? (
        weeks.length > 1 ? (
          <ProjectGoalChart value={weeks} />
        ) : (
          <ShyInfoBlock>Not enough data to display the chart</ShyInfoBlock>
        )
      ) : (
        <ShyInfoBlock>No time tracked in the previous weeks</ShyInfoBlock>
      )}
      <HStack alignItems="center" justifyContent="end" fullWidth gap={6}>
        <Circle size={6} background={hslaColor} />
        <Text size={14} color="contrast" weight="semibold">
          {name}
        </Text>
      </HStack>
    </VStack>
  )
}
